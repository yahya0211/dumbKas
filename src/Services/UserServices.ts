import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { register, login } from "../Utils/UserUtils";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default new (class UserServices {
  private readonly userRepository = prisma.user;
  private readonly cashflowRepository = prisma.cashFlow;

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      const { error } = register.validate(body);
      if (error) return res.status(400).json(error.message);

      const mailRegister = await this.userRepository.count({ where: { email: body.email } });
      if (mailRegister > 0) return res.status(400).json({ massage: "Email is already registered" });

      const hashPassword = await bcrypt.hash(body.password, 10);

      const User = await this.userRepository.create({
        data: {
          email: body.email,
          password: hashPassword,
          fullName: body.fullName,
        },
      });
      return res.status(201).json(User);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      const { error, value } = login.validate(body);
      if (error) return res.status(400).json({ message: "error validating data" });

      const mailRegister = await this.userRepository.findFirst({ where: { email: value.email } });
      if (!mailRegister) return res.status(409).json({ message: "Email is not registed" });

      const matchPassword = await bcrypt.compare(value.password, mailRegister.password);
      if (!matchPassword) return res.status(409).json({ message: "Password incorrect" });

      const tokenPayload = {
        id: mailRegister.id,
      };

      const token = jwt.sign({ tokenPayload }, "SECRET_KEY", { expiresIn: 9999999 });

      const theBalance = await this.cashflowRepository.findUnique({
        where: { userId: mailRegister.id },
      });

      let thisBalance: any = "Balance has been added";

      if (!theBalance) {
        const addBalance = await this.cashflowRepository.create({
          data: {
            inFlow: 0,
            outFlow: 0,
            balance: 0,
            userId: mailRegister.id,
          },
        });
        thisBalance = addBalance;
      }

      return res.status(200).json(token);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();

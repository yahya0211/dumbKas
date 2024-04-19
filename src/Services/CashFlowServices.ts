import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default new (class CashFlowController {
  private readonly CashFlowRepository = prisma.cashFlow;

  async findBalanceById(req: Request, res: Response) {
    try {
      const tokenDecode = res.locals.loginSession.tokenPayload;
      const userId = tokenDecode.id;

      const thisBalance = await this.CashFlowRepository.findUnique({
        where: { userId: userId },
      });

      return res.status(201).json(thisBalance);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();

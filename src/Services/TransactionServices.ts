import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { addTransaction } from "../Utils/TransactionUtils";

const prisma = new PrismaClient();

export default new (class TransactionService {
  private readonly TransactionRepository = prisma.transaction;
  private readonly CategoryRepository = prisma.category;
  private readonly CashRepository = prisma.cashFlow;

  async addTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      const { error } = addTransaction.validate(body);
      if (error) return res.status(400).json(error.message);

      const tokenDecode = res.locals.loginSession.tokenPayload;
      const id: number = tokenDecode.id;

      const thisBalance = await this.CashRepository.findUnique({
        where: { userId: id },
      });

      if (!thisBalance) return res.status(400).json({ message: "There is no income or expenditure" });

      const thisCategory = await this.CategoryRepository.findUnique({
        where: { nameCategory: body.category },
      });

      if (!thisCategory) return res.status(400).json({ message: "Category not found" });

      const newTransaction = await this.TransactionRepository.create({
        data: {
          amount: body.amount,
          category: body.category,
          date: new Date(),
          note: body.note,
          userId: id,
          createdAt: new Date(),
        },
      });

      const inFlow: number = thisBalance.inFlow + body.amount;
      const outFlow: number = thisBalance.inFlow + body.amount;

      let balance: number;
      let balanceUpdated: any;

      if (thisCategory?.type === "Income") {
        balance = thisBalance.balance + body.amount;

        const updateTransaction = await this.CashRepository.update({
          where: { userId: id },
          data: {
            inFlow: inFlow,
            balance: balance,
            userId: id,
          },
        });

        balanceUpdated = updateTransaction;
      }
      return res.status(201).json({ newTransaction, balanceUpdated });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async findByID(req: Request, res: Response): Promise<Response> {
    try {
      const tokenDecode = res.locals.loginSession.tokenPayload;
      const userId: number = tokenDecode.id;

      const thisTransaction = await this.TransactionRepository.findMany({
        where: { userId: userId },
        include: {
          categoryDetail: true,
        },
      });

      return res.status(200).json(thisTransaction);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async lastMonthTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const tokenDecode = res.locals.loginSession.tokenPayload;
      const userId = tokenDecode.id;

      const thisTransaction = await this.TransactionRepository.findMany({
        where: { userId: userId },
        include: {
          categoryDetail: true,
        },
      });

      const lastMonth: any[] = [];
      {
        thisTransaction.map((data) => {
          const currentMonth: number = new Date().getMonth() + 1;

          const transactionMonth: number = new Date(data.date).getMonth() + 1;

          const modifiedData = {
            ...data,
            transactionMonth,
          };

          if (modifiedData.transactionMonth + 1 === currentMonth) {
            lastMonth.push(modifiedData);
          }
        });
      }
      return res.status(200).json(lastMonth);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async currentMonthTransactions(req: Request, res: Response) {
    try {
      const tokenDecode = res.locals.loginSession.tokenPayload;
      const userId = tokenDecode.id;

      const thisTransaction = await this.TransactionRepository.findMany({
        where: { userId: userId },
        include: {
          categoryDetail: true,
        },
      });

      const thisMonth: any[] = [];

      {
        thisTransaction.map((data) => {
          const currentMonth: number = new Date().getMonth() + 1;

          const transactionMonth: number = new Date(data.date).getMonth() + 1;

          const modifiedData = {
            ...data,
            transactionMonth,
          };

          if (modifiedData.transactionMonth === currentMonth) {
            thisMonth.push(modifiedData);
          }
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async nextTransactions(req: Request, res: Response) {
    try {
      const tokenDecode = res.locals.loginSession.tokenPayload;
      const userId = tokenDecode.id;

      const thisTransaction = await this.TransactionRepository.findMany({
        where: { userId: userId },
        include: {
          categoryDetail: true,
        },
      });

      const forNextTransaction: any[] = [];

      {
        thisTransaction.map((data) => {
          const currentMonth: number = new Date().getMonth() + 1;

          const transactionMonth: number = new Date(data.date).getMonth() + 1;

          const modifiedData = {
            ...data,
            transactionMonth,
          };

          if (currentMonth + 1 === modifiedData.transactionMonth) {
            forNextTransaction.push(modifiedData);
          }
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();

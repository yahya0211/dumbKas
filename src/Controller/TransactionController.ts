import { Request, Response } from "express";
import TransactionServices from "../Services/TransactionServices";

export default new (class TransactionController {
  findByID(req: Request, res: Response) {
    TransactionServices.findByID(req, res);
  }
  addTransaction(req: Request, res: Response) {
    TransactionServices.addTransaction(req, res);
  }
  lastMonthTransaction(req: Request, res: Response) {
    TransactionServices.lastMonthTransaction(req, res);
  }
  currentMonthTransactions(req: Request, res: Response) {
    TransactionServices.currentMonthTransactions(req, res);
  }
  nextTransactions(req: Request, res: Response) {
    TransactionServices.nextTransactions(req, res);
  }
})();

import CashFlowServices from "../Services/CashFlowServices";
import { Request, Response } from "express";

export default new (class CashFlowController {
  findBalanceById(req: Request, res: Response) {
    CashFlowServices.findBalanceById(req, res);
  }
})();

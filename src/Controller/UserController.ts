import UserServices from "../Services/UserServices";
import { Request, Response } from "express";

export default new (class UserController {
  register(req: Request, res: Response) {
    UserServices.register(req, res);
  }

  login(req: Request, res: Response) {
    UserServices.login(req, res);
  }
})();

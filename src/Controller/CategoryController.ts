import { Request, Response } from "express";
import CategoryService from "../Services/CategoryService";

export default new (class CategoryController {
  addCategory(req: Request, res: Response) {
    CategoryService.addCategory(req, res);
  }

  getCategoryByUserId(req: Request, res: Response) {
    CategoryService.getCategoryByUserId(req, res);
  }
})();

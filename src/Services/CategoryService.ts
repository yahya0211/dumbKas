import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cloudinary from "../config";
import { addCategory } from "../Utils/CategoryUtils";
import * as fs from "fs";

const prisma = new PrismaClient();

export default new (class CategoryService {
  private readonly CategoryRepository = prisma.category;

  async addCategory(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      const { error } = addCategory.validate(body);
      if (error) return res.status(400).json(error.message);

      const tokenDecode = res.locals.loginSession.tokenPayload;
      const id = tokenDecode.id;

      const image = req.file;
      if (!image) return res.status(400).json({ message: "No file added" });

      const uploadCloudinary = await cloudinary.uploader.upload(image.path, {
        folder: "batch53",
      });

      fs.unlinkSync(image.path);

      const newCategory = await this.CategoryRepository.create({
        data: {
          nameCategory: body.nameCategory,
          type: body.type,
          imageCategory: uploadCloudinary.secure_url,
          userId: id,
        },
      });

      return res.status(201).json(newCategory);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getCategoryByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      const { error } = addCategory.validate(body);
      if (error) return res.status(400).json(error.message);

      const tokenDecode = res.locals.loginSession.tokenPayload;
      const id = tokenDecode.id;

      const thisCategory = await this.CategoryRepository.findMany({
        where: { userId: id },
      });

      if (!thisCategory)
        return res.status(400).json({
          message: "No category found!",
        });

      return res.status(201).json(thisCategory);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();

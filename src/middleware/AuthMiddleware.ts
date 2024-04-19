import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default new (class AuthMiddleware {
  AuthTi(req: Request, res: Response, next: NextFunction) {
    try {
      const AuthorZ = req.header("Authorization");
      if (!AuthorZ || !AuthorZ.startsWith("Bearer")) {
        return res.status(401).json({ Error: "unathorization" });
      }
      const token = AuthorZ.split(" ")[1];
      if (!token) return res.status(400).json({ message: "Token not found!" });

      try {
        const loginSession = jwt.verify(token, "SECRET_KEY");
        res.locals.loginSession = loginSession;
        next();
      } catch (error) {
        return res.status(400).json({ message: "Token Failed" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();

import UserController from "../Controller/UserController";
import * as express from "express";
import upload from "../middleware/UploadMiddleware";
import CategoryController from "../Controller/CategoryController";
import path from "path";
import AuthMiddleware from "../middleware/AuthMiddleware";
import { addTransaction } from "../Utils/TransactionUtils";
import TransactionController from "../Controller/TransactionController";
import CashflowController from "../Controller/CashflowController";

const router = express.Router();

// User Router
router.post("/register", UserController.register);
router.get("/login", UserController.login);

// Cashflow Router
router.get("/findBalanceById", AuthMiddleware.AuthTi, CashflowController.findBalanceById);

// Category Router
router.post("/addCategory", AuthMiddleware.AuthTi, upload.single("image/"), CategoryController.addCategory);
router.get("/getCategoryByUserId", AuthMiddleware.AuthTi, CategoryController.getCategoryByUserId);

// Transaction Router
router.get("/findByID", AuthMiddleware.AuthTi, TransactionController.findByID);
router.post("/addTransaction", AuthMiddleware.AuthTi, TransactionController.addTransaction);
router.get("/lastMonthTransaction", AuthMiddleware.AuthTi, TransactionController.lastMonthTransaction);
router.get("/currentMonthTransactions", AuthMiddleware.AuthTi, TransactionController.currentMonthTransactions);
router.get("/nextTransactions", AuthMiddleware.AuthTi, TransactionController.nextTransactions);

router.use("/uploads", express.static(path.join(__dirname, "uploads")));
export default router;

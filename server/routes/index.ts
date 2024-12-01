import { Router } from "express";
import testRoutes from "./test.route";

const router = Router();
router.use("/test", testRoutes);

export default router;

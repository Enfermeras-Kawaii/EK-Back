import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
const validator =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body
        })
        return next();
    } catch (error: any) {
        return res.status(400).json(error.issues.map((issue: any)=>issue.message))
    }
  };
export default validator
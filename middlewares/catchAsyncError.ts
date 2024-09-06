import { Request, Response, NextFunction } from "express";
export const CatchAsyncError =
  (fun: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fun(req, res, next)).catch(next);
  };

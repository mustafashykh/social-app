import { Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { DecodedToken } from "@models";

export async function isAuthenticated(req: Request, res: Response, next: Function) {
   const { authorization } = req.headers

   if (!authorization)
       return res.status(401).send({ message: 'Unauthorized' });

   if (!authorization.startsWith('Bearer'))
       return res.status(401).send({ message: 'Unauthorized' });

   const split = authorization.split('Bearer ')
   if (split.length !== 2)
       return res.status(401).send({ message: 'Unauthorized' });

   const token = split[1]

   try {
      const decodedToken: DecodedToken = verify(token, `${process.env.SECRET}`) as DecodedToken;
      res.locals = { ...res.locals, uid: decodedToken._id, email: decodedToken.email }
      return next();
   }
   catch (err) {
       console.log(err)
      return res.status(401).send({ message: 'Unauthorized' });
   }
}
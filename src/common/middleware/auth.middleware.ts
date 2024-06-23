import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Pick<
      User,
      'id' | 'email'
    >;
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Invalid token' });
  }
}

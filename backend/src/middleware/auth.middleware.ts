import type { NextFunction, Request, Response } from "express";
import { type JwtPayload, decode } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; //stores the cognitoId
        role: string;
      };
    }
  }
}

/**
 * For AuthZ - check if the user has access to the resource
 * Can also be used for AuthN as we deny the request if the user is not authenticated
 * @param allowedRoles
 */
export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = decode(token) as DecodedToken;
      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userRole = decoded["custom:role"] || "";
      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      const hasAccess = allowedRoles.includes(userRole.toLowerCase());
      if (!hasAccess) {
        return res.status(403).json({
          message: `Access Denied: You do not have access to resource on this ${req.originalUrl} route`,
        });
      }
    } catch (error) {
      console.error("Failed to decode token");
      res.status(400).json({ message: "Failed to decode token" });
    }

    next();
  };
};

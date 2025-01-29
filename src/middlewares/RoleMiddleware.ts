import { Request, Response, NextFunction } from "express";

const checkUserRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (user && user.role === role) {
      next();
      return;
    }

    res.status(403).json({
      success: false,
      data: {
        message: `Access denied. Only ${role.replace(
          "_",
          " "
        )} users can access this resource.`,
      },
    });
  };
};

export const isHealthcareProfessional = checkUserRole(
  "healthcare_professional"
);
export const isAdmin = checkUserRole("admin");
export const isPatient = checkUserRole("patient");

export interface Account {
  id: number;
  email: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  roleId: number;
};

export interface Role {
  id: number;
  roleName: string;
  description: string;
};

export interface Company {
  id: number;
  companyCode: string;
  companyNameVI: string;
  companyNameEN: string;
  accountId: number;
  companyTypeId: number;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface VerificationProcess {
  id: number;
  reviewedAt?: Date;
  validFrom?: Date;
  validTo?: Date;
  isOpenedByAgent: boolean;
  submitMethod: string;
  companyTypeId?: number;
  assignedAgentId?: number;
  companyId: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

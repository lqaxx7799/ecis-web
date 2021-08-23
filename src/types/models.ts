export interface BaseModel {
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

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

export interface Company extends BaseModel {
  id: number;
  companyCode: string;
  companyNameVI: string;
  companyNameEN: string;
  accountId: number;
  companyTypeId: number;
  isVerified: boolean;
};

export interface VerificationProcess extends BaseModel {
  id: number;
  submitDeadline?: Date;
  submittedAt?: Date;
  reviewedAt?: Date;
  validFrom?: Date;
  validTo?: Date;
  isOpenedByAgent: boolean;
  isSubmitted: boolean;
  submitMethod: string;
  companyTypeId?: number;
  assignedAgentId?: number;
  companyId: number;
};

export interface VerificationCriteria extends BaseModel {
  id: number;
  approvedStatus?: string;
  verificationProcessId?: number;
  criteriaId?: number;
};

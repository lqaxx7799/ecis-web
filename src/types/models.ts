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

export interface CriteriaType extends BaseModel {
  id: number;
  criteriaTypeName: string;
  description: string;
};

export interface Criteria extends BaseModel {
  id: number;
  criteriaName: string;
  description: string;
  criteriaTypeId: number;
};

export interface CriteriaDetail extends BaseModel {
  id: number;
  criteriaDetailName: string;
  description: string;
  criteriaId: number;
  isRequired: boolean;
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

export interface CompanyType extends BaseModel {
  id: number;
  typeName: string;
  description: string;
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
  isReviewed: boolean;
  status: string;
  submitMethod: string;
  companyTypeId?: number;
  assignedAgentId?: number;
  companyId: number;
  company: Company;
};

export interface VerificationCriteria extends BaseModel {
  id: number;
  approvedStatus?: string;
  companyOpinion: string;
  companyRate?: boolean | null;
  reviewResult: string;
  reviewComment: string;
  verificationProcessId?: number;
  criteriaDetailId?: number;
};

export interface VerificationDocument extends BaseModel {
  id: number;
  content: string;
  documentName: string;
  resourceType: string;
  resourceSize: number;
  resourceUrl: string;
  uploaderType: string;
  verificationCriteriaId: number;
};

export interface DocumentReview extends BaseModel {
  id: number;
  content: string;
  verificationDocumentId: number;
};

export interface Agent extends BaseModel {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  accountId: number;
};

export interface VerificationConfirmRequirement extends BaseModel {
  id: number; 
  scheduledTime: Date;
  scheduledLocation: string; 
  announcedAgentAt?: Date; 
  announcedCompanyAt?: Date;
  confirmedAt?: Date; 

  announceAgentDocumentContent?: string;
  announceAgentDocumentUrl?: string;
  announceAgentDocumentType?: string;
  announceAgentDocumentSize?: number;
  announceAgentDocumentName?: string;
  isUsingAnnounceAgentFile: boolean;

  announceCompanyDocumentContent?: string;
  announceCompanyDocumentUrl?: string;
  announceCompanyDocumentType?: string;
  announceCompanyDocumentSize?: number;
  announceCompanyDocumentName?: string;
  isUsingAnnounceCompanyFile: boolean;

  confirmDocumentContent?: string;
  confirmDocumentUrl?: string;
  confirmDocumentType?: string;
  confirmDocumentSize?: number;
  confirmDocumentName?: string;
  isUsingConfirmFile: boolean;

  verificationProcessId: number;
  assignedAgentId: number;
  confirmCompanyTypeId: number;
};

export interface CompanyTypeModification extends BaseModel {
  id: number;
  modification: string;
  isAnnounced: boolean;
  companyId: number;
  previousCompanyTypeId: number;
  updatedCompanyTypeId: number;
  verificationProcessId: number;
  companyReportId: number;
  modificationTypeId: number;
  company: Company;
  previousCompanyType: CompanyType;
  updatedCompanyType: CompanyType;
};

export interface CompanyReport extends BaseModel {
  id: number;
  actionTitle: string;
  description: string;
  acceptedAt?: Date;
  handledAt?: Date;
  isHandled: boolean;
  verificationProcessId: number;
  companyReportTypeId: number;
  targetedCompanyId: number;
  creatorCompanyId: number;
  assignedAgentId: number;
};

export interface CompanyReportDocument extends BaseModel {
  id: number;
  documentType: string;
  documentUrl: string;
  documentName: string;
  documentSize: number;
  companyReportId: number;
};

export interface ThirdParty extends BaseModel {
  id: number;
  userName: string;
  clientId: string;
  clientSecret: string;
  isActive: string;
  accountId: number;
  account: Account;
};

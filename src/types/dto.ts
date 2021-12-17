import { CompanyReportDocument } from "./models";

export interface CompanyRegistrationDTO {
  email: string;
  companyCode: string;
  companyNameVI: string;
  companyNameEN: string;
};

export interface LogInDTO {
  email: string;
  password: string;
};

export interface UploadFileResponseDTO {
  name: string;
  type: string;
  size: number;
  url: string;
};

export interface CompanyReportDTO {
  actionTitle: string;
  description: string;
  targetedCompanyId: number; 
  creatorCompanyId: number; 
  companyReportDocuments: Partial<CompanyReportDocument>[];
};

export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
  reenterNewPassword: string;
};

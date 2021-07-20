export interface Account {
  Id: number;
  Email: string;
  IsVerified: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
};

export interface Company {
  Id: number;
  CompanyCode: string;
  CompanyNameVI: string;
  CompanyNameEN: string;
  AccountId: number;
  CompanyTypeId: number;
  IsVerified: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
};

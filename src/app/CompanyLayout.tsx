import { Button, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "./MainLayout";

type Props = {
  children?: React.ReactNode;
};

const CompanyLayout = (props: Props) => {
  return (
    <MainLayout isBleedLayout>
      <div className="main-body">
        <div className="side-menu">
          <div>
            <Button variant="light" fullWidth component={Link} to="/doanh-nghiep">
              Dashboard
            </Button>
            <Button variant="light" fullWidth component={Link} to="/doanh-nghiep/tu-danh-gia">
              Tự đánh giá
            </Button>
          </div>
        </div>
        <div className="main-content">
          {props.children}
        </div>
      </div>
    </MainLayout>
  );
};

export default CompanyLayout;

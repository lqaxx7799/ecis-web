import { Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "./MainLayout";

type Props = {
  children?: React.ReactNode;
};

const CompanyLayout = (props: Props) => {
  return (
    <MainLayout isBleedLayout>
      <div className="side-menu">
        <div>
          <Text>
            <Link to="/doanh-nghiep">Trang chủ</Link>
          </Text>
        </div>
      </div>
      {props.children}
    </MainLayout>
  );
};

export default CompanyLayout;

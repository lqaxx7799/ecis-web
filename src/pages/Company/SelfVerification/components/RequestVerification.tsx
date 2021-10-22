import { Button, Text, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { ChevronLeftIcon, UploadIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { ChangeEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import fileServices from "../../../../common/services/file.services";
import { UploadFileResponseDTO } from "../../../../types/dto";
import { CompanyReportDocument } from "../../../../types/models";

type Props = {
  
};

const RequestVerification = (props: Props) => {
  const notifications = useNotifications();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSelectFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const handleAnnounceFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      Promise.all(Array.from(files).map((file) => fileServices.uploadFile(file)))
        .then((result) => {
          _.forEach(result, (item) => {
            // append({
            //   documentName: item.name,
            //   documentType: item.type,
            //   documentUrl: item.url,
            //   documentSize: item.size,
            // });
          });
        })
        .catch(() => {
          notifications.showNotification({
            color: 'red',
            title: 'Lỗi hệ thống',
            message: 'Đã xảy ra lỗi trong quá trình tải tập tin, vui lòng thử lại sau.',
          });
        });
    }
  };


  return (
    <div>
      <Title order={1}>Yêu cầu tự đánh giá</Title>

      <Button
        style={{ marginTop: '12px' }}
        component={Link}
        leftIcon={<ChevronLeftIcon />}
        to={`/doanh-nghiep/tu-danh-gia`}
      >
        Quay lại
      </Button>

      <div style={{ marginTop: '12px' }}>
        <Text>
          Nếu doanh nghiệp của bạn chưa đến hạn phân loại, nhưng đã đủ điều kiện để đánh giá lại,
          bạn cần cung cấp các tài liệu chứng minh doanh nghiệp đã đủ điều kiện cho hệ thống. Nếu 
          yêu cầu của bạn được duyệt, doanh nghiệp của bạn sẽ được thông báo để thực hiện quy trình
          đánh giá doanh nghiệp tiêu chuẩn.
        </Text>
      </div>

      <Button
        leftIcon={<UploadIcon />}
        onClick={onSelectFileDialog}
      >
        Tải tập tin
      </Button>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleAnnounceFileUpload}
      />

    </div>
  );
};

export default RequestVerification;

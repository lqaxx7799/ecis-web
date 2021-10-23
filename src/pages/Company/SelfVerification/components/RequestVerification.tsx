import { Button, Text, Textarea, TextInput, Title, Tooltip } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { ChevronLeftIcon, TrashIcon, UploadIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Controller, set, useFieldArray, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import companyReportActions from "../../../../common/actions/companyReport.action";
import FileInfo from "../../../../common/components/FileInfo";
import fileServices from "../../../../common/services/file.services";
import { CompanyReportDTO, UploadFileResponseDTO } from "../../../../types/dto";
import { CompanyReportDocument } from "../../../../types/models";

type Props = {
  
};

type CompanyReportDTOTemp = {
  actionTitle: string;
  description: string;
  targetedCompanyId: string; 
  creatorCompanyId: string; 
  companyReportDocuments: Partial<CompanyReportDocument>[];
};

const RequestVerification = (props: Props) => {
  const notifications = useNotifications();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { company } = useAppSelector((state) => state.authentication);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<CompanyReportDTOTemp>();
  const watcher = watch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'companyReportDocuments',  
  });

  const onSelectFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const handleAnnounceFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      Promise.all(Array.from(files).map((file) => fileServices.uploadFile(file)))
        .then((result) => {
          _.forEach(result, (item) => {
            append({
              documentName: item.name,
              documentType: item.type,
              documentUrl: item.url,
              documentSize: item.size,
            });
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

  const onSubmit = (data: CompanyReportDTOTemp) => {
    const formattedData: CompanyReportDTO = {
      ...data,
      targetedCompanyId: company?.id ?? 0,
      creatorCompanyId: company?.id ?? 0,
    };
    dispatch(companyReportActions.create(formattedData))
      .then(() => {
        notifications.showNotification({
          color: 'green',
          title: 'Gửi yêu cầu thành công',
          message: 'Gửi yêu cầu thành công. Khi yêu cầu được xử lý, kết quả sẽ được gửi vào email của bạn',
        });
        history.push('/doanh-nghiep/tu-danh-gia');
      })
      .catch(() => {
        notifications.showNotification({
          color: 'red',
          title: 'Lỗi hệ thống',
          message: 'Đã xảy ra lỗi trong quá trình gửi báo cáo vi phạm, vui lòng thử lại sau.',
        });
      });
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

      <div style={{ marginTop: '24px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Controller
            name="actionTitle"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <TextInput
                {...field}
                elementRef={ref}
                style={{
                  marginBottom: '12px',
                }}
                label="Tên yêu cầu"
                placeholder="Mô tả yêu cầu"
                error={errors.actionTitle && errors.actionTitle.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <Textarea
                {...field}
                elementRef={ref}
                style={{
                  marginBottom: '12px',
                }}
                label="Mô tả vấn đề"
                placeholder="Mô tả vấn đề bằng 1-2 câu"
                error={errors.description && errors.description.message}
              />
            )}
          />

          <Title order={3} style={{ marginTop: '12px' }}>Tải tài liệu</Title>

          <Button
            leftIcon={<UploadIcon />}
            onClick={onSelectFileDialog}
            style={{ marginBottom: '12px' }}
          >
            Tải tập tin
          </Button>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleAnnounceFileUpload}
          />

          <div style={{ width: '400px' }}>
            {fields.map((field, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <FileInfo
                  data={{
                    name: field.documentName ?? '',
                    type: field.documentType ?? '',
                    url: field.documentUrl ?? '',
                    size: field.documentSize ?? 0,
                  }}
                />
                <Tooltip
                  label="Gỡ tài liệu"
                >
                  <Button onClick={() => remove(index)}>
                    <TrashIcon />
                  </Button>
                </Tooltip>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            style={{ marginTop: '12px' }}
          >
            Gửi báo cáo
          </Button>

        </form>
      </div>
    </div>
  );
};

export default RequestVerification;

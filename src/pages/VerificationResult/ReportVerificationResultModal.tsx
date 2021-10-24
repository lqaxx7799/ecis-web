import { Button, Group, Modal, Text, Textarea, TextInput, Title, Tooltip } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { TrashIcon, UploadIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { ChangeEvent, useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store";
import companyReportActions from "../../common/actions/companyReport.action";
import FileInfo from "../../common/components/FileInfo";
import fileServices from "../../common/services/file.services";
import { CompanyReportDTO } from "../../types/dto";
import { CompanyReportDocument } from "../../types/models";

type Props = {
  isOpening: boolean,
  setIsOpening: (state: boolean) => void,
};

type CompanyReportDTOTemp = {
  actionTitle: string;
  description: string;
  targetedCompanyId: string; 
  creatorCompanyId: string; 
  companyReportDocuments: Partial<CompanyReportDocument>[];
};

const ReportVerificationResultModal = (props: Props) => {
  const notifications = useNotifications();
  const dispatch = useAppDispatch();

  const { editingProcess } = useAppSelector((state) => state.verificationProcess);
  const { companyTypes } = useAppSelector((state) => state.companyType);
  const { company } = useAppSelector((state) => state.authentication);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
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

  const closeModal = () => {
    props.setIsOpening(false);
    reset();
  };

  const onSubmit = (data: CompanyReportDTOTemp) => {
    const formattedData: CompanyReportDTO = {
      ...data,
      targetedCompanyId: editingProcess?.companyId ?? 0,
      creatorCompanyId: company?.id ?? 0,
    };
    dispatch(companyReportActions.create(formattedData))
      .then(() => {
        notifications.showNotification({
          color: 'green',
          title: 'Gửi yêu cầu thành công',
          message: 'Gửi yêu cầu thành công. Khi yêu cầu được xử lý, kết quả sẽ được gửi vào email của bạn',
        });
        closeModal();
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
    <Modal
      opened={props.isOpening}
      onClose={closeModal}
      title="Khiếu nại kết quả đánh giá"
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text style={{ marginBottom: '24px' }}>
          Khi bạn khiếu nại kết quả đánh giá, cục kiểm lâm sẽ xét duyệt yêu cầu của bạn.
          Nếu khiếu nại là chính xác, cục kiểm lâm sẽ yêu cầu doanh nghiệp thực hiện đánh giá
          lại phân loại của doanh nghiệp.
        </Text>

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

        <Group style={{ marginTop: '24px' }}>
          <Button type="submit">Gửi duyệt</Button>
          <Button variant="light" onClick={closeModal}>Hủy</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default ReportVerificationResultModal;

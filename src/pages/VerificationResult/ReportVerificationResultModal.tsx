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
            title: 'L???i h??? th???ng',
            message: '???? x???y ra l???i trong qu?? tr??nh t???i t???p tin, vui l??ng th??? l???i sau.',
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
          title: 'G???i y??u c???u th??nh c??ng',
          message: 'G???i y??u c???u th??nh c??ng. Khi y??u c???u ???????c x??? l??, k???t qu??? s??? ???????c g???i v??o email c???a b???n',
        });
        closeModal();
      })
      .catch(() => {
        notifications.showNotification({
          color: 'red',
          title: 'L???i h??? th???ng',
          message: '???? x???y ra l???i trong qu?? tr??nh g???i b??o c??o vi ph???m, vui l??ng th??? l???i sau.',
        });
      });
  };

  return (
    <Modal
      opened={props.isOpening}
      onClose={closeModal}
      title="Khi???u n???i k???t qu??? ????nh gi??"
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text style={{ marginBottom: '24px' }}>
          Khi b???n khi???u n???i k???t qu??? ????nh gi??, c???c ki???m l??m s??? x??t duy???t y??u c???u c???a b???n.
          N???u khi???u n???i l?? ch??nh x??c, c???c ki???m l??m s??? y??u c???u doanh nghi???p th???c hi???n ????nh gi??
          l???i ph??n lo???i c???a doanh nghi???p.
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
              label="T??n y??u c???u"
              placeholder="M?? t??? y??u c???u"
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
              label="M?? t??? v???n ?????"
              placeholder="M?? t??? v???n ????? b???ng 1-2 c??u"
              error={errors.description && errors.description.message}
            />
          )}
        />

        <Title order={3} style={{ marginTop: '12px' }}>T???i t??i li???u</Title>

        <Button
          leftIcon={<UploadIcon />}
          onClick={onSelectFileDialog}
          style={{ marginBottom: '12px' }}
        >
          T???i t???p tin
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
                label="G??? t??i li???u"
              >
                <Button onClick={() => remove(index)}>
                  <TrashIcon />
                </Button>
              </Tooltip>
            </div>
          ))}
        </div>

        <Group style={{ marginTop: '24px' }}>
          <Button type="submit">G???i duy???t</Button>
          <Button variant="light" onClick={closeModal}>H???y</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default ReportVerificationResultModal;

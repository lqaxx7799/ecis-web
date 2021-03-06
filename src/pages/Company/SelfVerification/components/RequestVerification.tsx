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
            title: 'L???i h??? th???ng',
            message: '???? x???y ra l???i trong qu?? tr??nh t???i t???p tin, vui l??ng th??? l???i sau.',
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
          title: 'G???i y??u c???u th??nh c??ng',
          message: 'G???i y??u c???u th??nh c??ng. Khi y??u c???u ???????c x??? l??, k???t qu??? s??? ???????c g???i v??o email c???a b???n',
        });
        history.push('/doanh-nghiep/tu-danh-gia');
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
    <div>
      <Title order={1}>Y??u c???u t??? ????nh gi??</Title>

      <Button
        style={{ marginTop: '12px' }}
        component={Link}
        leftIcon={<ChevronLeftIcon />}
        to={`/doanh-nghiep/tu-danh-gia`}
      >
        Quay l???i
      </Button>

      <div style={{ marginTop: '12px' }}>
        <Text>
          N???u doanh nghi???p c???a b???n ch??a ?????n h???n ph??n lo???i, nh??ng ???? ????? ??i???u ki???n ????? ????nh gi?? l???i,
          b???n c???n cung c???p c??c t??i li???u ch???ng minh doanh nghi???p ???? ????? ??i???u ki???n cho h??? th???ng. N???u 
          y??u c???u c???a b???n ???????c duy???t, doanh nghi???p c???a b???n s??? ???????c th??ng b??o ????? th???c hi???n quy tr??nh
          ????nh gi?? doanh nghi???p ti??u chu???n.
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

          <Button
            type="submit"
            style={{ marginTop: '12px' }}
          >
            G???i b??o c??o
          </Button>

        </form>
      </div>
    </div>
  );
};

export default RequestVerification;

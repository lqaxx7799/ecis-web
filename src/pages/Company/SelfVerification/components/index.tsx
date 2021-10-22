import { Alert, Button, Container, Group, LoadingOverlay, Text, Title, Tooltip } from "@mantine/core";
import _ from 'lodash';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import DataTable, { IDataTableColumn } from 'react-data-table-component';
import { VerificationProcess } from "../../../../types/models";
import { BellIcon, EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import verificationProcessActions from "../../../../common/actions/verificationProcess.action";
import dayjs from "dayjs";
import '../selfVerification.scss';
import verificationConfirmRequirementActions from "../../../../common/actions/verificationConfirmRequirement.action";
import { DEFAULT_DATETIME_FORMAT } from "../../../../common/constants/app";

type Props = {

};

const CompanySelfVerification = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, records } = useAppSelector((state) => state.verificationProcess);
  const { company } = useAppSelector((state) => state.authentication);
  const { verificationConfirmRequirements } = useAppSelector((state) => state.verificationConfirmRequirement);

  useEffect(() => {
    dispatch(verificationProcessActions.getAllByCompany(company?.id ?? 0));
    dispatch(verificationConfirmRequirementActions.getPendingByCompanyId(company?.id ?? 0));
  }, []);

  const columns: IDataTableColumn<VerificationProcess>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Thời gian tạo',
      selector: 'createdAt',
      format: (row) => dayjs(row.createdAt).format('DD/MM/YYYY'),
    },
    {
      name: 'Trạng thái',
      selector: 'status',
    },
    {
      name: 'Hành động',
      cell: (row, index) => (
        <Group>
          <Tooltip label="Xem chi tiết">
            <Button><EyeOpenIcon /></Button>
          </Tooltip>
          <Tooltip label="Cập nhật">
            <Button><Pencil2Icon /></Button>
          </Tooltip>
        </Group>
      ),
    },
  ];

  const pendingProcess = _.find(records, item => !item.isSubmitted);

  return (
    <div>
      <Title order={1}>Tự đánh giá</Title>

      {
        !_.isEmpty(verificationConfirmRequirements) &&
          _.map(verificationConfirmRequirements, (item) => (
            <Alert title="Thông báo" color="teal" key={item.id} style={{ marginTop: '12px' }}>
              <Text>Bạn có lịch hẹn với cán bộ để xác thực thông tin đánh giá của bạn.</Text>
              <Text>Địa điểm: {item.scheduledLocation ?? ''}</Text>
              <Text>Thời gian: {dayjs(item.scheduledTime).format(DEFAULT_DATETIME_FORMAT)}</Text>
            </Alert>
          ))
      }
      
      {
        pendingProcess && (
          <div style={{ marginTop: '24px' }}>
            <Text>
              Bạn đang có quá trình tự đánh giá cần phải thực hiện. Vui lòng cập nhật thông tin và
              gửi cho bộ kiểm lâm đánh giá.
            </Text>
            <Text style={{ fontWeight: 600 }}>
              Bạn cần hoàn thành trước {dayjs(pendingProcess.submitDeadline).format('DD/MM/YYYY HH:mm')}.
            </Text>
            <Button
              style={{ marginTop: '12px' }}
              component={Link}
              to={`/doanh-nghiep/tu-danh-gia/chi-tiet/${pendingProcess.id}`}
            >
              Xem chi tiết
            </Button>
          </div>
        )
      }
      {
        !pendingProcess && (
          <div style={{ marginTop: '24px' }}>
            <Text>
              Bạn đang có thể yêu cầu đánh giá trước thời hạn nếu doanh nghiệp của bạn đã đủ
              điều kiện.
            </Text>
            <Button
              style={{ marginTop: '12px' }}
              component={Link}
              to="/doanh-nghiep/yeu-cau-tu-danh-gia"
            >
              Yêu cầu
            </Button>
          </div>
        )
      }

      <div style={{ marginTop: '24px' }}>
        <LoadingOverlay visible={loading} />

        <DataTable
          title={<Title order={2}>Quá trình tự đánh giá</Title>}
          columns={columns}
          data={records}
          noDataComponent={<Text>Không có dữ liệu</Text>}
        />
      </div>

    </div>
  );
};

export default CompanySelfVerification;

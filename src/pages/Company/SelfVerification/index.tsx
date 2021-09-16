import { Button, Container, Group, LoadingOverlay, Text, Title, Tooltip } from "@mantine/core";
import _ from 'lodash';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import DataTable, { IDataTableColumn } from 'react-data-table-component';
import { VerificationProcess } from "../../../types/models";
import { EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import verificationProcessActions from "../../../common/actions/verificationProcess.action";
import dayjs from "dayjs";
import './selfVerification.scss';

type Props = {

};

const CompanySelfVerification = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, records } = useAppSelector((state) => state.verificationProcess);
  const { company } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(verificationProcessActions.getAllByCompany(company?.id ?? 0));
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

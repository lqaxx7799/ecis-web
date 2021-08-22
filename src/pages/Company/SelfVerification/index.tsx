import { Button, Container, Group, LoadingOverlay, Text, Title, Tooltip } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import DataTable, { IDataTableColumn } from 'react-data-table-component';
import { VerificationProcess } from "../../../types/models";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import verificationProcessActions from "../../../common/actions/verificationProcess.action";


type Props = {

};

const CompanySelfVerification = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, records } = useAppSelector((state) => state.verificationProcess);
  const { company } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(verificationProcessActions.getAllByCompany(company?.accountId ?? 0));
  }, []);

  const columns: IDataTableColumn<VerificationProcess>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Thời gian',
      selector: 'createdAt',
    },
    {
      name: 'Trạng thái',
      selector: 'status',
    },
    {
      name: 'Hành động',
      format: (row, index) => (
        <Group>
          <Tooltip label="Xem chi tiết">
            <Button><Pencil2Icon /></Button>
          </Tooltip>
          <Tooltip label="Cập nhật">
            <Button><Pencil2Icon /></Button>
          </Tooltip>
        </Group>
      ),
    },
  ];

  return (
    <div>
      <Title order={1}>Tự đánh giá</Title>

      <div style={{ marginTop: '24px' }}>
        <Text>
          Bạn đang có quá trình tự đánh giá cần phải thực hiện. Vui lòng cập nhật thông tin và
          gửi cho bộ kiểm lâm đánh giá.
        </Text>
        <Button
          style={{ marginTop: '12px' }}
          component={Link}
          to="/doanh-nghiep/tu-danh-gia/123"
        >
          Cập nhật
        </Button>
      </div>

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

import { Accordion, AccordionItem, Button, LoadingOverlay, Table, Text, Title } from "@mantine/core";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import verificationProcessActions from "../../common/actions/verificationProcess.action";
import { DEFAULT_DATETIME_FORMAT } from "../../common/constants/app";
import ReportVerificationResultModal from "./ReportVerificationResultModal";

type Props = {

};

type RouteParams = {
  id: string;
};

const VerificationResultDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id: verificationId } = useParams<RouteParams>();
  const {
    loading,
    editingProcess,
    verificationCriterias,
    verificationDocuments,
  } = useAppSelector((state) => state.verificationProcess);
  const { companyTypes } = useAppSelector((state) => state.companyType);

  const [reportModalOpening, setReportModalOpening] = useState(false);

  useEffect(() => {
    dispatch(verificationProcessActions.loadVerificationDetail(parseInt(verificationId)));
  }, [dispatch, verificationId]);

  const currentType = _.find(companyTypes, (type) => type.id === editingProcess?.companyTypeId);

  return (
    <div>
      <Helmet>
        <title>Kết quả phân loại doanh nghiệp</title>
      </Helmet>

      <LoadingOverlay visible={loading} />

      <Title order={1}>Kết quả phân loại doanh nghiệp</Title>
      <Button
        style={{ marginTop: '12px' }}
        component={Link}
        to="/ket-qua-phan-loai"
      >
        Quay lại
      </Button>
  
      <div style={{ marginTop: '24px' }}>
        <Title order={3} style={{ marginBottom: '12px' }}>Thông tin doanh nghiệp</Title>
        <Table>
          <tbody>
            <tr>
              <td style={{ width: '300px' }}>Tên doanh nghiệp (Tiếng Việt)</td>
              <td>{editingProcess?.company?.companyNameVI}</td>
            </tr>
            <tr>
              <td>Tên doanh nghiệp (Tiếng Anh)</td>
              <td>{editingProcess?.company?.companyNameEN ?? '-'}</td>
            </tr>
            <tr>
              <td>Mã doanh nghiệp</td>
              <td>{editingProcess?.company?.companyCode}</td>
            </tr>
            <tr>
              <td>Phân loại</td>
              <td>{currentType?.typeName ?? 'Chưa đánh giá'}</td>
            </tr>
            <tr>
              <td>Ngày bắt đầu đánh giá</td>
              <td>{dayjs(editingProcess?.createdAt).format(DEFAULT_DATETIME_FORMAT)}</td>
            </tr>
            <tr>
              <td>Ngày hoàn thành</td>
              <td>{dayjs(editingProcess?.reviewedAt).format(DEFAULT_DATETIME_FORMAT)}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div style={{ marginTop: '24px' }}>
      <Accordion>
        <AccordionItem label="Thao tác">
          <Text
            variant="link"
            onClick={() => setReportModalOpening(true)}
          >
            Khiếu nại kết quả
          </Text>
        </AccordionItem>
      </Accordion>
      </div>

      <ReportVerificationResultModal
        isOpening={reportModalOpening}
        setIsOpening={setReportModalOpening}
      />
    </div>
  );
};

export default VerificationResultDetail;
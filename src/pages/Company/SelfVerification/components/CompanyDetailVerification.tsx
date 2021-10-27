import { Button, LoadingOverlay, Modal, Text, Title } from "@mantine/core";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import companySelfVerificationActions from "../../../CompanySelfVerification/action";
import UploadedFileItem from "./UploadedFileItem";

type Props = {

};

type RouteParams = {
  id: string;
};

const CompanyDetailVerification = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    loading,
    editingProcess,
    verificationCriterias,
    verificationDocuments,
  } = useAppSelector((state) => state.companySelfVerification);
  const { criterias } = useAppSelector((state) => state.criteria);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);

  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  let { id } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(companySelfVerificationActions.loadSelfVerification(parseInt(id)));
  }, []);

  const submitVerification = () => {
    console.log(111111111, 'submit');
    setShowSubmitDialog(false);
  }

  const groupedCriteria = _.groupBy(verificationCriterias, editingCriteria => {
    const found = _.find(criterias, criteria => criteria.id === editingCriteria.criteriaDetailId);
    return found?.criteriaTypeId;
  });

  return (
    <div className="company-verification-form">
      <LoadingOverlay visible={loading} />
      <Title order={1}>Chi tiết tự đánh giá</Title>
      <Button
        style={{ marginTop: '12px' }}
        component={Link}
        leftIcon={<ChevronLeftIcon />}
        to={`/doanh-nghiep/tu-danh-gia`}
      >
        Quay lại
      </Button>
      
      <div style={{ marginTop: '24px' }}>
        <Text>Chi tiết tự đánh giá ngày {dayjs(editingProcess?.createdAt).format('DD/MM/YYYY')}</Text>
        <div style={{ marginTop: '12px' }}>
          <Button
            variant="light"
            style={{ marginRight: '12px' }}
            component={Link}
            to={`/doanh-nghiep/tu-danh-gia/sua/${editingProcess?.id}`}
          >
            Chỉnh sửa
          </Button>
          <Button
            onClick={() => setShowSubmitDialog(true)}
          >
            Gửi đánh giá
          </Button>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        {
          Object.keys(groupedCriteria).map((criteriaTypeId) => {
            const criteriaType = _.find(criteriaTypes, type => type.id === parseInt(criteriaTypeId));

            const criteriaList = groupedCriteria[criteriaTypeId];
            return (
              <div key={criteriaTypeId}>
                <Title order={3}>{criteriaType?.criteriaTypeName ?? ''}</Title>
                {/* <VerificationCriteriaForm
                  verificationCriterias={criteriaList}
                /> */}
                <div className="criteria-group">
                  {_.map(criteriaList, (item, index) => {
                    const criteria = _.find(
                      criterias,
                      (criteria) => criteria.id === item.criteriaDetailId
                    );
                    const documents = _.filter(
                      verificationDocuments,
                      (document) => document.verificationCriteriaId === criteria?.id
                    );
                    return (
                      <div
                        className="criteria-item"
                        key={index}
                      >
                        <Title order={5}>{criteria?.criteriaName ?? ''}</Title>
                        <div style={{ marginTop: '12px' }}>
                          {
                            _.isEmpty(documents) ? 'Trống' :
                              _.map(documents, (document) => (
                                <UploadedFileItem document={document} />
                              ))
                          }
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            );
          })
        }
      </div>

      <Modal
        opened={showSubmitDialog}
        onClose={() => setShowSubmitDialog(false)}
        title="Xác nhận gửi bản tự đánh giá!"
      >
        <Text>
          Vui lòng kiểm tra đầy đủ thông tin trước khi gửi bản tự đánh giá. Bản tự đánh giá sau khi được gửi sẽ không thể hoàn tác.
        </Text>
        <div style={{ marginTop: '12px' }}>
          <Button style={{ marginRight: '12px' }} onClick={submitVerification}>Xác nhận</Button>
          <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>Hủy</Button>
        </div>
      </Modal>
    </div>
  );
};

export default CompanyDetailVerification;

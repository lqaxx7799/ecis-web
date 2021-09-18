import { Button, LoadingOverlay, Title } from "@mantine/core";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationProcessActions from "../../../common/actions/verificationProcess.action";
import CompanyEditVerificationCriteria from "./CompanyEditVerificationCriteria";

type Props = {

};

type RouteParams = {
  id: string;
};

const CompanyEditVerification = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, editingProcess, editingCriterias } = useAppSelector((state) => state.verificationProcess);
  const { criterias } = useAppSelector((state) => state.criteria);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);

  let { id } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(verificationProcessActions.loadEditingProcess(parseInt(id)));
  }, []);

  const groupedCriteria = _.groupBy(editingCriterias, editingCriteria => {
    const found = _.find(criterias, criteria => criteria.id === editingCriteria.criteriaId);
    return found?.criteriaTypeId;
  });

  return (
    <div className="company-verification-form">
      <LoadingOverlay visible={loading} />
      <Title order={1}>Cập nhật tự đánh giá</Title>
      <Button
        style={{ marginTop: '12px' }}
        component={Link}
        leftIcon={<ChevronLeftIcon />}
        to={`/doanh-nghiep/tu-danh-gia`}
      >
        Quay lại
      </Button>
      
      <div style={{ marginTop: '24px' }}>
        {
          Object.keys(groupedCriteria).map((criteriaTypeId) => {
            const criteriaType = _.find(criteriaTypes, type => type.id === parseInt(criteriaTypeId));

            const criteriaList = groupedCriteria[criteriaTypeId];
            return (
              <div key={criteriaTypeId}>
                <Title order={3}>{criteriaType?.criteriaTypeName ?? ''}</Title>
                <CompanyEditVerificationCriteria
                  verificationCriterias={criteriaList}
                />
              </div>
            );
          })
        }

        <Button>Cập nhật</Button>
      </div>
    </div>
  );
}

export default CompanyEditVerification;

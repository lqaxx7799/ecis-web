import { Button, Paper, Text, Title } from "@mantine/core";
import { PlusIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { useAppSelector } from "../../../app/store";
import { VerificationCriteria } from "../../../types/models";

type Props = {
  verificationCriterias: VerificationCriteria[];
};

const VerificationCriteriaForm = (props: Props) => {
  const { verificationCriterias } = props;

  const { criterias } = useAppSelector((state) => state.criteria);

  return (
    <div className="criteria-group">
      {_.map(verificationCriterias, (item, index) => {
        const criteria = _.find(criterias, criteria => criteria.id === item.criteriaId);

        return (
          <div
            className="criteria-item"
            key={index}
          >
            <Title order={5}>{criteria?.criteriaName ?? ''}</Title>
            <div className="criteria-upload-wrapper">
              <Button leftIcon={<PlusIcon />}>Thêm tài liệu</Button>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default VerificationCriteriaForm;

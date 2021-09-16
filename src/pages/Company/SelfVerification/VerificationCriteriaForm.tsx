import { Button, Paper, Text, Title } from "@mantine/core";
import { PlusIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { useAppSelector } from "../../../app/store";
import FileUpload from "../../../common/components/FileUpload";
import { VerificationCriteria } from "../../../types/models";

type Props = {
  verificationCriterias: VerificationCriteria[];
};

const VerificationCriteriaForm = (props: Props) => {
  const { verificationCriterias } = props;

  const { criterias } = useAppSelector((state) => state.criteria);

  const onUpdateFiles = (files: File[]) => {
    console.log(111111, files);
  };

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
              
              <FileUpload
                uploadText="Thêm tài liệu"
                onUpdateFiles={onUpdateFiles}
              />
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default VerificationCriteriaForm;

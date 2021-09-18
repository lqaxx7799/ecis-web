import { Button, Modal, Title } from "@mantine/core";
import { NotificationsProvider, useNotifications } from "@mantine/notifications";
import { UploadIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationDocumentActions from "../../../common/actions/verificationDocument.action";
import fileServices from "../../../common/services/file.services";
import { Criteria, VerificationCriteria, VerificationDocument } from "../../../types/models";

type Props = {
  criteria?: Criteria;
  verificationCriteria: VerificationCriteria;
};

const VerificationCriteriaForm = ({ criteria, verificationCriteria }: Props) => {
  const notifications = useNotifications();
  const dispatch = useAppDispatch();

  const {
    editingDocuments,
  } = useAppSelector((state) => state.verificationProcess);

  const [showDialog, setShowDialog] = useState(false);
  const [editingDocumentId, setEditingDocumentId] = useState<number | undefined>(undefined);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const handleNewFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log(11111, files);
    if (files?.length) {
      fileServices.uploadFile(files[0])
        .then((result) => {
          const document: Partial<VerificationDocument> = {
            content: '',
            documentName: result.name,
            resourceSize: result.size,
            resourceType: result.type,
            resourceUrl: result.url,
            verificationCriteriaId: verificationCriteria.id,
            uploaderType: 'COMPANY',
          };
          dispatch(verificationDocumentActions.createDocument(document))
            .then(() => {
              setShowDialog(true);
            });
        })
        .catch((err) => {
          notifications.showNotification({
            color: 'red',
            title: 'Lỗi hệ thống',
            message: 'Đã xảy ra lỗi trong quá trình tải file, vui lòng thử lại sau.',
          });
        });
    }
  };

  if (!criteria) {
    return null;
  }
  return (
    <div
      className="criteria-item"
    >
      <Title order={5}>{criteria?.criteriaName ?? ''}</Title>
      <div className="criteria-upload-wrapper">
        <Button
          leftIcon={<UploadIcon />}
          onClick={openFileDialog}
        >
          Thêm tài liệu
        </Button>   
        {/* <FileUpload
          uploadText="Thêm tài liệu"
          onUpdateFiles={onUpdateFiles}
        /> */}
      </div>

      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleNewFileUpload}
      />
      <Modal
        opened={showDialog}
        onClose={() => setShowDialog(false)}
        title="Tải file"
      >

      </Modal>
    </div>
  );
};

export default VerificationCriteriaForm;

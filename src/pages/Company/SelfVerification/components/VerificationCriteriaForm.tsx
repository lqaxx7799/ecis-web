import { Button, Menu, MenuLabel, MenuItem, Title, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { FileTextIcon, TrashIcon, UploadIcon } from "@radix-ui/react-icons";
import { FileIcon, DefaultExtensionType, defaultStyles } from 'react-file-icon';
import _ from 'lodash';
import { ChangeEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import fileServices from "../../../../common/services/file.services";
import { Criteria, VerificationCriteria, VerificationDocument } from "../../../../types/models";
import companySelfVerificationActions from "../../../CompanySelfVerification/action";

type Props = {
  criteria?: Criteria;
  verificationCriteria: VerificationCriteria;
};

const VerificationCriteriaForm = ({ criteria, verificationCriteria }: Props) => {
  const notifications = useNotifications();
  const dispatch = useAppDispatch();

  const { verificationDocuments } = useAppSelector((state) => state.companySelfVerification);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredDocuments = _.filter(
    verificationDocuments, 
    (document) => document.verificationCriteriaId === verificationCriteria.id
  );

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
          dispatch(companySelfVerificationActions.createDocument(document))
            .then((createdDocument) => {
              dispatch(companySelfVerificationActions.changeEditDocumentModalState(true));
              dispatch(companySelfVerificationActions.editDocument(createdDocument));
            });
        })
        .catch((err) => {
          notifications.showNotification({
            color: 'red',
            title: 'L???i h??? th???ng',
            message: '???? x???y ra l???i trong qu?? tr??nh t???i file, vui l??ng th??? l???i sau.',
          });
        });
    }
  };

  const onInitEditDocument = (document: VerificationDocument) => {
    dispatch(companySelfVerificationActions.changeEditDocumentModalState(true));
    dispatch(companySelfVerificationActions.editDocument(document));
  };

  const onRemoveDocument = (documentId: number) => {
    dispatch(companySelfVerificationActions.removeDocument(documentId));
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
        <div>
          {
            _.isEmpty(filteredDocuments)
              ? <Text style={{ marginBottom: '12px' }}>B???n ch??a th??m t??i li???u</Text>
              : _.map(filteredDocuments, (document) => (
                <div className="uploaded-file-item" key={document.id}>
                  <div className="file-info">
                    <span className="file-icon-24">
                      <FileIcon
                        extension={document.resourceType}
                        {...defaultStyles[document.resourceType as DefaultExtensionType]}
                      />
                    </span>
                    <span className="file-name" onClick={() => onInitEditDocument(document)}>
                      {document.documentName}
                    </span>
                  </div>
                  <div>
                    <Menu>
                      <MenuLabel>H??nh vi</MenuLabel>
                      <MenuItem
                        icon={<FileTextIcon />}
                        onClick={() => onInitEditDocument(document)}
                      >
                        Xem chi ti???t
                      </MenuItem>
                      <MenuItem
                        icon={<TrashIcon />}
                        onClick={() => onRemoveDocument(document.id)}
                        color="red"
                      >
                        X??a t??i li???u
                      </MenuItem>
                    </Menu>
                  </div>
                </div> 
              ))
          }
        </div>
        <Button
          leftIcon={<UploadIcon />}
          onClick={openFileDialog}
        >
          Th??m t??i li???u
        </Button>   
      </div>

      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleNewFileUpload}
      />
    </div>
  );
};

export default VerificationCriteriaForm;

import { Button, Menu, MenuItem, MenuLabel, Modal, Table, Text, Tooltip } from '@mantine/core';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FileIcon, defaultStyles, DefaultExtensionType } from 'react-file-icon';
import { DEFAULT_DATETIME_FORMAT } from '../../../../common/constants/app';
import helpers from '../../../../common/utils/helpers';
import config from '../../../../config';
import { VerificationDocument } from '../../../../types/models';

type Props = {
  document: VerificationDocument;
};

const UploadedFileItem = ({ document }: Props) => {
  const [opened, setOpened] = useState(false);

  const fileIcon = (
    <FileIcon
      extension={document.resourceType}
      {...defaultStyles[document.resourceType as DefaultExtensionType]}
    />
  );

  return (
    <>    
      <div className="uploaded-file-item">
        <div className="file-info">
          <span className="file-icon-24">
            {fileIcon}
          </span>
          <span className="file-name" onClick={() => setOpened(true)}>
            {document.documentName}
          </span>
        </div>
        <div>
          {/* <Menu>
            <MenuLabel>Hành vi</MenuLabel>
            <MenuItem icon={<FileTextIcon />}>Xem chi tiết</MenuItem>
            <MenuItem icon={<ExternalLinkIcon />}>Mở file</MenuItem>
          </Menu> */}
        </div>
      </div>
      <Modal
        size="xl"
        opened={opened}
        onClose={() => setOpened(false)}
        title={(
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <span className="file-icon-24">
              {fileIcon}
            </span>
            <Text
              variant="link"
              component="a"
              href={`${config.BASE_API}${document.resourceUrl}`}
              rel="noreffer noopener"
              target="_blank"
            >
              {document.documentName}
              <ExternalLinkIcon style={{ marginLeft: '4px' }} />
            </Text>
          </span>
        )}
      >
        <Table
          striped
          highlightOnHover
        >
          <tbody>
            <tr>
              <td>Tên file</td>
              <td>{document.documentName}</td>
            </tr>
            <tr>
              <td>Kiểu file</td>
              <td>{document.resourceType}</td>
            </tr>
            <tr>
              <td>Kích thước file</td>
              <td>{helpers.bytesToSize(document.resourceSize)}</td>
            </tr>
            <tr>
              <td>Ngày tải lên</td>
              <td>{dayjs(document.createdAt).format(DEFAULT_DATETIME_FORMAT)}</td>
            </tr>
            <tr>
              <td>Mô tả file</td>
              <td>{document.content}</td>
            </tr>
            <tr>
              <td>Nhận xét</td>
              <td>...</td>
            </tr>
          </tbody>
        </Table>
      </Modal>
    </>
  );
};

export default UploadedFileItem;

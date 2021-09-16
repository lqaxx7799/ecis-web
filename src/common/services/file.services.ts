import request from '../utils/request';

function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('File', file);
  return request.post('/File', formData);
}

const fileServices = {
  uploadFile,
};

export default fileServices;

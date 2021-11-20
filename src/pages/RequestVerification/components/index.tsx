import { FileIcon, TrashIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { ChangeEvent, useRef } from "react";
import { Helmet } from "react-helmet";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyReportActions from "../../../common/actions/companyReport.action";
import fileServices from "../../../common/services/file.services";
import { CompanyReportDTO } from "../../../types/dto";
import { CompanyReportDocument } from "../../../types/models";

type Props = {

};

type CompanyReportDTOTemp = {
  actionTitle: string;
  description: string;
  targetedCompanyId: string; 
  creatorCompanyId: string; 
  companyReportDocuments: Partial<CompanyReportDocument>[];
};

const RequestVerification = (props: Props) => {
  const dispatch = useAppDispatch();

  const { company } = useAppSelector((state) => state.authentication);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CompanyReportDTOTemp>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'companyReportDocuments',  
  });

  const resetForm = () => {
    reset();
  };

  const showFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      Promise.all(Array.from(files).map((file) => fileServices.uploadFile(file)))
        .then((result) => {
          _.forEach(result, (item) => {
            append({
              documentName: item.name,
              documentType: item.type,
              documentUrl: item.url,
              documentSize: item.size,
            });
          });
        })
        .catch(() => {
          toast.error('Đã xảy ra lỗi trong quá trình tải tập tin. Vui lòng thử lại sau.');
        });
    }
  };

  const onSubmit = (data: CompanyReportDTOTemp) => {
    const formattedData: CompanyReportDTO = {
      ...data,
      targetedCompanyId: company?.id ?? 0,
      creatorCompanyId: company?.id ?? 0,
    };
    dispatch(companyReportActions.create(formattedData))
      .then(() => {
        toast.success('Gửi yêu cầu thành công. Khi yêu cầu được xử lý, kết quả sẽ được gửi vào email của bạn');
        reset();
      })
      .catch(() => {
        toast.error('Đã xảy ra lỗi trong quá trình gửi yêu cầu. Vui lòng thử lại sau.');
      });
  };

  return (
    <div className="row">
      <Helmet>
        <title>Yêu cầu đánh giá trước thời hạn</title>
      </Helmet>
      <div className="x_panel">
        <div className="x_title">
          <h2>Yêu cầu đánh giá trước thời hạn</h2>
          <div className="clearfix"></div>
        </div>
        <div className="x_content">
          <div className="clearfix"></div>
          <div className="col-xs-12 table">
            <form className="form-horizontal form-label-left" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Tên yêu cầu</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="actionTitle"
                    control={control}
                    rules={{ required: 'Không được để trống nội dung' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          placeholder="Mô tả yêu cầu"
                          className="form-control"
                        />
                        {errors.actionTitle && <span>{errors.actionTitle.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Mô tả vấn đề</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <textarea
                          {...field}
                          ref={ref}
                          rows={10}
                          cols={30}
                          placeholder="Mô tả vấn đề bằng 1-2 câu"
                          className="form-control"
                        />
                        {errors.description && <span>{errors.description.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">Tải tài liệu</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    multiple
                    onChange={handleFileUpload}
                  />
                  <button
                    className="btn btn-default"
                    onClick={showFileDialog}
                    style={{ marginBottom: '12px' }}
                    type="button"
                  >
                    Tải tập tin
                  </button>

                  <div style={{ width: '400px' }}>
                    {fields.map((field, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                          <FileIcon /> {field.documentName}
                        </div>
                        
                        <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                          <TrashIcon /> Gỡ tài liệu
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-6 col-md-offset-3">
                  <button type="button" onClick={resetForm} className="btn btn-primary">Hủy bỏ</button>
                  <button type="submit" className="btn btn-success">Thực hiện</button>
                </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestVerification;

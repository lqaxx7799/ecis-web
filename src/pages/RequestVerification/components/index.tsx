import { FileIcon, TrashIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyReportActions from "../../../common/actions/companyReport.action";
import fileServices from "../../../common/services/file.services";
import helpers from "../../../common/utils/helpers";
import { CompanyReportDTO } from "../../../types/dto";
import { CompanyReport, CompanyReportDocument } from "../../../types/models";

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
  const [canCreate, setCanCreate] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(companyReportActions.canCreateReport(company?.id ?? 0))
      .then((res) => {
        setCanCreate(res);
      });
  }, [dispatch, company]);

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
      const validation = helpers.validateUploadedFiles(files);
      if (validation) {
        toast.error(validation);
        return;
      }

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
          toast.error('???? x???y ra l???i trong qu?? tr??nh t???i t???p tin. Vui l??ng th??? l???i sau.');
        });
    }
  };

  const onSubmit = (data: CompanyReportDTOTemp) => {
    const formattedData: CompanyReportDTO = {
      ...data,
      targetedCompanyId: company?.id ?? 0,
      creatorCompanyId: company?.id ?? 0,
    };
    setSubmitting(true);
    dispatch(companyReportActions.create(formattedData))
      .then(() => {
        toast.success('G???i y??u c???u th??nh c??ng. Khi y??u c???u ???????c x??? l??, k???t qu??? s??? ???????c g???i v??o email c???a b???n.');
        reset();
        setSubmitting(false);
        setCanCreate(false);
      })
      .catch(() => {
        toast.error('???? x???y ra l???i trong qu?? tr??nh g???i y??u c???u. Vui l??ng th??? l???i sau.');
        setSubmitting(false);
      });
  };

  if (!canCreate) {
    return (
      <div className="row">
        <Helmet>
          <title>Y??u c???u ????nh gi?? tr?????c th???i h???n</title>
        </Helmet>
        <div className="x_panel">
          <div className="x_title">
            <h2>Y??u c???u ????nh gi?? tr?????c th???i h???n</h2>
            <div className="clearfix"></div>
          </div>
          <div className="x_content">
            <div className="clearfix"></div>
            <div className="col-xs-12 table">
              Doanh nghi???p ???? c?? y??u c???u ????nh gi?? tr?????c th???i h???n ch??a ???????c duy???t ho???c ??ang trong qu?? tr??nh ????nh gi??.
              Vui l??ng ?????i h??? th???ng x??? l?? y??u c???u tr?????c khi t???o y??u c???u m???i.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="row">
      <Helmet>
        <title>Y??u c???u ????nh gi?? tr?????c th???i h???n</title>
      </Helmet>
      <div className="x_panel">
        <div className="x_title">
          <h2>Y??u c???u ????nh gi?? tr?????c th???i h???n</h2>
          <div className="clearfix"></div>
        </div>
        <div className="x_content">
          <div className="clearfix"></div>
          <div className="col-xs-12 table">
            <form className="form-horizontal form-label-left" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">T??n y??u c???u</label>
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Controller
                    name="actionTitle"
                    control={control}
                    rules={{ required: 'Kh??ng ???????c ????? tr???ng n???i dung' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          placeholder="M?? t??? y??u c???u"
                          className="form-control"
                        />
                        {errors.actionTitle && <span>{errors.actionTitle.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">M?? t??? v???n ?????</label>
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
                          placeholder="M?? t??? v???n ????? b???ng 1-2 c??u"
                          className="form-control"
                        />
                        {errors.description && <span>{errors.description.message}</span>}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-3">T???i t??i li???u</label>
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
                    T???i t???p tin
                  </button>

                  <div style={{ width: '400px' }}>
                    {fields.map((field, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                          <FileIcon /> {field.documentName}
                        </div>
                        
                        <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                          <TrashIcon /> G??? t??i li???u
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-6 col-md-offset-3">
                  <button type="button" onClick={resetForm} className="btn btn-primary">H???y b???</button>
                  <button type="submit" className="btn btn-success" disabled={submitting}>Th???c hi???n</button>
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

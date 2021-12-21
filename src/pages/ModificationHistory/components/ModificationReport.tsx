import dayjs from "dayjs";
import _ from 'lodash';
import { useEffect, useState } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyTypeModificationActions from "../../../common/actions/companyTypeModification.action";
import { MODIFICATION_TYPE } from "../../../common/constants/app";
import { CompanyTypeModification } from "../../../types/models";

type Props = {

};

const MONTHS = [
  { value: '1', label: 'Tháng 1' },
  { value: '2', label: 'Tháng 2' },
  { value: '3', label: 'Tháng 3' },
  { value: '4', label: 'Tháng 4' },
  { value: '5', label: 'Tháng 5' },
  { value: '6', label: 'Tháng 6' },
  { value: '7', label: 'Tháng 7' },
  { value: '8', label: 'Tháng 8' },
  { value: '9', label: 'Tháng 9' },
  { value: '10', label: 'Tháng 10' },
  { value: '11', label: 'Tháng 11' },
  { value: '12', label: 'Tháng 12' },
];

const ModificationReport = (props: Props) => {
  const dispatch = useAppDispatch();

  const { loading, companyTypeModifications } = useAppSelector((state) => state.companyTypeModification);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(companyTypeModificationActions.getReport(month, year));
  }, [dispatch]);

  const updateSearch = () => {
    dispatch(companyTypeModificationActions.getReport(month, year));
  };

  const columns: IDataTableColumn<CompanyTypeModification>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Thời gian hoàn thành',
      selector: 'createdAt',
      format: (row) => dayjs(row.createdAt).format('DD/MM/YYYY'),
      width: '150px',
    },
    {
      name: 'Loại',
      selector: (row) => MODIFICATION_TYPE[row.modification] ?? '-',
      width: '150px',
    },
    {
      name: 'Kết quả phân loại',
      selector: (row) => `Chuyển từ ${row.previousCompanyType?.typeName ?? 'Chưa đánh giá'} sang ${row.updatedCompanyType?.typeName ?? 'Chưa đánh giá'}`,
    },
    {
      name: 'Thao tác',
      selector: (row) => (
        <div>
          <Link className="btn btn-default" to={`/modification-report/${row.id}`}>Xem chi tiết</Link>
        </div>
      ),
    },
  ];

  return (
    <div className="x_panel">
      <Helmet>
        <title>Kết quả phân loại</title>
      </Helmet>
      <div className="x_title">
        <h2>Kết quả phân loại</h2>
        <div className="clearfix" />
      </div>
      <div className="x_content">
        <div className="clearfix"></div>
        <div className="col-xs-12 table">
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '12px', paddingLeft: '15px' }}>Chọn thời gian</h3>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
              <select
                className="form-control"
                placeholder="Chọn tháng"
                value={month.toString()}
                onChange={(e) => setMonth(parseInt(e.target.value))}
                style={{ width: '300px', marginRight: '24px' }}
              >
                {_.map(MONTHS, (month) => (
                  <option value={month.value}>{month.label}</option>
                ))}
              </select>
              <select
                className="form-control"
                placeholder="Chọn năm"
                value={year.toString()}
                onChange={(e) => setYear(parseInt(e.target.value))}
                style={{ width: '300px', marginRight: '24px' }}
              >
                {
                  _.map(_.range(new Date().getFullYear(), 2019, -1), (num) => (
                    <option value={num.toString()}>{num}</option>
                  ))
                }
              </select>
              <button
                style={{ marginBottom: '0px' }}
                className="btn btn-default"
                onClick={updateSearch}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
          {
            loading ? (<div>Đang tải...</div>)
              : (
                <DataTable
                striped
                highlightOnHover
                noHeader
                columns={columns}
                data={companyTypeModifications}
                noDataComponent="Không có dữ liệu"
                />
              )
          }
        </div>
      </div>
    </div>
  );
};

export default ModificationReport;

import dayjs from "dayjs";
import { useEffect } from "react";
import DataTable, { IDataTableColumn } from "react-data-table-component";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companyTypeModificationActions from "../../../common/actions/companyTypeModification.action";
import { MODIFICATION_TYPE } from "../../../common/constants/app";
import { CompanyTypeModification } from "../../../types/models";

type Props = {

};

const ModificationHistory = (props: Props) => {
  const dispatch = useAppDispatch();

  const { company } = useAppSelector((state) => state.authentication);
  const { loading, companyTypeModifications } = useAppSelector((state) => state.companyTypeModification);

  useEffect(() => {
    dispatch(companyTypeModificationActions.getByCompanyId(company?.id ?? 0));
  }, [dispatch, company?.id]);

  const columns: IDataTableColumn<CompanyTypeModification>[] = [
    {
      name: 'STT',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Thời gian hoàn thành',
      selector: 'createdAt',
      format: (row) => dayjs(row.createdAt).format('DD/MM/YYYY'),
    },
    {
      name: 'Loại',
      selector: (row) => MODIFICATION_TYPE[row.modification] ?? '-',
    },
    {
      name: 'Kết quả phân loại',
      selector: (row) => `Chuyển từ ${row.previousCompanyType?.typeName} sang ${row.updatedCompanyType?.typeName}`,
    },
    {
      name: 'Thao tác',
      selector: (row) => (
        <div>
          <Link className="btn btn-default" to={`/modification-history/${row.id}`}>Xem chi tiết</Link>
        </div>
      ),
    },
  ];

  return (
    <div className="x_panel">
      <div className="x_title">
        <h2>Doanh nghiệp tự đánh giá</h2>
        <div className="clearfix" />
      </div>
      <div className="x_content">
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
  );
};

export default ModificationHistory;

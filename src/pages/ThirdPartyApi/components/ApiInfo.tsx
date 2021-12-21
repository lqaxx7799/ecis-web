import dayjs from "dayjs";
import _ from "lodash";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import authenticationActions from "../../../common/actions/authentication.actions";
import { DEFAULT_DATETIME_FORMAT } from "../../../common/constants/app";

type Props = {
  
};

const ApiInfo = (props: Props) => {
  const dispatch = useAppDispatch();
  const { thirdParty } = useAppSelector((state) => state.authentication);
  const [secretHidden, setSecretHidden] = useState(true);
  const [submittingReset, setSubmittingReset] = useState(false);

  const updateClientSecret = () => {
    setSubmittingReset(true);
    dispatch(authenticationActions.thirdPartyResetSecret())
      .then(() => {
        setSubmittingReset(false);
        toast.success('Làm mới client secret thành công.');
      })
      .catch(() => {
        setSubmittingReset(false);
        toast.error('Đã xảy ra lỗi trong quá trình làm mới client secret. Vui lòng thử lại sau.');
      });
  };

  return (
    <div className="x_panel">
      <Helmet>
        <title>Thông tin tài khoản</title>
      </Helmet>
      <div className="x_title">
        <h2>Thông tin tài khoản</h2>
        <div className="clearfix" />
      </div>
      <div className="x_content">
        <div>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th style={{ width: '250px' }}>Email</th>
                <td>{thirdParty?.account?.email ?? '-'}</td>
              </tr>
              <tr>
                <th>Tên người dùng</th>
                <td>{thirdParty?.userName ?? '-'}</td>
              </tr>
              <tr>
                <th>Ngày tạo</th>
                <td>{dayjs(thirdParty?.createdAt).format(DEFAULT_DATETIME_FORMAT)}</td>
              </tr>
              <tr>
                <th>Client Id</th>
                <td>{thirdParty?.clientId ?? '-'}</td>
              </tr>
              <tr>
                <th>Client Secret</th>
                <td>
                  {
                    secretHidden ? _.map(thirdParty?.clientSecret, () => '*') : thirdParty?.clientSecret ?? '-'
                  }
                  <button
                    className="btn btn-sm btn-default"
                    style={{ marginLeft: '16px' }}
                    onClick={() => setSecretHidden(old => !old)}
                  >
                    {secretHidden ? 'Hiện' : 'Ẩn'}
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    style={{ marginLeft: '8px' }}
                    onClick={updateClientSecret}
                    disabled={submittingReset}
                  >
                    Làm mới Client Secret
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApiInfo;

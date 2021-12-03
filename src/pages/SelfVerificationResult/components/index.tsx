import _ from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companySelfVerificationActions from "../../CompanySelfVerification/action";
import CriteriaListTab from "./CriteriaListTab";

type Props = {

};

const SelfVerificationResult = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    loading,
    editingProcess,
  } = useAppSelector((state) => state.companySelfVerification);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);

  const [selectedTabId, setSelectedTabId] = useState(-1);

  useEffect(() => {
    dispatch(companySelfVerificationActions.loadLastSelfVerification())
      .then(() => {
        setSelectedTabId(_.get(criteriaTypes, '0.id'));
      });
  }, [dispatch]);

  const noData = (
    <div>
      Hiện tại doanh nghiệp không cần phải đánh giá.
      Yêu cầu đánh giá tại đây.
    </div>
  );

  const mainBody = (
    <>
      <div className="col-xs-3">
        <ul className="nav nav-tabs tabs-left">
          {
            _.map(criteriaTypes, (type) => (
              <li
                key={type.id}
                className={`nav-item ${type.id === selectedTabId ? 'active' : ''} `}
                onClick={() => setSelectedTabId(type.id)}
              >
                <a data-toggle="pill" data-target={`#${type.id}`}>
                  {type.criteriaTypeName}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="col-xs-9">
        <div className="tab-content">
          {
            _.map(criteriaTypes, (type) => (
              <CriteriaListTab
                criteriaTypeId={type.id}
                isSelected={selectedTabId === type.id}
              />
            ))
          }
        </div>
      </div>
    </>
  );

  if (editingProcess?.status === 'IN_PROGRESS') {
    return (
      <div className="x_panel">
        <Helmet>
          <title>Kết quả xác minh đánh giá</title>
        </Helmet>
        <div className="x_title">
          <h2>Kết quả xác minh đánh giá</h2>
          <div className="clearfix" />
        </div>
        <div className="x_content">
          Doanh nghiệp chưa gửi cho kiểm lâm đánh giá. Vui lòng hoàn thành đánh giá <Link to="/company-self-verification">tại đây</Link>.
        </div>
      </div>
    );
  }

  return (
    <div className="x_panel">
      <Helmet>
        <title>Kết quả xác minh đánh giá</title>
      </Helmet>
      <div className="x_title">
        <h2>Kết quả xác minh đánh giá</h2>
        <div className="clearfix" />
      </div>
      <div className="x_content">
        {
          loading ? (<div>Đang tải...</div>)
            : !editingProcess ? noData
            : mainBody
        }
      </div>
    </div>
  );
};

export default SelfVerificationResult;

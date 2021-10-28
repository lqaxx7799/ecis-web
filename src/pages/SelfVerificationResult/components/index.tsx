import _ from "lodash";
import { useEffect, useState } from "react";
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
    dispatch(companySelfVerificationActions.loadCurrentSelfVerification())
      .then(() => {
        setSelectedTabId(_.get(criteriaTypes, '0.id'));
      });
  }, [dispatch]);

  const submitVerification = () => {
    dispatch(companySelfVerificationActions.submitVerificationProcess(editingProcess?.id ?? 0))
      .then(() => {
        console.log('ok');
      })
      .catch(() => {
        console.log('no')
      });
  };

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
        <div style={{ marginTop: '24px' }}>
          <button onClick={submitVerification}>Gửi lên</button>
        </div>
      </div>
    </>
  );

  return (
    <div className="x_panel">
      <div className="x_title">
        <h2>Doanh nghiệp tự đánh giá</h2>
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

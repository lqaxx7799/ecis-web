import _ from "lodash";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companySelfVerificationActions from "../../Company/SelfVerification/action";
import CriteriaListTab from "./CriteriaListTab";

type Props = {

};

const CompanySelfVerification = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    loading,
    editingProcess,
    verificationCriterias,
    verificationDocuments,
  } = useAppSelector((state) => state.companySelfVerification);
  const { criterias } = useAppSelector((state) => state.criteria);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);

  const [selectedTabId, setSelectedTabId] = useState(-1);

  useEffect(() => {
    dispatch(companySelfVerificationActions.loadCurrentSelfVerification());
  }, []);


  return (
    <div className="x_panel">
      <div className="x_title">
        <h2>Doanh nghiệp tự đánh giá</h2>
        <div className="clearfix" />
      </div>
      <div className="x_content">
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
      </div>
    </div>
  );
};

export default CompanySelfVerification;

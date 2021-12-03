import _ from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Popup from 'reactjs-popup';
import { useAppDispatch, useAppSelector } from "../../../app/store";
import companySelfVerificationActions from "../action";
import CriteriaListTab from "./CriteriaListTab";

type Props = {

};

const CompanySelfVerification = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    loading,
    editingProcess,
  } = useAppSelector((state) => state.companySelfVerification);
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTabId, setSelectedTabId] = useState(-1);

  useEffect(() => {
    dispatch(companySelfVerificationActions.loadCurrentPendingSelfVerification())
      .then(() => {
        setSelectedTabId(_.get(criteriaTypes, '0.id'));
      });
  }, [dispatch]);

  const submitVerification = () => {
    dispatch(companySelfVerificationActions.submitVerificationProcess(editingProcess?.id ?? 0))
      .then(() => {
        toast.success('Gửi đánh giá thành công.');
        setShowConfirmModal(false);
      })
      .catch(() => {
        toast.error('Đã có lỗi xảy ra trong quá trình gửi đánh giá. Vui lòng thử lại sau.');
        setShowConfirmModal(false);
      });
  };

  const noData = (
    <div>
      Hiện tại doanh nghiệp không cần phải đánh giá.
      Yêu cầu đánh giá <Link to="/request-verification">tại đây</Link>.
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
                key={type.id}
                criteriaTypeId={type.id}
                isSelected={selectedTabId === type.id}
              />
            ))
          }
        </div>
        <div style={{ marginTop: '24px' }}>
          {
            editingProcess?.isSubmitted ? (
              <Popup
                trigger={<span><button className="btn btn-primary" disabled>Gửi lên</button></span>}
                on={['hover']}
              >
                Đánh giá đã được gửi
              </Popup>
            ) : (
              <button className="btn btn-primary" onClick={() => setShowConfirmModal(true)}>Gửi lên</button>
            )
          }
        </div>
      </div>
    </>
  );

  return (
    <div className="x_panel">
      <Helmet>
        <title>Doanh nghiệp tự đánh giá</title>
      </Helmet>
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

      <Modal
        styles={{ modal: { width: '400px' } }}
        open={showConfirmModal} 
        onClose={() => setShowConfirmModal(false)}
      >
        <div>
          <h3>Xác nhận gửi đánh giá</h3>
        </div>
        <div>
          Bạn có chắc chắn gửi đánh giá lên cho cục kiểm lâm?
        </div>
        <div style={{ marginTop: '12px' }}>
          <button
            className="btn btn-primary"
            onClick={submitVerification}
          >
            Xác nhận
          </button>
          <button
            className="btn btn-default"
            onClick={() => setShowConfirmModal(false)}
          >
            Hủy
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CompanySelfVerification;

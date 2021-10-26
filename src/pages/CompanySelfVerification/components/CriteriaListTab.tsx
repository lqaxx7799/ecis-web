import _ from "lodash";
import { useAppSelector } from "../../../app/store";

type Props = {
  criteriaTypeId: number;
  isSelected: boolean;
};

const CriteriaListTab = (props: Props) => {
  const { criteriaTypes } = useAppSelector((state) => state.criteriaType);
  const criteriaType = _.find(criteriaTypes, (type) => type.id === props.criteriaTypeId);

  if (!criteriaType) {
    return null;
  }

  return (
    <div className={`tab-pane ${props.isSelected ? 'active' : ''}`} id={`${props.criteriaTypeId}`} role="tabpanel"> 
      <table className="table table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Nội dung kê khai</th>
            <th>Tự đánh giá</th>
          </tr>                        
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td colSpan={2}>Tuân thủ quy định của pháp luật về thành lập doanh nghiệp phải có các loại tài liệu sau:</td>
          </tr>
          <tr>
            <td>a</td>
            <td>Giấy chứng nhận đăng ký doanh nghiệp (đối với doanh nghiệp không có vốn đầu tư nước ngoài)</td>
            <td>
              <table>
                <tr>
                  <td>
                    {/* <label for="1a-y">Có</label> */}
                    <input type="radio" name="a" id="1a-y" />
                    {/* <label for="1a-n">Không</label> */}
                    <input type="radio" name="a" id="1a-n" />
                  </td>
                </tr>
                <tr>
                  <td>
                    Ý kiến riêng
                  </td>                      
                </tr>
                <tr>
                  <td>
                    <textarea rows={3} cols={50} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>File đính kèm</label>
                    <input type="file" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CriteriaListTab;

import { Helmet } from "react-helmet";
import SwaggerUI from "swagger-ui-react";
import swaggerJson from './swagger.json';

import "swagger-ui-react/swagger-ui.css";
import { DownloadIcon } from "@radix-ui/react-icons";
import config from "../../../config";

type Props = {
  
};

const ApiDocumentation = (props: Props) => {
  return (
    <div className="x_panel">
      <Helmet>
        <title>Tài liệu ECIS API</title>
      </Helmet>
      <div className="x_title" style={{ display: 'flex', alignItems: 'center' }}>
        <h2>Tài liệu ECIS API</h2>
        <div className="spacer"></div>
        <div>
          <a
            href={`${config.BASE_API}/File/ECIS_API_V1_Documentation.pdf`}
            type="download"
            className="btn btn-primary"
          >
            <DownloadIcon /> Tải tài liệu
          </a>
        </div>
      </div>
      <div className="x_content">
        <div style={{ marginLeft: '24px' }}>
          <h3>Giới thiệu</h3>
          <p>
            ECIS API V1 là API cung cấp cho bên thụ hưởng của hệ thống ECIS để có thể lấy thông tin
            về doanh nghiệp đăng ký trên hệ thống và kết quả phân loại của các doanh nghiệp đó.
          </p>
        </div>
        <div style={{ marginLeft: '24px', marginTop: '24px' }}>
          <h3>Các bước tích hợp</h3>
          <p>Bên thụ hưởng thực hiện các bước sau:</p>
          <ol>
            <li>
              Truy cập giao diện web hệ thống ECIS tại đường dẫn
              <a href='http://ecis-web.clever-basis-311916.as.r.appspot.com/' target="_blank" rel="noreferrer noopener">http://ecis-web.clever-basis-311916.as.r.appspot.com/</a>.
            </li>
            <li>
              Đăng nhập hệ thống bằng tài khoản của bên thụ hưởng đã đăng ký trên hệ thống.
            </li>
            <li>
              Trên menu bên trái màn hình, vào mục API, Thông tin tài khoản.
            </li>
            <li>
              Sử dụng client secret và client id để lấy access token. Access token có hạn trong vòng30 ngày.
            </li>
            <li>
              Sử dụng access token để lấy thông tin doanh nghiệp và kết quả phân loại qua ECIS
              API V1. Các api đều bắt đầu tại đường dẫn <a href="http://13.250.40.151" target="_blank" rel="noreferrer noopener">http://13.250.40.151</a>.
            </li>
            <li>
              Khi access token hết hạn thì có thể lấy access token mới bằng client secret và client id như lần đầu.
            </li>
            <li>
              Khi client secret bị mất hoặc có nhu cầu đổi, có thể làm mới ở trang Thông tin tài khoản.
              Khi làm mới client secret, access token tạo từ client secret cũ sẽ bị vô hiệu hóa.
            </li>
          </ol>
        </div>
        <div style={{ marginLeft: '24px', marginTop: '24px' }}>
          <h3>Các API liên quan</h3>
        </div>
        <SwaggerUI
          spec={swaggerJson}
        />
      </div>
    </div>
  );
};

export default ApiDocumentation;

import { Helmet } from "react-helmet";
import SwaggerUI from "swagger-ui-react";
import swaggerJson from './swagger.json';

import "swagger-ui-react/swagger-ui.css";

type Props = {
  
};

const ApiDocumentation = (props: Props) => {
  return (
    <div className="x_panel">
      <Helmet>
        <title>Tài liệu ECIS API</title>
      </Helmet>
      <div className="x_title">
        <h2>Tài liệu ECIS API</h2>
        <div className="clearfix" />
      </div>
      <div className="x_content">
        <div style={{ marginLeft: '48px' }}>
          <h3>Thông tin API</h3>
          <table className="table striped" style={{ width: '300px' }}>
            <tbody>
              <tr>
                <th>URL</th>
                <td>http://13.250.40.151</td>
              </tr>
            </tbody>
          </table>
        </div>
        <SwaggerUI
          spec={swaggerJson}
        />
      </div>
    </div>
  );
};

export default ApiDocumentation;

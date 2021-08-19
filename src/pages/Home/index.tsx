import { Col, Grid } from '@mantine/core';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Grid>
      <Col span={8}>
      </Col>
      <Col span={4}>
        <Link to="/dang-ky-doanh-nghiep">
          Đăng ký doanh nghiệp
        </Link> 
      </Col>
    </Grid>
  );
}

export default Home;

import { Col, Grid, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Grid>
      <Col span={8}>
      </Col>
      <Col span={4}>
        <Text>
          <Link to="/dang-ky-doanh-nghiep">
            Đăng ký doanh nghiệp
          </Link> 
        </Text>
      </Col>
    </Grid>
  );
}

export default Home;

import { Col, Grid, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Grid>
      <Col span={8}>
      </Col>
      <Col span={4} className="home-link-list">
        <Text className="link-item" component={Link} variant="link" to="/dang-ky-doanh-nghiep">
          Đăng ký doanh nghiệp
        </Text>
        <Text className="link-item" component={Link} variant="link" to="/ket-qua-danh-gia">
          Kết quả đánh giá doanh nghiệp
        </Text>
      </Col>
    </Grid>
  );
}

export default Home;

import { Text, Title } from "@mantine/core"

const RegistrationSuccess = () => {
  return (
    <div>
      <Title order={1}>Đăng ký doanh nghiệp thành công</Title>
      <Text>
        Doanh nghiệp của bạn đã đăng ký thành công. Khi có doanh nghiệp được duyệt,
        vui lòng kiểm tra mail với thông tin đăng nhập vào hệ thống ECIS
        với email mà bạn đã sử dụng để đăng ký.
      </Text>
      <Text>
        Nếu sau 02 ngày không nhận được mail, bạn có thể gọi điện vào số tổng đài sau
        để có thêm thông tin chi tiết: +849 7617 6490
      </Text>
    </div>
  );
};

export default RegistrationSuccess;

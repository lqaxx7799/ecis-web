import { Button, LoadingOverlay, Title } from "@mantine/core";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import verificationProcessActions from "../../../common/actions/verificationProcess.action";

type Props = {

};

type RouteParams = {
  id: string;
};

const CompanyEditVerification = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loading, editingProcess } = useAppSelector((state) => state.verificationProcess);
  let { id } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(verificationProcessActions.getById(parseInt(id)));
  }, []);

  return (
    <div>
      <LoadingOverlay visible={loading} />
      <Title order={1}>Cập nhật tự đánh giá</Title>
      <Button
        style={{ marginTop: '12px' }}
        component={Link}
        leftIcon={<ChevronLeftIcon />}
        to={`/doanh-nghiep/tu-danh-gia`}
      >
        Quay lại
      </Button>
    </div>
  );
}

export default CompanyEditVerification;

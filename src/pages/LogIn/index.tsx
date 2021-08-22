import { Button, Col, Grid, PasswordInput, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";

import { useAppDispatch } from "../../app/store";
import authenticationActions from "../../common/actions/authentication.actions";
import { LogInDTO } from "../../types/dto";

const LogIn = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LogInDTO>();

  const onSubmit = (data: LogInDTO) => {
    console.log(111111, data);
    dispatch(authenticationActions.authenticate(data))
      .then((result) => {
        console.log(111111, result);
        history.push('/');
      })
      .catch((err) => {
        console.log(1111112, err);
        setError(
          'email',
          {
            type: 'wrongEmail',
            message: 'Sai email hoặc mật khẩu',
          },
          { shouldFocus: true }
        );
      });
  };

  return (
    <>
      <Grid style={{ marginBottom: '18px' }}>
        <Col span={12}>
          <Title order={1}>Đăng nhập</Title>
        </Col>
      </Grid>
      <Grid>
        <Col span={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Không được để trống email' }}
              render={({ field: { ref, ...field } }) => (
                <TextInput
                  {...field}
                  elementRef={ref}
                  style={{
                    marginBottom: '12px',
                  }}
                  label="Email"
                  required
                  placeholder="Nhập email"
                  error={errors.email && errors.email.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Không được để trống mật khẩu', }}
              render={({ field: { ref, ...field } }) => (
                <PasswordInput
                  {...field}
                  elementRef={ref}
                  style={{
                    marginBottom: '12px',
                  }}
                  label="Mật khẩu"
                  required
                  placeholder="Nhập mật khẩu"
                  error={errors.password && errors.password.message}
                />
              )}
            />
            <Button  type="submit">Đăng nhập</Button>
          </form>
        </Col>
      </Grid>
    </>
  );
};

export default LogIn;

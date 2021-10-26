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
    dispatch(authenticationActions.authenticate(data))
      .then((result) => {
        history.push('/');
      })
      .catch((err) => {
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
    <body className="login" style={{ backgroundImage: 'url(/images/bg1.jpg)' , backgroundSize: 'cover' }}>
      <div style={{ background: 'rgba(0,0,0,0.5)', position: 'absolute', width: '100%', height: '100vh' }}>
        <a className="hiddenanchor" id="signup"></a>
        <a className="hiddenanchor" id="signin"></a>

        <div className="login_wrapper">
          <div className="animate form login_form">
            <section className="login_content">
              <form>
                <h1><img src="/images/fpd_logo_small.png" alt="" />  Đăng nhập hệ thống</h1>
                <div>
                  <input type="text" className="form-control" placeholder="Email" required />
                </div>
                <div>
                  <input type="password" className="form-control" placeholder="Mật khẩu" required />
                </div>
                <div>
                  <a className="btn btn-default submit" href="dashboard.html">Đăng nhập</a>
                  <a className="reset_pass" href="#">Quên mật khẩu ?</a>
                </div>

                <div className="clearfix"></div>

                <div className="separator">
                  <p className="change_link">Chưa có tài khoản ?
                    <a href="#signup" className="to_register"> Tạo mới </a>
                  </p>

                  <div className="clearfix"></div>
                  <br />

                  <div>
                    <p>©2020</p>
                  </div>
                </div>
              </form>
            </section>
          </div>

          <div id="register" className="animate form registration_form">
            <section className="login_content">
              <form>
                <h1>Tạo tài khoản</h1>
                <div>
                  <input type="text" className="form-control" placeholder="Tên đăng nhập" required />
                </div>
                <div>
                  <input type="email" className="form-control" placeholder="Email" required />
                </div>
                <div>
                  <input type="password" className="form-control" placeholder="Mật khẩu" required />
                </div>
                <div>
                  <a className="btn btn-default submit" href="index.html">Đăng ký</a>
                </div>

                <div className="clearfix"></div>

                <div className="separator">
                  <p className="change_link">Đã là thành viên ?
                    <a href="#signin" className="to_register"> Đăng nhập </a>
                  </p>

                  <div className="clearfix"></div>
                  <br />

                  <div>
                  
                    <p>©2020</p>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </body>
  );

  // return (
  //   <>
  //     <Grid style={{ marginBottom: '18px' }}>
  //       <Col span={12}>
  //         <Title order={1}>Đăng nhập</Title>
  //       </Col>
  //     </Grid>
  //     <Grid>
  //       <Col span={6}>
  //         <form onSubmit={handleSubmit(onSubmit)}>
  //           <Controller
  //             name="email"
  //             control={control}
  //             rules={{ required: 'Không được để trống email' }}
  //             render={({ field: { ref, ...field } }) => (
  //               <TextInput
  //                 {...field}
  //                 elementRef={ref}
  //                 style={{
  //                   marginBottom: '12px',
  //                 }}
  //                 label="Email"
  //                 required
  //                 placeholder="Nhập email"
  //                 error={errors.email && errors.email.message}
  //               />
  //             )}
  //           />
  //           <Controller
  //             name="password"
  //             control={control}
  //             rules={{ required: 'Không được để trống mật khẩu', }}
  //             render={({ field: { ref, ...field } }) => (
  //               <PasswordInput
  //                 {...field}
  //                 elementRef={ref}
  //                 style={{
  //                   marginBottom: '12px',
  //                 }}
  //                 label="Mật khẩu"
  //                 required
  //                 placeholder="Nhập mật khẩu"
  //                 error={errors.password && errors.password.message}
  //               />
  //             )}
  //           />
  //           <Button  type="submit">Đăng nhập</Button>
  //         </form>
  //       </Col>
  //     </Grid>
  //   </>
  // );
};

export default LogIn;

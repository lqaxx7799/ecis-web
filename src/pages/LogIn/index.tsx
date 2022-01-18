import { Button, Col, Grid, PasswordInput, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { Helmet } from "react-helmet";
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
    <div className="login" style={{ backgroundImage: 'url(/images/bg1.jpg)' , backgroundSize: 'cover', height: '100vh' }}>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <div style={{ background: 'rgba(0,0,0,0.5)', position: 'absolute', width: '100%', height: '100vh' }}>
        <a className="hiddenanchor" id="signup"></a>
        <a className="hiddenanchor" id="signin"></a>

        <div className="login_wrapper">
          <div className="animate form login_form">
            <section className="login_content">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1><img src="/images/fpd_logo_small.png" alt="" />  Đăng nhập hệ thống</h1>
                <div>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Không được để trống email' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          required
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                      </div>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Không được để trống mật khẩu' }}
                    render={({ field: { ref, ...field } }) => (
                      <div>
                        <input
                          {...field}
                          ref={ref}
                          type="password"
                          className="form-control"
                          placeholder="Mật khẩu"
                          required
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                      </div>
                    )}
                  />
                </div>
                <div>
                  <button className="btn btn-default submit">Đăng nhập</button>
                  {/* <a className="reset_pass" href="#">Quên mật khẩu ?</a> */}
                </div>

                <div className="clearfix"></div>

                <div className="separator">
                  <p className="change_link">Chưa có tài khoản ?
                    <a href="#signup" className="to_register"> Đăng ký </a>
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
              <div>
                <h1>Đăng ký sử dụng hệ thống</h1>
                <p>
                  <h3>Đối với doanh nghiệp</h3>
                  <div>
                    Vui lòng soạn mail đăng ký sử dụng hệ thống đến hòm thư <a href="mailto:lqaxx000@gmail.com">lqaxx000@gmail.com</a>.
                    Nội dung của mail vui lòng bao gồm tên doanh nghiệp, mã doanh nghiệp, email đăng ký và tỉnh doanh nghiệp đang hoạt động.
                    Cán bộ phía hệ thống sẽ đăng ký tài khoản cho doanh nghiệp và gửi lại thông tin đăng nhập qua email sử dụng để đăng ký.
                  </div>
                </p>
                <p>
                  <h3>Đối với bên thụ hưởng</h3>
                  <div>
                    Vui lòng soạn mail đăng ký sử dụng hệ thống đến hòm thư <a href="mailto:lqaxx000@gmail.com">lqaxx000@gmail.com</a>.
                    Nội dung của mail vui lòng bao gồm tên, email của cá nhân muốn đăng ký sử dụng dữ liệu của hệ thống.
                    Cán bộ phía hệ thống sẽ đăng ký tài khoản cho cá nhân và gửi lại thông tin đăng nhập qua email sử dụng để đăng ký.
                  </div>
                </p>
                <p>Mọi thắc mắc vui lòng liên hệ qua đường dây nóng <a href="tel:0976176490">0976 176 490</a>.</p>
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
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

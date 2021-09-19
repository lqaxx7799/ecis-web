import { Button, Col, Grid, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../app/store';
import companyActions from '../../common/actions/company.action';
import config from '../../config';
import { CompanyRegistrationDTO } from '../../types/dto';

type Props = {

};

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const CompanyRegistration = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const notifications = useNotifications();

  const [validation, setValidation] = useState<CompanyRegistrationDTO>({
    email: 'Không được để trống email doanh nghiệp',
    companyCode: '',
    companyNameEN: '',
    companyNameVI: '',
  });
  const form = useForm<CompanyRegistrationDTO>({
    initialValues: {
      email: '',
      companyCode: '',
      companyNameEN: '',
      companyNameVI: '',  
    },
    validationRules: {
      companyCode: (value) => !!value,
      companyNameVI: (value) => !!value,
    },
  });

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    form.setFieldValue('email', value);
    if (!value) {
      form.setFieldError('email', true);
      return setValidation({
        ...validation,
        email: 'Không được để trống email doanh nghiệp',
      });
    }
    if (!EMAIL_REGEX.test(value)) {
      form.setFieldError('email', true);
      return setValidation({
        ...validation,
        email: 'Email doanh nghiệp không hợp lệ',
      });
    }
    form.setFieldError('email', false);
    return setValidation({
      ...validation,
      email: '',
    });
  };

  const handleSubmit = (values: CompanyRegistrationDTO) => {
    const recaptchaValue = recaptchaRef?.current?.getValue();
    if (!recaptchaValue) {
      return;
    }
 
    const isValid = Object.keys(validation).reduce((result: boolean, key: string) => {
      return result && !validation[key as keyof CompanyRegistrationDTO];
    }, true);
    if (isValid) {
      console.log(1111111, values);
      dispatch(companyActions.registerCompany(values))
        .then((res: any) => {
          history.push('/dang-ky-thanh-cong');
        })
        .catch((err: any) => {
          console.log(1111111, err.response);
          if (err.response.status === 400) {
            form.setFieldError('email', true);
            return setValidation({
              ...validation,
              email: err.response.data.message,
            });
          }
          notifications.showNotification({
            color: 'red',
            title: 'Lỗi hệ thống',
            message: 'Đã xảy ra lỗi trong hệ thống, vui lòng thử lại sau.',
          });
        });
    }
  };

  return (
    <>
      <Grid style={{ marginBottom: '18px' }}>
        <Col span={12}>
          <Title order={1}>Đăng ký doanh nghiệp</Title>
          <Text style={{ marginTop: '12px' }}>
            Placeholder text...
          </Text>
        </Col>
      </Grid>
      <Grid>
        <Col span={6}>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
              required
              label="Email"
              error={form.errors.email && validation.email}
              value={form.values.email}
              onChange={updateEmail}
              placeholder="Vui lòng nhập email doanh nghiệp"
              style={{ marginBottom: '12px' }}
            />

            <TextInput
              required
              label="Mã doanh nghiệp"
              error={form.errors.companyCode && 'Không được để trống mã doanh nghiệp'}
              value={form.values.companyCode}
              onChange={(event) => form.setFieldValue('companyCode', event.currentTarget.value)}
              placeholder="Vui lòng nhập mã doanh nghiệp"
              style={{ marginBottom: '12px' }}
            />
            
            <TextInput
              required
              label="Tên doanh nghiệp (Tiếng Việt)"
              error={form.errors.companyNameVI && 'Không được để trống tên doanh nghiệp tiếng Việt'}
              value={form.values.companyNameVI}
              onChange={(event) => form.setFieldValue('companyNameVI', event.currentTarget.value)}
              placeholder="Vui lòng nhập tên doanh nghiệp (Tiếng Việt)"
              style={{ marginBottom: '12px' }}
            />

            <TextInput
              label="Tên doanh nghiệp (Tiếng Anh)"
              value={form.values.companyNameEN}
              onChange={(event) => form.setFieldValue('companyNameEN', event.currentTarget.value)}
              placeholder="Vui lòng nhập tên doanh nghiệp (Tiếng Anh)"
              style={{ marginBottom: '12px' }}
            />

            <div
              style={{ marginBottom: '12px' }}
            >
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={config.GOOGLE_RECAPTCHA_KEY}
              />
            </div>
            
            <Button type="submit">
              Đăng ký
            </Button>
          </form>
        </Col>
      </Grid>
    </>
  );
}

export default CompanyRegistration;

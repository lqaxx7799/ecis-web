import { Button, Col, Grid, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../app/store';
import companyActions from '../../common/actions/company.action';
import { CompanyRegistrationDTO } from '../../types/dto';

type Props = {

};

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const CompanyRegistration = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const notifications = useNotifications();

  const [validation, setValidation] = useState<CompanyRegistrationDTO>({
    Email: 'Không được để trống email doanh nghiệp',
    CompanyCode: '',
    CompanyNameEN: '',
    CompanyNameVI: '',
  });
  const form = useForm<CompanyRegistrationDTO>({
    initialValues: {
      Email: '',
      CompanyCode: '',
      CompanyNameEN: '',
      CompanyNameVI: '',  
    },
    validationRules: {
      CompanyCode: (value) => !!value,
      CompanyNameVI: (value) => !!value,
    },
  });

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    form.setFieldValue('Email', value);
    if (!value) {
      form.setFieldError('Email', true);
      return setValidation({
        ...validation,
        Email: 'Không được để trống email doanh nghiệp',
      });
    }
    if (!EMAIL_REGEX.test(value)) {
      form.setFieldError('Email', true);
      return setValidation({
        ...validation,
        Email: 'Email doanh nghiệp không hợp lệ',
      });
    }
    form.setFieldError('Email', false);
    return setValidation({
      ...validation,
      Email: '',
    });
  };

  const handleSubmit = (values: CompanyRegistrationDTO) => {
    const isValid = Object.keys(validation).reduce((result: boolean, key: string) => {
      return result && !validation[key as keyof CompanyRegistrationDTO];
    }, true);
    if (isValid) {
      console.log(1111111, values);
      dispatch(companyActions.registerCompany(values))
        .then((res) => {
          history.push('/dang-ky-thanh-cong');
        })
        .catch((err) => {
          console.log(1111111, err.response);
          if (err.response.status === 400) {
            form.setFieldError('Email', true);
            return setValidation({
              ...validation,
              Email: err.response.data.message,
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
              error={form.errors.Email && validation.Email}
              value={form.values.Email}
              onChange={updateEmail}
              placeholder="Vui lòng nhập email doanh nghiệp"
              style={{ marginBottom: '12px' }}
            />

            <TextInput
              required
              label="Mã doanh nghiệp"
              error={form.errors.CompanyCode && 'Không được để trống mã doanh nghiệp'}
              value={form.values.CompanyCode}
              onChange={(event) => form.setFieldValue('CompanyCode', event.currentTarget.value)}
              placeholder="Vui lòng nhập mã doanh nghiệp"
              style={{ marginBottom: '12px' }}
            />
            
            <TextInput
              required
              label="Tên doanh nghiệp (Tiếng Việt)"
              error={form.errors.CompanyNameVI && 'Không được để trống tên doanh nghiệp tiếng Việt'}
              value={form.values.CompanyNameVI}
              onChange={(event) => form.setFieldValue('CompanyNameVI', event.currentTarget.value)}
              placeholder="Vui lòng nhập tên doanh nghiệp (Tiếng Việt)"
              style={{ marginBottom: '12px' }}
            />

            <TextInput
              label="Tên doanh nghiệp (Tiếng Anh)"
              value={form.values.CompanyNameEN}
              onChange={(event) => form.setFieldValue('CompanyNameEN', event.currentTarget.value)}
              placeholder="Vui lòng nhập tên doanh nghiệp (Tiếng Anh)"
              style={{ marginBottom: '12px' }}
            />
            
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

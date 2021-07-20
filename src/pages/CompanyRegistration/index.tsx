import React from 'react';
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Button, FormGroup, H1, InputGroup } from '@blueprintjs/core';
import { Col, Row } from 'react-grid-system';

import { CompanyRegistrationDTO } from '../../types/dto';

type Props = {

};

const CompanyRegistration = (props: Props) => {
  const { control, handleSubmit, formState: { errors } } = useForm<CompanyRegistrationDTO>();
  
  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <Row>
        <Col lg={12}>
          <H1>Đăng ký doanh nghiệp</H1>
          <p>
            Placeholder text...
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="Email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormGroup
                  label="Email"
                  labelFor="email"
                  labelInfo="*"
                >
                  <InputGroup
                    {...field}
                    placeholder="Vui lòng nhập email doanh nghiệp"
                  />
                  {errors.Email?.type === 'required' && <span>Không được để trống email doanh nghiệp</span>}
                </FormGroup>
              )}
            />
            <Controller
              name="CompanyCode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormGroup
                  label="Mã doanh nghiệp"
                  labelInfo="*"
                >
                  <InputGroup
                    {...field}
                    placeholder="Vui lòng nhập mã doanh nghiệp"
                  />
                  {errors.CompanyCode?.type === 'required' && <span>Không được để trống mã doanh nghiệp</span>}
                </FormGroup>
              )}
            />
            <Controller
              name="CompanyNameVI"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormGroup
                  label="CompanyNameVI"
                  labelInfo="*"
                >
                  <InputGroup
                    {...field}
                    placeholder="Vui lòng nhập tên doanh nghiệp tiếng Việt"
                  />
                  {errors.CompanyCode?.type === 'required' && <span>Không được để trống tên doanh nghiệp tiếng Việt</span>}
                </FormGroup>
              )}
            />
            <Controller
              name="CompanyNameEN"
              control={control}
              render={({ field }) => (
                <FormGroup
                  label="Tên doanh nghiệp tiếng Anh"
                >
                  <InputGroup
                    {...field}
                    placeholder="Nhập tên doanh nghiệp tiếng Anh"
                  />
                </FormGroup>
              )}
            />
            <FormGroup>
              <Button type="submit" intent="primary">
                Đăng ký
              </Button>
            </FormGroup>
          </form>
        </Col>
      </Row>
    </>
  );
}

export default CompanyRegistration;

import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import logo from '../../logo.png';

import Form from '../../Components/Form';
import FormItem from '../../Components/FormItem';
import Input from '../../Components/Input';
import InputNumber from '../../Components/InputNumber';
import Button from '../../Components/Button';
import { useHistory } from 'react-router-dom';

const Content = styled.div`
  width: 50%;
`;

const Logo = styled.div`
  width: 100%;
  text-align: center;
  img {
    width: 100px;
  }
`;

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
}

const validationRules = {
  firstName: (val) => (val.length),
  lastName: (val) => (val.length),
  email: (val) => (val.length),
  phoneNumber: (val) => (val.length),
}

const LangingPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = useCallback((values) => {
    dispatch({type: "SET_USER", payload: {...values, token: 123}})
    setTimeout(() => {
      history.push('/');
    }, 200);
  }, [dispatch, history]);

  return (<Content>
      <Logo>
        <img src={logo} alt="CRYPTOX - logo" />
      </Logo>
      <Form initialValues={initialValues} validation={validationRules} onFinish={onSubmit}>
        <FormItem label="Name">
          <Input name="firstName" placeholder="First" />
          <Input name="lastName" placeholder="Last" />
        </FormItem>
        <FormItem label="Email">
          <Input name="email" />
        </FormItem>
        <FormItem label="Phone number">
          <Input name="phoneNumber" />
        </FormItem>
        <FormItem label="Number">
          <InputNumber name="number" />
        </FormItem>
        <FormItem rightAligned>
          <Button>
            Submit
          </Button>
        </FormItem>
      </Form>
    </Content>)
}

export default LangingPage;
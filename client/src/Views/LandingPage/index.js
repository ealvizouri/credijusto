import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { style } from "../../Utils";

import logo from '../../logo.png';

import Form from '../../Components/Form';
import FormItem from '../../Components/FormItem';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { useHistory } from 'react-router-dom';

const { medias } = style;

const Content = styled.div`
  width: 90%;
  @media only screen and (min-width: ${medias.md}px) {
    width: 50%;
  }
`;

const Logo = styled.div`
  width: 100%;
  text-align: center;
  img {
    width: 100px;
  }
`;

const SubmitButton = styled(Button)`
  @media only screen and (min-width: ${medias.md}px) {
    margin-right: 10px;
  }
`;

const LoginForm = styled(Form)`
  input {
    width: 100%;
    & + input {
      margin-top: 10px;
    }
  }
  @media only screen and (min-width: ${medias.md}px) {
    input {
      & + input {
        margin-top: 0;
      }
    }
  }
`;

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
}

const validationRules = {
  firstName: (val) => (val.length !== 0),
  lastName: (val) => (val.length !== 0),
  email: (val) => {
    if (val.length === 0) return false;
    if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(val)) return false
    return true;
  },
  phoneNumber: (val) => (val.length !== 0),
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
      <LoginForm initialValues={initialValues} validation={validationRules} onFinish={onSubmit}>
        <FormItem label="Name">
          <Input name="firstName" placeholder="First" width="50%" />
          <Input name="lastName" placeholder="Last" width="50%" />
        </FormItem>
        <FormItem label="Email">
          <Input name="email" placeholder="username@example.com" width="100%" />
        </FormItem>
        <FormItem label="Phone number">
          <Input name="phoneNumber" placeholder="+524433027641" width="100%" />
        </FormItem>
        <FormItem rightAligned>
          <SubmitButton>
            Submit
          </SubmitButton>
        </FormItem>
      </LoginForm>
    </Content>)
}

export default LangingPage;
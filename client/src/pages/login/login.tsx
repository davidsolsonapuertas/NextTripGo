import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory, Link } from 'react-router-dom';

import './login.css';

import { LOGIN_USER } from '../../services/mutationService';
import { AuthContext } from '../../Context/Auth';
import { useForm } from '../../util/Hooks';

function Login() {
  let history = useHistory();
  const context = useContext(AuthContext);

  const [errors, setErrors]: any = useState({});

  const { onChange, onSubmit, values }: any = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData);
      history.push('/');
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.exception.errors);
    },
    variables: {
      username: values.username,
      password: values.password,
    },
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="videos pageNoMargin">
      <div className="container pageNoMargin">
        <div id="login" className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-login-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome back!</h1>
                  </div>
                  <form className="user" onSubmit={onSubmit} noValidate>
                    <div className="form-group">
                      <input
                        type="text"
                        className={
                          errors.username
                            ? 'form-control form-control-user errorRed'
                            : 'form-control form-control-user'
                        }
                        placeholder="Username"
                        name="username"
                        value={values.username}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className={
                          errors.password
                            ? 'form-control form-control-user errorRed'
                            : 'form-control form-control-user'
                        }
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={onChange}
                      />
                    </div>
                    {Object.keys(errors).length > 0 && (
                      <div className="">
                        <ul className="">
                          {Object.values(errors).map((value, i) => (
                            <li key={i}> {value}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                      onClick={onSubmit}
                    >
                      Login ↪
                    </button>
                  </form>
                  <hr />
                  <Link to="/register">
                    <div className="text-center">
                      <p className="small">Create an Account!</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

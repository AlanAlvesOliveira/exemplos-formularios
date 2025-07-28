import { useState } from "react";
import Input from "./Input";

export default function Login() {
  const [formState, setFormState] = useState({
    values: {
      email: '',
      password: ''
    },
    touched: {
      email: false,
      password: false
    }
  });

  const { values, touched } = formState;

  const emailIsInvalid = touched.email && !values.email.includes('@');
  const passwordIsInvalid = touched.password && values.password.trim().length < 6;

  function handleSubmit(event) {
    event.preventDefault();

    // Marca todos os campos como tocados ao submeter
    setFormState(prev => ({
      ...prev,
      touched: { email: true, password: true }
    }));

    if (emailIsInvalid || passwordIsInvalid) {
      console.log('Please enter valid credentials');
      return;
    }

    console.log('Submitting:', values);
  }

  function handleInputChange(identifier, value) {
    setFormState(prev => ({
      values: {
        ...prev.values,
        [identifier]: value
      },
      touched: {
        ...prev.touched,
        [identifier]: false
      }
    }));
  }

  function handleInputBlur(identifier) {
    setFormState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [identifier]: true
      }
    }));
  }

  function handleReset() {
    setFormState({
      values: { email: '', password: '' },
      touched: { email: false, password: false }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">

        {/* <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="username"
            onBlur={() => handleInputBlur('email')}
            onChange={(event) => handleInputChange('email', event.target.value)}
            value={values.email}
          />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address</p>}
          </div>
        </div> */}

        <Input
          label="email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur('email')}
          onChange={(event) => handleInputChange('email', event.target.value)}
          value={values.email}
          error={emailIsInvalid && 'Please enter a valid email!'}
          autoComplete="username"
        />

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onBlur={() => handleInputBlur('password')}
            onChange={(event) => handleInputChange('password', event.target.value)}
            value={values.password}
            minLength="6"
            autoComplete="current-password"

          />
          <div className="control-error">
            {passwordIsInvalid && <p>Password must be at least 6 characters</p>}
          </div>
        </div>
      </div>

      <p className="form-actions">
        <button
          type="button"
          className="button button-flat"
          onClick={handleReset}
        >
          Reset
        </button>
        <button type="submit" className="button">
          Login
        </button>
      </p>
    </form>
  );
}
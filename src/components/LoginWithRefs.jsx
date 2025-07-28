import { useRef, useState } from "react";

export default function LoginWithRefs() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const emailIsValid = enteredEmail.includes('@');
    const passwordIsValid = enteredPassword.trim().length >= 6;

    setEmailIsInvalid(!emailIsValid);
    setPasswordIsInvalid(!passwordIsValid);

    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    console.log('Submitting:', {
      email: enteredEmail,
      password: enteredPassword
    });
    // Aqui você faria a chamada à API de login
  }

  function handleReset() {
    emailRef.current.value = '';
    passwordRef.current.value = '';
    setEmailIsInvalid(false);
    setPasswordIsInvalid(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login With Refs</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            ref={emailRef}
            autoComplete="username"
          />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={passwordRef}
            autoComplete="current-password"
            minLength="6"
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
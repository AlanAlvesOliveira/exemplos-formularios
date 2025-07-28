import { useRef } from "react";


export default function LoginWithRefs() {

  const email = useRef();
  const password = useRef();

  function handdleSubmit(event) {
    event.preventDefault()
    console.log(email.current.value);
    console.log(password.current.value);
  }


  return (
    <form onSubmit={handdleSubmit}>
      <h2>Login With Refs</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            ref={email}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}

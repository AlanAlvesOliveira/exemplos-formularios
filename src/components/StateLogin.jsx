import Input from "./Input";
import { useInput } from "../hooks/useInput";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";

export default function StateLogin() {

    const {
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: emailHasError
    } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

    const {
        value: passwordValue,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: passwordHasError
    } = useInput('', (value) => hasMinLength(value, 6));


    function handleSubmit(event) {
        event.preventDefault();

        handleEmailBlur();
        handlePasswordBlur();

        if (emailHasError || passwordHasError) {
            return;
        }

        console.log('Submitting:', emailValue, passwordValue);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login Custom Hook</h2>

            <div className="control-row">

                <Input
                    label="email"
                    id="email"
                    type="email"
                    name="email"
                    onBlur={handleEmailBlur}
                    onChange={handleEmailChange}
                    value={emailValue}
                    error={emailHasError && 'Please enter a valid email!'}
                />

                <Input
                    label="password"
                    id="password"
                    type="password"
                    name="password"
                    onBlur={handlePasswordBlur}
                    onChange={handlePasswordChange}
                    value={passwordValue}
                    error={passwordHasError && 'Please enter a valid email!'}
                />

            </div>

            <p className="form-actions">
                <button
                    type="rest"
                    className="button button-flat"
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
import { useActionState } from "react";
import { isNotEmpty } from "../util/validation";

export default function SignupWithFormActions() {
    const [formState, formAction] = useActionState(handleFormAction, {
        errors: {},
        enteredValues: {}
    });

    return (

        //OBSERVAÇÃO
        // esse action existe no html puro, normalmente ele é usando para submeter o forma para uma outra url,
        // mas aqui ele é reaproveitado pelo react para conectar com o useActionSate
        //ele é executado no evento de submit do form
        <form action={formAction}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            {/* Email */}
            <div className="control">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    defaultValue={formState.enteredValues?.["email"]}
                />
                {formState.errors?.email && (
                    <p className="error-action">{formState.errors.email}</p>
                )}
            </div>

            {/* Password */}
            <div className="control-row">
                <div className="control">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        defaultValue={formState.enteredValues?.["password"]}
                    />
                    {formState.errors?.password && (
                        <p className="error-action">{formState.errors.password}</p>
                    )}
                </div>

                <div className="control">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirm-password"
                        defaultValue={formState.enteredValues?.["confirm-password"]}
                    />
                    {formState.errors?.['confirm-password'] && (
                        <p className="error-action">{formState.errors['confirm-password']}</p>
                    )}
                </div>
            </div>

            <hr />

            {/* Name */}
            <div className="control-row">
                <div className="control">
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        defaultValue={formState.enteredValues?.["first-name"]}
                    />
                    {formState.errors?.['first-name'] && (
                        <p className="error-action">{formState.errors['first-name']}</p>
                    )}
                </div>

                <div className="control">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        defaultValue={formState.enteredValues?.["last-name"]}
                    />
                    {formState.errors?.['last-name'] && (
                        <p className="error-action">{formState.errors['last-name']}</p>
                    )}
                </div>
            </div>

            {/* Role */}
            <div className="control">
                <label htmlFor="role">What best describes your role?</label>
                <select
                    key={`role-select-${formState.enteredValues?.["role"]}`}
                    id="role"
                    name="role"
                    defaultValue={formState.enteredValues?.["role"] || ''}
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="employee">Employee</option>
                    <option value="founder">Founder</option>
                    <option value="other">Other</option>
                </select>
                {formState.errors?.role && (
                    <p className="error-action">{formState.errors.role}</p>
                )}
            </div>

            {/* Acquisition */}
            <fieldset>
                <legend>How did you find us?</legend>
                <div className="control">
                    <input
                        type="checkbox"
                        id="google"
                        name="acquisition"
                        value="google"
                        defaultChecked={formState.enteredValues?.acquisition?.includes('google')}
                    />
                    <label htmlFor="google">Google</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="friend"
                        name="acquisition"
                        value="friend"
                        defaultChecked={formState.enteredValues?.acquisition?.includes('friend')}
                    />
                    <label htmlFor="friend">Referred by friend</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="other"
                        name="acquisition"
                        value="other"
                        defaultChecked={formState.enteredValues?.acquisition?.includes('other')}
                    />
                    <label htmlFor="other">Other</label>
                </div>
                {formState.errors?.acquisition && (
                    <p className="error-action">{formState.errors.acquisition}</p>
                )}
            </fieldset>

            {/* Terms */}
            <div className="control control-terms">
                <label htmlFor="terms-and-conditions">
                    <input
                        type="checkbox"
                        id="terms-and-conditions"
                        name="terms"
                        defaultChecked={Boolean(formState.enteredValues?.['terms'])}
                    />
                    I agree to the terms and conditions
                </label>
                {formState.errors?.terms && (

                    <p className="error-action">{formState.errors.terms}</p>
                )}
            </div>

            <p className="form-actions">
                <button type="reset" className="button button-flat">
                    Reset
                </button>
                <button type="submit" className="button">
                    Sign up
                </button>
            </p>
        </form>
    );
}

function handleFormAction(prevFormState, formData) {
    const acquisitionChannel = formData.getAll('acquisition');
    const data = Object.fromEntries(formData.entries());
    data.acquisition = acquisitionChannel;

    const errors = {};

    // Validações
    if (!isNotEmpty(data['email'])) {
        errors.email = 'Email cannot be empty!';
    }

    if (!isNotEmpty(data['password'])) {
        errors.password = 'Password cannot be empty!';
    } else if (data['password'] !== data['confirm-password']) {
        errors['confirm-password'] = 'Passwords do not match!';
    }

    if (!isNotEmpty(data['first-name'])) {
        errors['first-name'] = 'First name cannot be empty!';
    }

    if (!isNotEmpty(data['last-name'])) {
        errors['last-name'] = 'Last name cannot be empty!';
    }

    if (!data['role']) {
        errors.role = 'Please select a role';
    }

    if (!data['acquisition'] || data['acquisition'].length === 0) {
        errors.acquisition = 'Please select at least one option';
    }

    if (data['terms'] !== "on") {
        errors.terms = 'You must accept the terms and conditions';
    }

    if (Object.keys(errors).length > 0) {
        return {
            errors,
            enteredValues: data
        };
    }

    // Se não houver erros
    console.log('Form data to submit:', data);
    return { errors: null };
}
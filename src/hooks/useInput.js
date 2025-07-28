import { useState } from "react";

export function useInput(defaultValue, validationFn) {

    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [touched, setTouched] = useState(false);

    function handleInputChange(event) {
        setEnteredValue(event.target.value);
        setTouched(false);
    }

    //pode ser feito para receber um array com multiplas validações
    const valueIsValid = validationFn(enteredValue)

    function handleTouched() {
        setTouched(true);
    }

    return {
        value: enteredValue,
        handleInputChange,
        handleTouched,
        hasError: touched && !valueIsValid
    }
}
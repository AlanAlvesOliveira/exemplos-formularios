import { useState } from "react";

export function useInput(defaultValue, validationFn) {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didtEdit, setDidEdit] = useState(false);

    function handleInputChange(event) {
        setEnteredValue(event.target.value);
        setDidEdit(false);
    }

    //pode ser feito para receber um array com multiplas validações
    const valueIsValid = validationFn(enteredValue)

    function handleInputBlur() {
        setDidEdit(true);
    }


    return {
        value: enteredValue,
        handleInputChange,
        handleInputBlur,
        hasError: didtEdit && !valueIsValid
    }


}
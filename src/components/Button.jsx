import { useState } from "react"

export function Button({keepState, onclick, icons})    {

    const [state, setState] = useState(false);

    const changeState = (e) => {
        e.preventDefault();

        setState( prevState => (prevState === false ? true : false));

        if  (onclick != undefined)
        {
            onclick()
        }

        if (!keepState) {
            setTimeout(() => {
                setState( prevState => (prevState === false ? true : false));
            }, 3000);
        }
    };

    return (
        <button onClick={changeState}>{!state && icons[0]} {state && icons[1]}</button>
    )
}
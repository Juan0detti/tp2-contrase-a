import { useEffect, useState } from "react"
import { Button } from "./Button"
import Toast from "./Toast"

export function Analizer ({ inputPassword, setInputPassword }) {

    const [showPassword, setShowPassword] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [strength, setStrength] = useState("Poco Segura")

    const CopyIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
        </svg>
      );

      const CheckIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
        </svg>
      );

      const ShowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
        </svg>
      );

      const HideIcon = () =>   (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
        </svg>
      );

    const evaluate = () =>  {

        const inputValue = document.getElementById("pwd").value

        let strengthScore = 0

        strengthScore += 12 <= inputValue.length? 5 : inputValue.length-3

        const allMinus = 'abcdefghijklmnopqrstuvwxyz'.split('')
        const minusPositions = []
        const allMayus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        const mayusPositions = []
        const allNumbers  = '0123456789'.split('')
        const numbersPositions = []
        const allSpecials = '!@#$%^&*()_+-={}[]:;<>,.?/~`|\\'.split('')
        const specialsPositions = []

        let types = 0

        for (let index = 0; index < inputValue.length; index++) {
            if (allMinus.includes(inputValue[index])) {
                minusPositions.push(index)
                types ++
            }
            else
            {
                if (allMayus.includes(inputValue[index])) {
                    mayusPositions.push(index)
                    types ++
                }
                else
                {
                    if (allNumbers.includes(inputValue[index])) {
                        numbersPositions.push(index)
                        types ++
                    }
                    else
                    {
                        specialsPositions.push(index)
                        types ++
                    }
                }
            }
        }

        const positions = [minusPositions, mayusPositions, numbersPositions, specialsPositions]
        const percents = [minusPositions.length/inputValue.length, mayusPositions.length/inputValue.length, numbersPositions.length/inputValue.length, specialsPositions.length/inputValue.length]

        for (let index = 0; index < positions.length; index++) {
            let dispersion = 0

            for (let index1 = 0; index1 < positions[index].length-1; index1++) {
                dispersion += positions[index][index1+1] - positions[index][index1]
                
            }

            dispersion *= (1/(inputValue.length-1))
            if (dispersion > (inputValue.length/types+(0.3*inputValue.length/types))) {
                strengthScore += 2.5
            }
            else
            {
                if (dispersion > (inputValue.length/types-(0.3*inputValue.length/types))) {
                    strengthScore += 1.25
                }
                else
                {
                    strengthScore += 0.625
                }
            }


            strengthScore += percents[index] === 0? 0 : (0.25/percents[index])*0.625
        }

        if (10 < strengthScore) {
            setStrength("Muy Segura")
            document.getElementById("display").style.color = "green"
        } else {
            if (5 <= strengthScore) {
                setStrength("Segura")
                document.getElementById("display").style.color = "yellow"
            } else {
                setStrength("Poco Segura")
                document.getElementById("display").style.color = "red"
            }
        }
    }

    const copyOnClipboard = async ()=>{
        const input = document.getElementById('pwd')
        if (input)
        {
            await navigator.clipboard.writeText(input.value)
            setToastVisible(true);
        }
    }

    useEffect(() => {
        evaluate()
      }, [inputPassword]);

    return (
        <section className='analizer'>
        
        <label htmlFor="pwd">Ingrese su contraseña:</label>
        <div>
            <input type={showPassword? "password": "text"} id="pwd" name="pwd" placeholder='Ingrese su contraseña' onInput={evaluate}></input>
        </div>
        
        <Button keepState={true} onclick={() => {setShowPassword(prev => !prev)}} icons={[HideIcon(), ShowIcon()]}></Button>

        <Button keepState={false} onclick={copyOnClipboard} icons={[CopyIcon(), CheckIcon()]}></Button> <br></br>

        {toastVisible && (
            <Toast message="¡Copiado en el portapapeles!" onClose={() => setToastVisible(false)} /> )}

        <p>Fuerza estimada: <span id="display">{strength}</span></p>
        </section>
    )
}
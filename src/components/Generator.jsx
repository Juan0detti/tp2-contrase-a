import { useState } from "react"

export function Generator ({ inputPassword, setInputPassword })    {

    const [showAdvanceOptions, setShowAdvanceOptions] = useState(false)

    const generate = () => {
        let length
        let checkboxes 
        let selectedValues

        if (showAdvanceOptions) {
            length = document.getElementById("length").value
            checkboxes = document.querySelectorAll('input[name="option"]:checked')
            selectedValues = Array.from(checkboxes).map(cb => cb.value)
            
            if (selectedValues.length === 0) {
                alert("Inserte al menos un tipo de caracter")
                return 0;
            }

            if (length === '') {
                length = 8
            }
        }
        else
        {
            length = 8
            selectedValues =["minus", "mayus", "numbers", "specials"]
        }

        let pass = ""

        {/*Este método selecciona una cantidad equitativa de caracteres según su tipo [minúsculas, mayúsculas, números, y carateres especiales]*/}
        const idealAmount = Math.floor((1/selectedValues.length) * length); {/*Calvula la cantidad equitativa y la rendonde hacia abajo*/}

        const minusSelected = []
        const minusArray   = 'abcdefghijklmnopqrstuvwxyz'.split('')
        
        const mayusSelected = []
        const mayusArray   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

        const numbersSelected = []
        const numbersArray  = '0123456789'.split('')

        const specialsSelected = []
        const specialsArray = '!@#$%^&*()_+-={}[]:;<>,.?/~`|\\'.split('')

        for (let index = 0; index < selectedValues.length; index++) {
            
            if (selectedValues[index] === "minus") {
                for (let index = 0; index < idealAmount; index++) {
                    minusSelected.push(minusArray[Math.floor(Math.random() * minusArray.length)]); {/*Calcula un numero aleatorio entre 0 y el tamaño del array de las letras minusculas, lo rendodea y selecciona el caracter cuyo indice sea igual al valor obtenido*/}
                }
            }   
            else 
            {
                if (selectedValues[index] === "mayus") {
                    for (let index = 0; index < idealAmount; index++) {
                        mayusSelected.push(mayusArray[Math.floor(Math.random() * mayusArray.length)])
                    }
                }   
                else
                {
                    if (selectedValues[index] === "numbers") {
                        for (let index = 0; index < idealAmount; index++) {
                            numbersSelected.push(numbersArray[Math.floor(Math.random() * numbersArray.length)])
                        }
                    }
                    else
                    {
                        for (let index = 0; index < idealAmount; index++) {
                            specialsSelected.push(specialsArray[Math.floor(Math.random() * specialsArray.length)])
                        }
                    }
                }
            }

        }

        {/* Aquí, junto todos los seleccionados para luego mesclarlo y agregarlo a la contraseña */}
        let allSelecteds = [...minusSelected, ...mayusSelected, ...numbersSelected, ...specialsSelected]

        for (let i = allSelecteds.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // índice aleatorio
            [allSelecteds[i], allSelecteds[j]] = [allSelecteds[j], allSelecteds[i]]; // intercambio
          }

        for (let index = 0; index < allSelecteds.length; index++) {
            pass += allSelecteds[index];
        }

        {/*Si por redondear la cantidad de caracteres de cada tipo pierdo letras o si la longitud de contraseña deseada es menor a la cantidad de tipos de caracteres selecionados; completo eligiendo al lazar los valores; lo que quita la equidad entre tipos de caracteres, pero bue, se hace lo que se puede*/}
        let allCharacters = [...minusArray, ...mayusArray, ...numbersArray, ...specialsArray]
        while (pass.length < length) {
           pass += allCharacters[Math.floor(Math.random() * allCharacters.length)]
        }

        const input = document.getElementById('pwd')
        input.value = pass

        setInputPassword(pass)
    }

    return (
        <section className='generator'>
            <button className={'advanceOptions'}onClick={()=>setShowAdvanceOptions(!showAdvanceOptions)}>Opciones Avanzadas</button>
            {
                showAdvanceOptions &&
            <form>

                <div id="lengthIInput">
                    <label htmlFor="length">Largo</label>
                    <input type='number' id='length' name='length' placeholder='Ingrese largo.Default = 8' min={8}></input>
                </div>

                <div>
                    <label htmlFor="mayus">Mayúsculas</label>
                    <input type='checkbox' id='mayus' name='option' value={"mayus"}></input>
                </div>
                
                <div>
                    <label htmlFor="minus">Minúsculas</label>
                    <input type='checkbox' id='minus' name='option' value={"minus"}></input>
                </div>
            
                <div>
                    <label htmlFor="numbers">Números</label>
                    <input type='checkbox' id='number' name='option' value={"numbers"}></input>
                </div>

                <div>
                    <label htmlFor="special">Caracteres especiales</label>
                    <input type='checkbox' id='special' name='option' value={"specials"}></input>
                </div>

            </form>
            }

            <button type="button" onClick={generate}>Generar</button>

        </section>
    )
}
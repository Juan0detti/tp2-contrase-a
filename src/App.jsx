import './App.css'
import { useState } from 'react'
import { Analizer } from './components/Analizer'
import { Generator } from './components/Generator'

function App() {
const [inputPassword, setInputPassword] = useState('')
  return (
    <>
      <h1>Fortificador de contraseña</h1>
      <Analizer inputPassword={inputPassword} setInputPassword={setInputPassword}></Analizer>
        <h2>Generar contraseña</h2>
        <Generator inputPassword={inputPassword} setInputPassword={setInputPassword}></Generator>
    </>
  )
}

export default App

import { useState, FormEvent } from 'react'
import './App.css'
import logoImg from './assets/logo.png'

/*
Calculo: alcool/gasolina
e se o resultado for menor que 0.7 compensar usar alcool!
*/

interface InfoProps{
  title: string;
  gasolina: string | number;
  alcool: string | number;
}



function App() {
  const [gasolinaInput, setGasolinaInput] = useState(0)
  const [alcoolInput, setAcoolInput] = useState(0)
  const[info, setInfo] = useState<InfoProps>()



  function calcular(event: FormEvent){
    event.preventDefault();
    const calculo = (alcoolInput/gasolinaInput)
    if(calculo <= 0.7){
      setInfo({
        title:"Compensa usar Álcool",
        gasolina: formatoMoeda(gasolinaInput),
        alcool: formatoMoeda(alcoolInput)
      })
    }else{
      setInfo({
        title:"Compensa usar Gasolina",
        gasolina: formatoMoeda(gasolinaInput),
        alcool: formatoMoeda(alcoolInput)
      })
    }
  }

  function formatoMoeda(valor: number){
    const valorformatado = valor.toLocaleString("pt-br",
      {
        style: "currency",
        currency: "BRL"
      }
    )
    return valorformatado;
  }

  return ( 
      <div>
        <main className="container" >
        <img className="logo" src={logoImg } alt="Logo calculadora gasolina ou alcool"/>
        <h1 className="title">Qual a melhor escolha?</h1>

        <form className="form" onSubmit={calcular }>
          <label>Álcool (preço por litro)</label>
          <input className="input" type="number" placeholder="4,90" min="1" step="0.01" required value={alcoolInput}
          onChange={(e) => setAcoolInput(Number(e.target.value))}/>
          <label>Gasolina (preço por litro)</label>
          <input className="input" type="number" placeholder="4,90" min="1" step="0.01" required value={gasolinaInput}
          onChange={(e) => setGasolinaInput(Number(e.target.value))}/>

          <input className="button" type="submit" value="Fazer calculo"/>
        </form>
        {info && Object.keys(info).length > 0 && (
          
        <section className="result">
          <h2 className="result-title">{info.title}</h2>

          <span>Álcool {info.alcool}</span>
          <span>Gasolina  {info.gasolina}</span>
        </section>
        )}
        </main>
      </div>
  )
}

export default App

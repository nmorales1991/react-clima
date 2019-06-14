import React,{useState, useEffect} from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Error from './components/Error'
import Clima from './components/Clima'

function App() {

  const [ciudad, guardarCiudad] = useState('')
  const [pais, guardarPais] = useState('')
  const [error, guardarError] = useState(false)
  const [resultado, guardarResultado] = useState({})

  useEffect(() => {//si cambia ciudad o pais entonces se activa el useEffect

    if(ciudad==='') return
    
    consultarAPI()
  }, [ciudad,pais])

  const datosConsulta = datos =>{
    if(datos.ciudad==='' || datos.pais===''){
      guardarError(true)
      return
    }

    guardarCiudad(datos.ciudad)
    guardarPais(datos.pais)
    guardarError(false)

  }
  
  const consultarAPI = async () =>{
    const appId ='xxxxxxxxxxxxxxxxxxxxxxxxxx'
    const url= `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}&units=metric`
    let respuesta = await fetch(url)
    let resultado = await respuesta.json()
    guardarResultado(resultado)
  }


  

  let componente
  if(error){
    componente = <Error mensaje='Ambos campos son obligatorios'/>
  }else if(resultado.cod==="404"){
    componente = <Error mensaje='Ciudad no se encuentra en nuestros registros'/>
  }else{
    componente = <Clima resultado={resultado}/>
  }

  return (
    <div className="App">
      <Header titulo='Clima React App'/>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario datosConsulta={datosConsulta}/>
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default App;

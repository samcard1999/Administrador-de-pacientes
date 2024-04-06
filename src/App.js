import React,{useEffect, useState} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import PropTypes from 'prop-types';
function App() {

    //citas en localstorage
    let citasIniciales=JSON.parse(localStorage.getItem('citas'));
    if(!citasIniciales) {citasIniciales=[];}

  //arreglo de citas
  const [citas, guardarCitas]= useState(citasIniciales);

  //funcion que tome las scitas actueales y agregue la nueva
  const crearCita= cita =>{
    guardarCitas([
      ...citas,
      cita
    ])
  }
 //eliminar citas del state
  const eliminarCita= (id)=>{
    const nuevasCitas=citas.filter(cita=> cita.id !== id);
    guardarCitas(nuevasCitas);
  } 

  //useEffect para realizar operaciones cuando el state cambia 
  useEffect( () =>{
  let citasIniciales=JSON.parse(localStorage.getItem('citas'));
  if(citasIniciales){
    localStorage.setItem('citas',JSON.stringify(citas))
  }
  else{
    localStorage.setItem('citas',JSON.stringify([]));
  }
  },[citas])
  

  


  return (
    <>
    <h1>Administrador de pacientes</h1>
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <Formulario
          crearCita={crearCita}
          ></Formulario>
        </div>
        <div className="one-half column">
          
         {citas.length===0? 
         <h2>No hay citas</h2>: 
         <h2> Administra tus citas</h2>}

         {citas.map(cita=>(
          <Cita
            key={cita.id}
            cita={cita}
            eliminarCita={eliminarCita}
          />
        ))}
        </div>
      </div>
    </div>
    </>

  );
}

Cita.propTypes ={
  cita: PropTypes.object.isRequired,
  eliminarCita: PropTypes.func.isRequired
}
export default App;

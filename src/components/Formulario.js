import React,{useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'
export const Formulario = ({crearCita}) => {

//crear state de citas
const [cita, actualizarCita]= useState({
    mascota:'',
    propietario:'',
    fecha:'',
    hora:'',
    sintomas:''

});

const [error, setError]= useState(false)

const actualizarState = e=> {
actualizarCita({
  ...cita,
  [e.target.name]:e.target.value
})
}

//extraer los valores 
const {mascota, propietario, fecha, hora, sintomas} = cita;

//cuando el usuario presiona agregar cita
const submitCita =e =>{
e.preventDefault();

//validar
if(mascota.trim() === ''||propietario.trim() === ''||fecha.trim() === ''||hora.trim() === ''||sintomas.trim() === ''){
  
  setError(true)
  return;
}
//eliminar el mensaje previo
setError(false);
cita.id=uuidv4();
//asignar un id

//crear la cita 
crearCita(cita);
//Reiniciar el form
actualizarCita({
  mascota:'',
  propietario:'',
  fecha:'',
  hora:'',
  sintomas:''
})
}

  return (
    <>
    <h2>Crear Cita</h2> 
    {error ? <p className='alerta-error'>Todos los campos son obligatorios</p>: null}
    <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
        type="text"
        name="mascota"
        className='u-full-width'
        placeholder='Nombre mascota'
        onChange={actualizarState}
        value={mascota}
        >
        </input>
        <label>Nombre propietario</label>
        <input
        type="text"
        name="propietario"
        className='u-full-width'
        placeholder='Nombre Propietario'
        onChange={actualizarState}
        value={propietario}
        >
        </input>
        <label>Fecha</label>
        <input
        type="date"
        name="fecha"
        className='u-full-width'
        onChange={actualizarState}
        value={fecha}
        >
        </input>
        <label>Hora</label>
        <input
        type="time"
        name="hora"
        className='u-full-width'
        onChange={actualizarState}
        value={hora}
        >
        </input>
        <label>Sintomas</label>
        <textarea
        className='u-full-width'
        name="sintomas"
        onChange={actualizarState}
        value={sintomas}
        ></textarea>
        <button
            type="submit"
            className='u-full-width-primary'
            
        >Agregar Cita</button>
    </form>
    </>
  )
}

Formulario.propTypes = {
  crearCita:PropTypes.func.isRequired
  
}
export default Formulario;
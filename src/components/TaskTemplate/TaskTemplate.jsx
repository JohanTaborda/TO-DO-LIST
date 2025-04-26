import React from 'react';
import './TaskTemplate.css';

// Importamos los iconos:
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";

//Recibimos por props:
//task: Es el objeto con las tareas. 
//updateTask: Es la función que permite actualizar las tareas.  
const TaskTemplate = ({ task, updateTask }) => {    
    
    //Basicamente acá, sacamos todas las propiedades del objeto task.
    const { id, handleVerified, textInput, prevText, textArea, prevTextArea, changeAcept, cardVisible } = task;
    const mensaje = "Hola";
    const handleUpdate = (newData) => { //Función que permite actualizar. 
        //Llamamos la función updateTask, que se recibe por props y le mandamos el id de la tarea y la nueva actualización
        updateTask(id, { ...task, ...newData }); //Recibe los datos nuevos y los reemplaza en los actuales. 
    };

    const handleAccept = () => { //Función que permite mostrar los nuevos datos del cambio.
        if (!textInput.trim()) { //Si el input del titulo esta vacio sale una alerta 
            return alert("El título de la tarea es obligatorio.");
        }
        //De lo contrario, actualizamos la tarea, mandando a todo lo previo, el nuevo valor, y el ultimo valor true para no hacerlo editable momentaneamente. 
        handleUpdate({ prevText: textInput, prevTextArea: textArea, handleVerified: true });
    };

    const handleCancel = () => { //Función que se ejecuta cuando se le da clic al botón de cancelar
        if (prevText) { //Si tiene texto previo:
            handleUpdate({ textInput: prevText, textArea: prevTextArea, changeAcept: false, handleVerified: true }); //Actualizamos esos valores con los previos.
        } else {
            handleUpdate({ cardVisible: false }); //Si no hay valores previos, me oculta la tarea, esto cuando se agrega una nueva y se le da a cancelar.
        }
        
    };

    if (!cardVisible) return null; // Si cardVisible es falso no me muestra nada.

    //Funciones para los iconos
    const icon_check = () => <FaCheck style={{ fontSize: "15px", color: "#fff" }} />;
    const icon_delete = () => <FaTrashAlt style={{ fontSize: "15px" }} />;
    const icon_close = () => <IoMdClose style={{ fontSize: "20px", color: "#fff" }} />;
    const icon_edit = () => <RiPencilFill style={{ fontSize: "15px" }} />;

    return (
        <div className='card__Task'>
            <header className='card__containerGeneral'>
                {!handleVerified ? (
                    <>
                        <input type="text" placeholder='Titulo de la tarea' value={textInput} required //Campo requerido
                            className='card--inputTitle'
                            onChange={(e) => handleUpdate({ textInput: e.target.value })} //Permitimos el cambio de texto en el input.
                        />
                        <textarea placeholder='Descripción de la tarea' value={textArea}
                            className='card--description'
                            onChange={(e) => handleUpdate({ textArea: e.target.value })} //Permitimos el cambio de texto en el textArea.
                        ></textarea>
                        <div className='card__containerButtons'> {/*Contenedor de los botones interactivos*/}
                            <button className='buttons--interactive' onClick={handleCancel}>Cancelar</button>
                            <button className='buttons--interactive' onClick={handleAccept}>Aceptar</button>
                        </div>
                    </>
                ) : (
                    <>
                        <input type="text" value={textInput} readOnly
                            className={`card--inputTitle ${changeAcept ? "accept" : ""}`}
                            id='card--inputAccept'
                        />
                        <textarea value={textArea} readOnly
                            className={`card--description ${changeAcept ? "accept" : ""}`}
                            id='card--descriptionAccept'
                        ></textarea>
                        <div className='card__containerButtons'>
                            {!changeAcept ? ( //Iconos cuando la tarea no se ha marcado como completada.
                                <>
                                    <button className='buttons--interactive' onClick={() => handleUpdate({ changeAcept: true })}> {icon_check()}</button>
                                    <button className='buttons--interactive' onClick={() => handleUpdate({ cardVisible: false })}>{icon_delete()}</button>
                                    <button className='buttons--interactive' onClick={() => handleUpdate({ handleVerified: false })}>{icon_edit()}</button>
                                </>
                            ) : ( //Iconos cuando la tarea se marca como lista 
                                <>
                                    <button className='buttons--interactive' onClick={() => handleUpdate({ changeAcept: false })}>{icon_close()}</button>
                                    <button className='buttons--interactive' onClick={() => handleUpdate({ cardVisible: false })}>{icon_delete()}</button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </header>
        </div>
    );
};

export default TaskTemplate;

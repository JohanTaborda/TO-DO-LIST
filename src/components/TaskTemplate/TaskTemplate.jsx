import React from 'react';
import './TaskTemplate.css';

// Importamos los iconos:
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";

const TaskTemplate = ({ task, updateTask }) => {    
    const { id, handleVerified, textInput, prevText, textArea, prevTextArea, changeAcept, cardVisible } = task;

    const handleUpdate = (newData) => {
        updateTask(id, { ...task, ...newData });
    };

    const handleAccept = () => {
        if (!textInput.trim()) {
            alert("El título de la tarea es obligatorio.");
            return;
        }
        handleUpdate({ prevText: textInput, prevTextArea: textArea, handleVerified: true });
    };

    const handleCancel = () => {
        if (prevText) {
            handleUpdate({ textInput: prevText, textArea: prevTextArea, changeAcept: false, handleVerified: true });
        } else {
            handleUpdate({ cardVisible: false });
        }
        
    };

    if (!cardVisible) return null;

    return (
        <div className='card__Task'>
            <header className='card__containerGeneral'>
                {!handleVerified ? (
                    <>
                        <input type="text" placeholder='Titulo de la tarea' value={textInput} required
                            className='card--inputTitle'
                            onChange={(e) => handleUpdate({ textInput: e.target.value })}
                        />
                        <textarea placeholder='Descripción de la tarea' value={textArea}
                            className='card--description'
                            onChange={(e) => handleUpdate({ textArea: e.target.value })}
                        ></textarea>
                        <div className='card__containerButtons'>
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
                            {!changeAcept ? (
                                <>
                                    <button className='buttons--interactive' onClick={() => handleUpdate({ changeAcept: true })}>
                                        <FaCheck style={{ fontSize: "15px", color: "green" }} />
                                    </button>
                                    <button className='buttons--interactive' onClick={() => handleUpdate({ cardVisible: false })}>
                                        <FaTrashAlt style={{ fontSize: "15px" }} />
                                    </button>
                                    <button className='buttons--interactive' onClick={() => handleUpdate({ handleVerified: false })}>
                                        <RiPencilFill style={{ fontSize: "15px" }} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className='buttons--interactive' onClick={() => handleUpdate({ changeAcept: false })}>
                                        <IoMdClose style={{ fontSize: "20px", color: "red" }} />
                                    </button>
                                    <button className='buttons--interactive' onClick={() => handleUpdate({ cardVisible: false })}>
                                        <FaTrashAlt style={{ fontSize: "15px" }} />
                                    </button>
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

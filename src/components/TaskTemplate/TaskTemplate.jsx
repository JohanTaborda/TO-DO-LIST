import React, { useState } from 'react';
import './TaskTemplate.css'

// Importamos los iconos:
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";

const TaskTemplate = () => {
    const [handleVerified, setHandleVerified] = useState(false);
    const [textInput, setTextInput] = useState("");
    const [prevText, setPrevText] = useState(""); 
    const [textArea, setTextArea] = useState("");
    const [prevTextArea, setPrevTextArea] = useState(""); 
    const [changeAcept, setChangeAcept] = useState(false);
    const [cardVisible, setCardVisible] = useState(true); // Controla la visibilidad

    const icon_check = () => <FaCheck style={{ fontSize: "15px", color: "green" }} />;
    const icon_close = () => <IoMdClose style={{ fontSize: "20px", color: "red" }} />;
    const icon_delete = () => <FaTrashAlt style={{ fontSize: "15px" }} />;
    const icon_edit = () => <RiPencilFill style={{ fontSize: "15px" }} />;

    const handleAccept = () => {
        setPrevText(textInput); // Guarda el texto antes de confirmar
        setPrevTextArea(textArea);
        setHandleVerified(true);
    };

    const handleCancel = () => {
        if (prevText) {
            setTextInput(prevText); // Restaura el texto si había algo antes
            setTextArea(prevTextArea);
            setChangeAcept(false);
            setHandleVerified(true);
        } else {
            setCardVisible(false); // Si no había texto antes, oculta la tarjeta
        }
    };

    if (!cardVisible) return null; // Oculta la tarjeta si `cardVisible` es false

    return (
        <div className='card__Task'>
            <header className='card__containerGeneral'>
                {!handleVerified ? (
                    <>
                        <input
                            type="text"
                            className='card--inputTitle'
                            placeholder='Titulo de la tarea'
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                        />
                        <textarea className='card--description' placeholder='Descripción de la tarea' onChange={(e) => setTextArea(e.target.value)}></textarea>
                        <div className='card__containerButtons'>
                            <button className='buttons--interactive' onClick={handleCancel}>Cancelar</button>
                            <button className='buttons--interactive' onClick={handleAccept}>Aceptar</button>
                        </div>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            value={textInput}
                            className={`card--inputTitle ${changeAcept ? "accept" : ""}`}
                            id='card--inputAccept'
                            placeholder='Titulo de la tarea'
                            readOnly
                        />
                        <textarea
                            className={`card--description ${changeAcept ? "accept" : ""}`}
                            value={textArea}
                            id='card--descriptionAccept'
                            placeholder='Descripción de la tarea'
                            readOnly
                        ></textarea>
                        <div className='card__containerButtons'>
                            {!changeAcept ? (
                                <>
                                    <button className='buttons--interactive' onClick={() => setChangeAcept(true)}>{icon_check()}</button>
                                    <button className='buttons--interactive' onClick={() => setCardVisible(false)}>{icon_delete()}</button>
                                    <button className='buttons--interactive' onClick={() => setHandleVerified(false)}>{icon_edit()}</button>
                                </>
                            ) : (
                                <>
                                    <button className='buttons--interactive' onClick={() => setChangeAcept(false)}>{icon_close()}</button>
                                    <button className='buttons--interactive'onClick={() => setCardVisible(false)}>{icon_delete()}</button>
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

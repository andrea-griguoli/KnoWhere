import './SpecificEvent.css'
import React, {useEffect, useState} from "react";
import {SpecificEventItemI} from "../../../../InterfaceUtilities";

const SpecificEvent: React.FC<SpecificEventItemI> = ({evento, setSpecificEventVisible,
                                                         savedEvents, setChangedSaved, username}) => {

    const [isFavourite, setIsFavourite] = useState(false)
    const [members, setMembers] = useState(0)
    const [isJoined, setIsJoined] = useState(false)
    const fetchNewFavourite = async (id: any) =>{
        const data = {
            utente: username,
            evento: id
        };
        fetch(`http://localhost:8080/home/saved_events/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    console.log("Luogo salvato con successo!");
                    setChangedSaved(prev=> !prev)
                } else {
                    console.error("Errore durante il salvataggio");
                }
            })
    }
    const fetchNewMember = async (id: any) =>{
        const data = {
            utente: username,
            evento: id
        };
        fetch(`http://localhost:8080/home/join/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    console.log("Luogo salvato con successo!");
                    setChangedSaved(prev=> !prev)
                } else {
                    console.error("Errore durante il salvataggio");
                }
            })
    }

    const fetchMembers = async (id: any) =>{
        try{
            const response = await fetch(`http://localhost:8080/home/join/${id}`);
            const data = await response.json();
            setMembers(data);
        }catch(error){
            console.log(error)
        }
    }

    const fetchJoin = async () =>{
        try{
            const response = await fetch(`http://localhost:8080/home/join/find/${username}`);
            const data = await response.json();
            const eventIds = data.map((item: { evento: { id: number } }) => item.evento);

            // Controlla se evento.id è presente nell'elenco
            if (eventIds.includes(evento.id)) {
                setIsJoined(true);
            } else {
                setIsJoined(false); // Se vuoi gestire il caso in cui non sia presente
            }
        }catch(error){
            console.log(error)
        }
    }

    const fetchToRemouve = async (id: any) =>{
        fetch(`http://localhost:8080/home/saved_events/delete?email=${encodeURIComponent(username)}&id=${encodeURIComponent(id)}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setChangedSaved(prev => !prev)
                    console.log("Evento eliminato con successo!");
                } else {
                    console.error("Errore durante l'eliminazione dell'evento");
                }
            })
    }
    const fetchRemouveMember = async (id: any) =>{
        fetch(`http://localhost:8080/home/join/delete?email=${encodeURIComponent(username)}&id=${encodeURIComponent(id)}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setChangedSaved(prev => !prev)
                    console.log("Evento eliminato con successo!");
                } else {
                    console.error("Errore durante l'eliminazione dell'evento");
                }
            })
    }

    useEffect(() => {
        fetchMembers(evento.id)
        fetchJoin();
        if (savedEvents.some(e => e.id === evento.id)) {
            setIsFavourite(true);
        } else {
            setIsFavourite(false);
        }
    }, [savedEvents, evento, isJoined]);

    return (
        <div className={`specific-event-container-${evento.tipo}`}>
            <button className="back-button" onClick={() => setSpecificEventVisible(null)}>
                <img src={require("../../../../../resources/icons8-chevron-down-50.png")} alt="chevron"
                     className={"chev"}/>
            </button>
            <img src={evento.img} alt={evento.name} className="specific-event-image"/>
            <h1 className="specific-event-name">{evento.name}</h1>
            <div className="specific-event-description-container">
                <p className="specific-event-description">{evento.description}</p>
            </div>

            <div className="specific-event-row">
                <img src={require("../../../../../resources/icons8-marker-50.png")} className={"specific-event-icon"} alt={"boh"}></img>
                <span className="specific-event-label">Posizione:</span> {evento.location}
            </div>
            <div className="specific-event-row">
                <img src={require("../../../../../resources/icons8-map-50.png")} className={"specific-event-icon"} alt={"boh"}/>
                <span className="specific-event-label">Città:</span> {evento.citta_principale}
            </div>

            <div className="specific-event-row">
                <img src={require("../../../../../resources/icons8-calendar-50.png")} className={"specific-event-icon"}
                     alt={"boh"}/>
                <span className="specific-event-label">Data:</span> {evento.date}
                <span className="specific-event-separator">|</span>
                <img src={require("../../../../../resources/icons8-clock-50.png")} className={"specific-event-icon"}
                     alt={"boh"}/>
                <span className="specific-event-label">Ora:</span> {evento.ora}
            </div>

            <div className="specific-event-row">
                <img src={require("../../../../../resources/icons8-people-50.png")} className={"specific-event-icon"}
                     alt={"boh"}/>
                <span className="specific-event-label">Partecipanti:</span> {members}/{evento.partecipanti}
            </div>

            <div className="specific-event-buttons">
                {!isJoined ?
                    <button className="participate-button" onClick={(e) => {
                        fetchNewMember(evento.id)
                        setIsJoined(true);
                    }}>
                    Partecipa
                        <img
                            src={require("../../../../../resources/icons8-people-50.png")}
                            alt="Logo" className="quit-icon"/>
                    </button>
                    :
                    <button className="quit-button" onClick={(e) => {
                        fetchRemouveMember(evento.id)
                        setIsJoined(false);
                    }}>
                        Abbandona
                        <img
                            src={require("../../../../../resources/icons8-cross-50.png")}
                            alt="Logo" className="quit-icon"/>
                    </button>
                }
                <button className="save-button">
                    <i className="custom-icon"/>
                    {isFavourite ?
                        <img
                            src={require("../../../../../resources/icons8-bookmark-24.png")}
                            alt="Logo" className="save-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                fetchToRemouve(evento.id);
                            }}
                        />
                        :
                        <img
                            src={require("../../../../../resources/icons8-bookmark-24 (1).png")}
                            alt="Logo" className="save-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                fetchNewFavourite(evento.id);
                                setIsFavourite(true);
                            }}
                        />
                    }
                </button>
            </div>
        </div>
    );
};

export default SpecificEvent;
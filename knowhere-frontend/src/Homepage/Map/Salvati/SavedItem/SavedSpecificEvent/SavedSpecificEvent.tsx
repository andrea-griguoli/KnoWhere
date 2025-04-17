import './SavedSpecificEvent.css'
import React, {useEffect, useState} from "react";
import {SavedSpecificEventItemI, SpecificEventItemI} from "../../../../InterfaceUtilities";

const SavedSpecificEvent: React.FC<SavedSpecificEventItemI> = ({evento, setSpecificEventVisible, username}) => {

    const [isFavourite, setIsFavourite] = useState(false)
    const [members, setMembers] = useState(0)
    const [isJoined, setIsJoined] = useState(false)

    const fetchRemouveMember = async (id: any) =>{
        fetch(`http://localhost:8080/home/join/delete?email=${encodeURIComponent(username)}&id=${encodeURIComponent(id)}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log("Evento eliminato con successo!");
                } else {
                    console.error("Errore durante l'eliminazione dell'evento");
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
                } else {
                    console.error("Errore durante il salvataggio");
                }
            })
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

    useEffect(() => {
        fetchJoin()
    }, [evento, isJoined]);

    return (
        <div className={`saved-event-${evento.tipo}`} onClick={()=>setSpecificEventVisible(false)}>
            <div className="saved-event-body">
                <div className="saved-event-image">
                    <img src={evento.img} alt="Saved Event" className="saved-event-photo"/>
                </div>
                <div className="saved-event-content">
                    <div className="saved-event-header">
                        <h1 className="saved-event-title">{evento.name}</h1>
                    </div>
                    <div className="saved-event-description">
                        <p>{evento.description}</p>
                    </div>
                    <div className="saved-event-footer">
                        <div className="specific-event-info">
                            <div className="specific-event-row">
                                <img src={require("../../../../../resources/icons8-map-50.png")}
                                     className="specific-event-icon" alt="Map Icon"/>
                                <span className="specific-event-label">Città:</span> {evento.citta_principale}
                            </div>
                            <div className="specific-event-row">
                                <img src={require("../../../../../resources/icons8-marker-50.png")}
                                     className="specific-event-icon" alt="Marker Icon"/>
                                <span className="specific-event-label">Posizione:</span> {evento.location}
                            </div>
                        </div>
                        <div className="participate-container">
                            {!isJoined ?
                                <button className="participate-button" onClick={(e) => {
                                    fetchNewMember(evento.id)
                                    setIsJoined(true);
                                    e.stopPropagation()
                                }}>
                                    Partecipa
                                    <img
                                        src={require("../../../../../resources/icons8-people-50.png")}
                                        alt="Logo" className="participate-icon"/>
                                </button>
                                :
                                <button className="saved-quit-button" onClick={(e) => {
                                    fetchRemouveMember(evento.id)
                                    setIsJoined(false);
                                    e.stopPropagation()
                                }}>
                                    Abbandona
                                    <img
                                        src={require("../../../../../resources/icons8-cross-50.png")}
                                        alt="Logo" className="participate-icon"/>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default SavedSpecificEvent;
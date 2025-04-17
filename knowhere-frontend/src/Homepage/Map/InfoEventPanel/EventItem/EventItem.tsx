import React, {useEffect, useState} from 'react';
import './EventItem.css';
import {EventItemI} from "../../../InterfaceUtilities";

const EventItem: React.FC<EventItemI> = ({ evento, setSpecificEventVisible, savedEvents,
                                             setChangedSaved, username}) => {

    const [isFavourite, setIsFavourite] = useState(false)
    const [isJoined, setIsJoined] = useState(false)

    useEffect(() => {
        fetchJoin()
        if (savedEvents.some(e => e.id === evento.id)) {
            setIsFavourite(true);
        } else {
            setIsFavourite(false);
        }
    }, [evento, savedEvents, isJoined]);

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

    const fetchJoin = async () =>{
        try{
            const response = await fetch(`http://localhost:8080/home/join/find/${username}`);
            const data = await response.json();
            const eventIds = data.map((item: { evento: { id: number } }) => item.evento);

            // Controlla se evento.id è presente nell'elenco
            if (eventIds.includes(evento.id)) {
                setIsJoined(true);
            } else {
                setIsJoined(false); // gestire il caso in cui non sia presente
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className={`event-item-${evento.tipo}`} onClick={()=>setSpecificEventVisible(evento)}>
            <div className="event-image">
                <img src={evento.img} alt={evento.img} className="event-photo"/>
            </div>
            <div className="event-info">
                <div className="event-title-date">
                    <h1 className="event-title">{evento.name}</h1>
                    <div>
                        {isJoined ?
                            <img
                                src={require("../../../../resources/icons8-people-50 (2).png")}
                                alt="Logo" className="save-icon"
                            />
                            :
                            <img
                                src={require("../../../../resources/icons8-community-50.png")}
                                alt="Logo" className="save-icon"
                            />
                        }
                        {isFavourite ?
                            <img
                                src={require("../../../../resources/icons8-bookmark-24.png")}
                                alt="Logo" className="save-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fetchToRemouve(evento.id)
                                }}
                            />
                            :
                            <img
                                src={require("../../../../resources/icons8-bookmark-24 (1).png")}
                                alt="Logo" className="save-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fetchNewFavourite(evento.id)
                                    setIsFavourite(true);
                                }}
                            />
                        }
                    </div>
                </div>
                <p className="event-date">{evento.date}</p>
                <span className="event-more" onClick={() => setSpecificEventVisible(evento)}>
                Vedi di più
                 </span>
            </div>
        </div>
    );
};

export default EventItem;

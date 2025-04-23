import React, {useEffect, useState} from "react";
import {Evento, InfoEventPanelI} from "../../InterfaceUtilities";
import './InfoEventPanel.css'
import EventItem from "./EventItem/EventItem";
import SpecificEvent from "./EventItem/SpecificEvent/SpecificEvent";


const InfoEventPanel: React.FC<InfoEventPanelI> = ({data, panelEventVisible, setPanelInfoVisible,
                                                       setPanelEventVisible, activeMarker,
                                                       apiKey, allMarkers, savedEvents,
                                                       setChangedSaved, username}) => {
    const [error, setError] = useState<boolean>(false);
    const [allDataVisible, setAllDataVisible] = useState(false);
    const [specificEventVisible, setSpecificEventVisible] = useState<Evento|null>(null)

    useEffect(() => {
        if(activeMarker){
            setAllDataVisible(false);
            compareCoordinates(activeMarker.getLngLat())
        }else{
            setAllDataVisible(true)
            setSpecificEventVisible(null)
        }
    }, [activeMarker]);// Aggiorna le informazioni in base al marker attivo
    useEffect(() => {
        setSpecificEventVisible(null); // Resetta l'evento specifico selezionato
        setAllDataVisible(true); // Rendi visibili tutti gli eventi
    }, [data]);
    useEffect(() => {
        const highlightMarker = async () => {
            if (specificEventVisible) {
                // Ottieni le coordinate dell'evento visibile
                const eventCoordinates = await getCoordinatesFromLocation(specificEventVisible.location);

                if (eventCoordinates) {
                    const { lat, lng } = eventCoordinates;

                    // Trova il marker corrispondente nelle variabili allMarkers
                    for (const [key, markers] of Object.entries(allMarkers)) {
                        for (const marker of markers) {
                            const markerCoordinates = marker.getLngLat();
                            if (
                                Math.abs(markerCoordinates.lat - lat) < 0.0001 &&
                                Math.abs(markerCoordinates.lng - lng) < 0.0001
                            ) {
                                // Modifica il marker per evidenziarlo
                                if(!marker.getElement().style.transform.includes('scale(1.3)'))
                                    marker.getElement().style.transform += ' scale(1.3)';
                            } else {
                                // Ripristina lo stile degli altri marker
                                marker.getElement().style.transform = marker.getElement().style.transform.replace(' scale(1.3)', '');
                            }
                        }
                    }
                }
            }
        };
        if(specificEventVisible===null){
            for (const [key, markers] of Object.entries(allMarkers)) {
                for (const marker of markers) {
                    if(marker.getElement().style.transform.includes('scale(1.3)'))
                        marker.getElement().style.transform = marker.getElement().style.transform.replace(' scale(1.3)', '');
                }
            }
        }

        highlightMarker();
    }, [specificEventVisible]); // Ingrandisce il marker relativo sll'evento quando si clicca sulla lista
    const getCoordinatesFromLocation = async (location: string): Promise<{ lat: number, lng: number } | null> => {
        try {
            const response = await fetch(`https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${apiKey}`);
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                return {
                    lng: data.features[0].geometry.coordinates[0],
                    lat: data.features[0].geometry.coordinates[1]
                };
            }
        } catch (error) {
            console.error("Errore nel geocoding inverso:", error);
        }
        return null;
    }; // Funzione che restituisce lat e lon partendo da una città
    const compareCoordinates = async (markerCoordinates: { lat: number, lng: number }) => {
        for (const event of data) {
            const eventCoordinates = await getCoordinatesFromLocation(event.location);
            if (eventCoordinates) {
                const { lat, lng } = eventCoordinates;
                // Confronta le coordinate del marker con quelle dell'evento (tolleranza di 0.0001)
                if (Math.abs(lat - markerCoordinates.lat) < 0.0001 && Math.abs(lng - markerCoordinates.lng) < 0.0001) {
                    setSpecificEventVisible(event);
                }
            }
        }
    };// Funzione che compare le coordinate dell'evento con quelle del marker selezionato per mostrarne i dettagli in caso di successo

    const handlePanel = ()=>{
        if (panelEventVisible) {
            setPanelEventVisible(false);
        } else {
            setPanelEventVisible(true);
            setPanelInfoVisible(false)
        }
    }

    return (
        <div className="info-panel">
            <button className={`info-button-event ${panelEventVisible ? "selected" : ""}`} onClick={() => handlePanel()}><img
                src={require("../../../resources/icons8-event-50.png")} alt="info" className="infoEvent-icon"/></button>
            {panelEventVisible &&
                (
                    <div className={`custom-panel-event-${specificEventVisible ? specificEventVisible.tipo: ""}`}>
                        {error ? (
                            <div className="no-info-message">
                                <img src={require("../../../resources/icons8-info-50 (1).png")} alt="info" className="info-icon"/>
                                Informazioni non disponibili
                            </div>
                        ) : (
                            <div className="content">
                                {specificEventVisible ? (
                                    <SpecificEvent
                                        evento={specificEventVisible} setSpecificEventVisible={setSpecificEventVisible}
                                        savedEvents={savedEvents} setChangedSaved={setChangedSaved} username={username}
                                    />
                                ) : (
                                    allDataVisible &&
                                    data.map((event, index) => (
                                        <EventItem
                                            key={index}
                                            evento={event} setSpecificEventVisible={setSpecificEventVisible}
                                            savedEvents={savedEvents} setChangedSaved={setChangedSaved} username={username}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>)}
        </div>
    )
}
export default InfoEventPanel
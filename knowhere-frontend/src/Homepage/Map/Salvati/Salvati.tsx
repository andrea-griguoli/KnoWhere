import './Salvati.css'
import React, {useState} from 'react';
import {Evento, SalvatiI} from "../../InterfaceUtilities";
import {LngLatBounds} from "@maptiler/sdk";
import SavedItem from "./SavedItem/SavedItem";

const Salvati: React.FC<SalvatiI> = ({apiKey, setSavedVisible, username,
                                         locations, events, changed,
                                         setBounds, setCity}) => {


    changed(prev => !prev)
    const handleOverlayClick = (e: any) => {
        if (e.target.classList.contains('overlay-saved')) {
            setSavedVisible(false);
        }
    };

    const fetchToRemouve = async (luogo: any) =>{
        fetch(`http://localhost:8080/home/saved_locations/delete?email=${encodeURIComponent(username)}&luogo=${encodeURIComponent(luogo)}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    changed(prev => !prev)
                    console.log("Evento eliminato con successo!");
                } else {
                    console.error("Errore durante l'eliminazione dell'evento");
                }
            })
    }
    const handleLabel = async (location: any) => {
        setSavedVisible(false);
        const bounds = await getCoordinatesFromCity(location)
        if (bounds) {
            const {lat, lon} = bounds;
            console.log(bounds)
            setBounds(new LngLatBounds([lon - 0.05, lat - 0.05], [lon + 0.05, lat + 0.05]))
            setCity(location)
        }

    }
    const getCoordinatesFromCity = async (city: string): Promise<{ lat: number, lon: number } | null> => {
        try {
            const response = await fetch(`https://api.maptiler.com/geocoding/${encodeURIComponent(city)}.json?key=${apiKey}`);
            const data = await response.json();
            if (data.features[0].center) {
                console.log(data)
                return {
                    lon: data.features[0].center[0],
                    lat: data.features[0].center[1]
                };


            }
            return null; // In caso non trovi la città
        } catch (error) {
            console.error('Errore nel geocoding:', error);
            return null;
        }
    }

    const fetchToRemouveEvent = async (event: any) =>{
        fetch(`http://localhost:8080/home/saved_events/delete?email=${encodeURIComponent(username)}&id=${encodeURIComponent(event)}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log("Evento eliminato con successo!");
                    changed(prev => !prev)
                } else {
                    console.error("Errore durante l'eliminazione dell'evento");
                }
            })
    }

    return (
        <>
            <div className="overlay-saved" onClick={handleOverlayClick}>
                <div className="panel-saved" onClick={(e) => e.stopPropagation()}>
                    <div className="saved-content">
                        {/* Colonna di sinistra: Locations salvate */}
                        <div className="saved-locations">
                            <h3>Luoghi Salvati</h3>
                            <div className="locations-container">
                                {locations.map((location, index) => (
                                    <label key={index} className="location-button" onClick={()=>handleLabel(location)}>
                                        <span>{location}</span>
                                            <img
                                                src={require("../../../resources/icons8-favourite-30.png")}
                                                alt="Logo"
                                                className="location-logo"
                                                onClick={(e) => {e.stopPropagation();fetchToRemouve(location)}}
                                            />
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Linea verticale divisoria */}
                        <div className="vertical-divider"></div>

                        {/* Colonna di destra: Eventi salvati */}
                        <div className="saved-events">
                            <h3>Eventi Salvati</h3>
                            <ul className="saved-items-list">
                                {events.map((event, index) => (
                                    <li key={index} className="saved-items-container">
                                        <SavedItem
                                            evento={event}
                                            username={username}
                                        />
                                        <img
                                            src={require("../../../resources/icons8-trash-24.png")}
                                            alt="Logo"
                                            className="trash-logo"
                                            onClick={() => {
                                                fetchToRemouveEvent(event.id)
                                            }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}
export default Salvati
import './Homepage.css'
import React, {FC, useState} from "react";
import Navbar from './Navbar/Navbar'
import Map from "./Map/Map";
import {useLocation} from "react-router-dom";
import {LngLatBoundsLike} from "@maptiler/sdk";

const Homepage=() => {
    const location = useLocation();
    const { username } = location.state || {}; // Recupera l'utente dallo stato
    const apiKey = 'UEwyckKmBoS4IxqPEGT1'; // Chiave API MapTiler
    const [bounds, setBounds] = useState<LngLatBoundsLike | null| undefined>(null)
    const [city, setCity] = useState('');
    const [createFormVisible, setCreateFormVisible] = useState(false)
    const [savedVisible, setSavedVisible] = useState(false)

    return (
        <div className="homepage-wrapper">
            <div className="navbar-wrapper">
                <Navbar username={username} apiKey={apiKey} setBounds={setBounds} city={city} setCity={setCity}
                        setCreateFormVisible={setCreateFormVisible} setSavedVisible={setSavedVisible}></Navbar>
            </div>
            <div className="map-wrapper">
                <Map apiKey={apiKey} bounds={bounds} city={city} setBounds={setBounds} setCity={setCity} setCreateFormVisible={setCreateFormVisible}
                     createFormVisible={createFormVisible} setSavedVisible={setSavedVisible} savedVisible={savedVisible} username={username}></Map>
            </div>
        </div>
    );
};
export default Homepage
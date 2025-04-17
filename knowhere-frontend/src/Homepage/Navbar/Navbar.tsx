import './Navbar.css'
import React, {useEffect, useRef, useState} from "react";
import {GeocodingResponse, NavbarI} from "../InterfaceUtilities";


const Navbar: React.FC<NavbarI> = ({username, apiKey, setBounds,
                                       city, setCity,
                                       setCreateFormVisible, setSavedVisible}) => {
    const initial = username ? username.charAt(0).toUpperCase() : '';
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
    const searchRef = useRef<HTMLDivElement | null>(null);
    const [savedLocations, setSavedLocations] = useState<string[]>([])


    const handleDocumentClick = (e: MouseEvent) => {
        // Verifica se il clic è dentro il searchRef o il suo contenuto
        if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
            setIsSuggestionsVisible(false); // Nascondi suggerimenti
        }
    };
    document.addEventListener('click', handleDocumentClick);
    const searchCity = async (suggestion: string) => {
        try {
            setSuggestions([])
            const response = await fetch(`https://api.maptiler.com/geocoding/${suggestion}.json?key=${apiKey}`);
            const data = await response.json();

            if (data && data.features && data.features.length > 0) {
                const { bbox} = data.features[0]; // Ottieni le coordinate dal primo risultato
                setCity(data.features[0].place_name)
                setBounds(bbox); // Imposta i bounds per fitBounds
            } else {
                alert("City not found.");
            }

        } catch (error) {
            console.error("Error fetching geocoding data:", error);
        }
    };// Funzione che regola la barra di ricerca impostando la mappa e la nuova città cercata
    const fetchSuggestions = async (input: string) => {
        try {
            const response = await fetch(`https://api.maptiler.com/geocoding/${input}.json?key=${apiKey}`);
            const data: GeocodingResponse = await response.json(); // Tipizza la risposta

            if (data && data.features) {
                setSuggestions(data.features.map(feature => feature.place_name)); // Aggiorna i suggerimenti
            }
        } catch (error) {
            console.error('Error fetching geocoding suggestions:', error);
        }
    }; // Funzione che gestisce i suggerimenti della barra di ricerca

    // {--- Ascoltatori dei bottoni/componenti }
    const handleSuggestionClick = (suggestion: string) => {
        setCity(suggestion);
        searchCity(suggestion);
        setSuggestions([]); // Rimuovi i suggerimenti dopo la selezione
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setCity(input);

        if (input.length > 2) {
            fetchSuggestions(input);
            setIsSuggestionsVisible(true); // Mostra i suggerimenti
        } else {
            setSuggestions([]);
            setIsSuggestionsVisible(false); // Nascondi i suggerimenti
        }
    };

    const fetchSaved = async () => {
        try {
            let response = await fetch(`http://localhost:8080/home/saved_locations/${username}`);
            let data = await response.json();

            if (data && data.length > 0) {
                const locations = data.map((item: { luogo: any; }) => item.luogo);
                setSavedLocations(locations);
            } else {
                setSavedLocations([])
                console.log("Non ci sono luoghi salvati")
            }
        }catch(error){
            console.error('Error fetching geocoding suggestions:', error);
        }
    }
    const handleDiscover = () => {
        fetchSaved();
        const cities = ["New York", "Tokyo", "London", "Paris", "Berlin", "Sydney", "Moscow", "Dubai", "Toronto", "Beijing"];
        let randomCity;
        do {
            randomCity = cities[Math.floor(Math.random() * cities.length)];
        } while (savedLocations.includes(randomCity));
        searchCity(randomCity);
    };


    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={require("../../resources/logo1.png")} alt="Logo" className="logo"/>
                </div>
                <div className="navbar-search">
                    <input type="text" value={city} placeholder="Nazione, regione, città..." onChange={handleInputChange}
                           onFocus={(e)=>{e.target.select()}}/>
                    <button className="search-button" onClick={()=>searchCity(city)}>Cerca
                        <img src={require("../../resources/icons8-search-30 (1).png")} alt="plus" className="search-icon"/>
                    </button>
                    {/* Suggerimenti per l'autocompletamento */}
                    {suggestions.length > 0 && isSuggestionsVisible && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={(e) => handleSuggestionClick(suggestion)}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="navbar-buttons">
                    <button className="discover-button" onClick={()=>handleDiscover()}>Scopri
                        <img src={require("../../resources/icons8-discover-50.png")} alt="plus"
                             className="discover-icon"/>
                    </button>
                    <button className="bookmark-button" onClick={()=>setSavedVisible(prev => !prev)}>salvati
                        <img src={require("../../resources/icons8-bookmark-48 (1).png")} alt="plus"
                             className="bookmark-icon"/>
                    </button>
                    <button className="create-button" onClick={()=>setCreateFormVisible(true)}>Crea
                        <img src={require("../../resources/icons8-plus-24.png")} alt="plus" className="plus-icon"/>
                    </button>
                </div>
                <div className="icons">
                    <img src={require("../../resources/icons8-help-100.png")} alt="plus" className="help-icon"/>
                    <img src={require("../../resources/icons8-settings-100.png")} alt="plus" className="settings-icon"/>
                </div>
                <button className="account-button">
                    {initial}
                </button>
            </nav>
        </div>
    );
};

export default Navbar


import './Map.css';
import React, {useEffect, useRef, useState} from "react";
import * as maptilersdk from '@maptiler/sdk'; // Importa MapTiler SDK
import {LngLatBounds} from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import {Evento, MapI} from "../InterfaceUtilities";
import InfoPanel from "./InfoPanel/InfoPanel";
import StoriaCucinaCultura from "./Storia-cucina-cultura/Storia-cucina-cultura";
import Eventi from "./Eventi/Eventi";
import Crea from "./Crea/Crea";
import eventi from "./Eventi/Eventi"; // Importa il CSS di MapTiler SDK
import maplibregl from 'maplibre-gl';
import InfoEventPanel from "./InfoEventPanel/InfoEventPanel";
import Salvati from "./Salvati/Salvati";
import Favourite from "./Favourite/Favourite";

const Map: React.FC<MapI> = ({apiKey, bounds, city, setBounds,
                                 setCity, setCreateFormVisible,
                                 createFormVisible, setSavedVisible, savedVisible, username}) => {
    
    // { --- Variabili della mappa --- }
    const mapContainer = useRef<HTMLDivElement | null>(null); // Riferimento al contenitore della mappa
    const zoom = 2; // Livello di zoom iniziale
    const [map, setMap] = useState<maptilersdk.Map | null>(null);
    const geolocateControlRef = useRef<maplibregl.GeolocateControl | null>(null);

    // --- gestisce la visibilità di tutti gli elementi sopra la mappa
    const [mapOverlaysVisible, setMapOverlaysVisible] = useState(false)

    // --- gestisce la visibilità degli del pannello degli eventi in alto a sinistra (filtri)
    const [allEventsVisible, setAllEventsVisible] = useState(false)

    // { --- Variabili della pannello in basso a sinistra (componente: Storia-cucina-cultura) --- }
    const [storiaVisible, setStoriaVisible] = useState(false);
    const [cucinaVisible, setCucinaVisible] = useState(false);
    const [culturaVisible, setCulturaVisible] = useState(true);

    // { --- Variabili dei pannelli informativi (componenti: InfoEventPanel e InfoPanel) --- }
    const [InfoPanelVisible, setInfoPanelVisible] = useState(true);
    const [panelEventVisible, setPanelEventVisible] = useState(false);

    // { --- Variabili del pannello in alto a sinistra (componente: Eventi) --- }
    const [cucinaIcon, setCucinaIcon] = useState(false)
    const [musicaIcon, setMusicaIcon] = useState(false)
    const [museiIcon, setMuseiIcon] = useState(false)
    const [videoIcon, setVideoIcon] = useState(false)
    const [tecnoIcon, setTecnoIcon] = useState(false)
    const [cineIcon, setCineIcon] = useState(false)

    // { --- Variabili di gestione dei marker --- }
    const markersMap: { [key: string]: maplibregl.Marker[] } = {}; //mappa sovrascrivibile che associa il tipo di evento ad una serie di marker
    const [markersByType, setMarkersByType] = useState<{ [key: string]: maplibregl.Marker[] }>({}); // variabile di stato che aggiorna la mappa definitiva di tipo-evento
    const [activeMarker, setActiveMarker] = useState<null | maptilersdk.Marker>(null); // variabile che indica il marker attivo in quel momento

    // { --- Variabili di gestione degli eventi presi dal DB --- }
    const [events, setEvents] = useState<Evento[]>([]); 
    const [filteredEvents, setFilteredEvents] = useState<Evento[]>([]);

    // { --- Variabili di gestione degli elementi salvati dall'utente --- }
    const [savedLocations, setSavedLocations] = useState<string[]>([])
    const [savedEvents, setSavedEvents] = useState([])
    const [changedSaved, setChangedSaved] = useState(false)
    const [isFavaourite, setIsFavaourite] = useState(false)

    useEffect(() => {
        fetchSaved()
    }, [changedSaved, isFavaourite]);// Aggiorna gli eventi e i luoghi salvati dall'utente
    useEffect(() => {
        if (bounds && map) {
            map.fitBounds(bounds, {padding: 80})
            setMapOverlaysVisible(true);
        }

    }, [bounds]); // Imposta i bordi della mappa per la visualizzazione completa delle aree cercate
    useEffect(() => {
        if(city.includes(',')) {
            fetchEvents(city.substring(0, city.indexOf(',')));
        }else{
            fetchEvents(city);
        }

    }, [city]); // Viene eseguita una nuova fetch per prendere gli eventi della nuova città
    useEffect(() => {
        fetchSaved()
        if (mapContainer.current && !map) {
            // Inizializza la mappa
            const initializedMap = new maptilersdk.Map({
                container: mapContainer.current, // Contenitore della mappa
                //style: maptilersdk.MapStyle.DATAVIZ.LIGHT,
                style: maptilersdk.MapStyle.VOYAGER,
                //style: maptilersdk.MapStyle.BASIC,
                //style: maptilersdk.MapStyle.BRIGHT,
                center: [12.4964, 41.9028], // Centro iniziale della mappa
                zoom: zoom, // Livello di zoom iniziale
                apiKey: apiKey, // Chiave API MapTiler
                scaleControl: "top-right",
                geolocateControl: true,
            });

            const geolocateControl = new maptilersdk.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                },
                trackUserLocation: true, // Permetti di tracciare la posizione dell'utente
            });
            initializedMap.addControl(geolocateControl); // Aggiungi il controllo alla mappa
            geolocateControlRef.current=geolocateControl
            setMap(initializedMap);
        }
    }, [map]); // Inizializzazione della mappa
    useEffect(() => {
        setFilteredEvents(filterEvents())
    }, [events]); // Al variare degli eventi cambiano le informazioni mostrate dal pannello degli eventi
    useEffect(() => {
        // Gestione dei marker sulla mappa
        if (allEventsVisible) {
            Object.keys(markersByType).forEach(type => toggleMarkersByType(type, false));
            if (cucinaIcon) toggleMarkersByType("cucina", true); else toggleMarkersByType("cucina", false);
            if (musicaIcon) toggleMarkersByType("musica", true); else toggleMarkersByType("musica", false);
            if (museiIcon) toggleMarkersByType("musei", true); else toggleMarkersByType("musei", false);
            if (tecnoIcon) toggleMarkersByType("tecnologia", true); else toggleMarkersByType("tecnologia", false);
            if (cineIcon) toggleMarkersByType("cinema", true); else toggleMarkersByType("cinema", false);
            if (videoIcon) toggleMarkersByType("videogiochi", true); else toggleMarkersByType("videogiochi", false);
        } else {
            Object.keys(markersByType).forEach(type => toggleMarkersByType(type, true));
        }

        // Aggiorna lo stato di filteredEvents
        setFilteredEvents(filterEvents());
    }, [cucinaIcon, musicaIcon, museiIcon, allEventsVisible, tecnoIcon, videoIcon, cineIcon]); // Al variare dei filtri fatti sugli eventi vengono mostrati i diversi marker associati
    useEffect(() => {
        if(savedLocations.includes(city)){
            setIsFavaourite(true);
        }
    }, [city]);
    const handleContinentClick = (continentClicked: string) => {
        let bounds;
        Object.keys(markersByType).forEach(type => toggleMarkersByType(type, false));

        switch (continentClicked) {
            case 'Africa':
                bounds = new LngLatBounds(
                    [-25.360550934810675, -34.82199796189676],
                    [63.495756269009945, 37.34040707849451]
                );
                break;
            case 'Asia':
                bounds = new LngLatBounds(
                    [25.665831248777494, -10.929652958694387],
                    [-169.69166102259445, 81.29054820124954]
                );
                break;
            case 'Europe':
                bounds = new LngLatBounds(
                    [-25.0, 35.0], // Sud-ovest: Longitudine a -25 (ovest) e Latitudine a 35 (sud)
                    [60.0, 60.0]   // Nord-est: Longitudine a 40 (est) e Latitudine a 70 (nord)
                );
                break;
            case 'North America':
                bounds = new LngLatBounds(
                    [172.47871826736892, 7.206112072299229],
                    [-11.46188917688707, 83.62360016229165]
                );
                break;
            case 'South America':
                bounds = new LngLatBounds(
                    [-91.66389298662307, -55.90223003249923],
                    [-34.792919840898435, 12.590272015917277]
                );
                break;
            case 'Oceania':
                bounds = new LngLatBounds(
                    [80.81749124881226, -50.5780528868124],
                    [-140.21778093270478, 8.221517161803614]
                );
                break;
            default:
                break;
        }
        setBounds(bounds)

    };// Funzione che gestisce lo spostamento sulla mappa tramite i bottoni sui continenti
    const handleGeolocate = () => {
        if (geolocateControlRef.current) {
            geolocateControlRef.current.trigger(); // Avvia la geolocalizzazione


            geolocateControlRef.current.on('geolocate', async (e) => {
                const { latitude, longitude } = e.coords;
                try {
                    const cityName = await reverseGeocode(latitude, longitude);
                    if (cityName) {
                        setCity(cityName+",")
                    }
                } catch (error) {
                    console.error('Errore durante il reverse geocoding:', error);
                }
            });
        }
        setMapOverlaysVisible(true);
    };// Funzione che aggiorna la mappa basata sulla geolocalizzazione dell'utente
    async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
        const response = await fetch(`https://api.maptiler.com/geocoding/${lon},${lat}.json?key=${apiKey}`);
        const data = await response.json();

        if (data && data.features && data.features.length > 0) {
            return data.features[0].context[3].text_it
        }
        return null;
    } // Funzione che restituisce una città partendo da lat e lon
    const getCoordinatesFromCity = async (city: string): Promise<{ lat: number, lon: number } | null> => {
        try {
            const response = await fetch(`https://api.maptiler.com/geocoding/${encodeURIComponent(city)}.json?key=${apiKey}`);
            const data = await response.json();
            if (data.features[0].center) {
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
    }// Funzione che restituisce lat e lon partendo da una città
    const setMarkerAttributes = (marker: maplibregl.Marker)=> {

        let currentActiveMarker: maplibregl.Marker | null = null;
        const markerElement = marker.getElement();

        markerElement.addEventListener('mouseenter', () => {
            if (!markerElement.style.transform.includes('scale(1.3)')) {
                markerElement.style.transform += ' scale(1.3)';
            }
        });

        markerElement.addEventListener('mouseleave', () => {
            if (currentActiveMarker !== marker) {
                markerElement.style.transform = markerElement.style.transform.replace(' scale(1.3)', '');
            }
        });

        markerElement.addEventListener('click', () => {
            if (currentActiveMarker && currentActiveMarker !== marker) {
                const prevElement = currentActiveMarker.getElement();
                prevElement.style.transform = prevElement.style.transform.replace(' scale(1.3)', '');
            }

            if (currentActiveMarker !== marker) {
                currentActiveMarker = marker;
                const currentTransform = markerElement.style.transform || '';
                if (!currentTransform.includes('scale(1.3)')) {
                    markerElement.style.transform = `${currentTransform} scale(1.3)`;
                }
            } else {
                markerElement.style.transform = markerElement.style.transform.replace(' scale(1.3)', '');
                currentActiveMarker = null;
            }

            setActiveMarker(currentActiveMarker);
        });
    } // Funzione che aggiunge gli ascoltatori ai marker sulla mappa
    const toggleMarkersByType = (type: string, visible: boolean) => {
        if (markersByType[type] && map) {
            markersByType[type].forEach(marker => {
                if (visible) {
                    marker.addTo(map);
                } else {
                    marker.remove();
                }
            });
        }
    };// Funzione che aggiunge e rimuove i marker in base ai filtri impostati
    const filterEvents = () => {
        const activeTypes: string[] = [];
        if (cucinaIcon) activeTypes.push("cucina");
        if (musicaIcon) activeTypes.push("musica");
        if (museiIcon) activeTypes.push("musei");
        if (tecnoIcon) activeTypes.push("tecnologia");
        if (cineIcon) activeTypes.push("cinema");
        if (videoIcon) activeTypes.push("videogiochi");

        if (activeTypes.length > 0) {
            // Filtra gli eventi in base ai tipi attivi
            return events.filter(event => activeTypes.includes(event.tipo));
        } else {
            // Se nessun'icona è attiva, restituisci tutti gli eventi
            return events;
        }
    };// Funzione che filtra i dati in base ai filtri impostati 
    const loadMarkers= async (data:any) => {
        for (const event of data) {
            const coord = await getCoordinatesFromCity(event.location);

            if (coord && map) {
                const { lat, lon } = coord;

                let color;
                switch (event.tipo) {
                    case "musica":
                        color = "#22E303";
                        break;
                    case "musei":
                        color = "#BD9402";
                        break;
                    case "cucina":
                        color = "#BD0202";
                        break;
                    case "tecnologia":
                        color = "#FF6800FF";
                        break;
                    case "videogiochi":
                        color = "#00ffe1";
                        break;
                    case "cinema":
                        color = "#de00ff";
                        break;
                    case "altro":
                        color = "#0057FF";
                        break;
                    default:
                        break;
                }

                const marker = new maplibregl.Marker({ color: color, anchor: "center" })
                    .setLngLat([lon, lat])
                    .addTo(map);

                // Aggiungi il marker alla categoria corretta
                setMarkerAttributes(marker);


                if (!markersMap[event.tipo]) {
                    markersMap[event.tipo] = [];
                }
                markersMap[event.tipo].push(marker);
            }
        }
        // Aggiorna lo stato
        setMarkersByType(markersMap);
    };// Funzione che crea i marker e li imposta sulla mappa ad ogni spostamento
    function formatDate(dateString: string): string {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(5, 7);
        const day = dateString.substring(8, 10);

        return `${day}-${month}-${year}`; // Formato: DDMMYYYY
    }
    const fetchEvents = async (city: string) => {
        try {
            Object.keys(markersByType).forEach(type => toggleMarkersByType(type, false));

            const response = await fetch(`http://localhost:8080/home/location/${city}`);
            const data = await response.json();

            if (data && data.length > 0) {
                const formattedData = data.map((evento: Evento) => ({
                    ...evento,
                    date: formatDate(evento.date), // Converte il formato della data
                }));
                setEvents(formattedData);
                loadMarkers(data)
            }else{
                setEvents([])
                console.log("Non ci sono eventi per questa città")
            }
        } catch (error) {
            console.error("Errore nel fetch degli eventi:", error);
        }
    };// Funzione che recupera i dati dal DB
    const fetchSaved = async () => {
        try {
            let response = await fetch(`http://localhost:8080/home/saved_locations/${username}`);
            let data = await response.json();

            if (data && data.length > 0) {
                const locations = data.map((item: { luogo: any; }) => item.luogo);
                setSavedLocations(locations);
            }else{
                setSavedLocations([])
                console.log("Non ci sono luoghi salvati")
            }

            response = await fetch(`http://localhost:8080/home/saved_events/${username}`);
            data = await response.json();

            if (data && data.length > 0) {
                const formattedData = data.map((evento: Evento) => ({
                    ...evento,
                    date: formatDate(evento.date), // Converte il formato della data
                }));
                setSavedEvents(formattedData);
            }else{
                setSavedEvents([])
                console.log("Non ci sono eventi salvati")
            }
        } catch (error) {
            console.error("Errore nel fetch degli eventi:", error);
        }
    }// Recupera i dati salvati dell'utente

    return (
        <div>
            <div> </div>
            {/* Mappa */}
            <div className="map-wrap">
                <div ref={mapContainer} className="map" style={{height: '100vh', width: '100%'}}/>

                <div className="continent-buttons">
                    <button onClick={() => handleContinentClick('Africa')}>
                        Africa <img src={require("../../resources/icons8-globe-50.png")} alt="plus"
                                    className="globe-icon"/>
                    </button>
                    <button onClick={() => handleContinentClick('Asia')}>
                        Asia <img src={require("../../resources/icons8-globe-50.png")} alt="plus"
                                  className="globe-icon"/>
                    </button>
                    <button onClick={() => handleContinentClick('Europe')}>
                        Europa <img src={require("../../resources/icons8-globe-50.png")} alt="plus"
                                    className="globe-icon"/>
                    </button>
                    <button onClick={() => handleContinentClick('North America')}>
                        Nord America<img src={require("../../resources/icons8-globe-50.png")} alt="plus"
                                         className="globe-icon"/>
                    </button>
                    <button onClick={() => handleContinentClick('South America')}>
                        Sud America<img src={require("../../resources/icons8-globe-50.png")} alt="plus"
                                        className="globe-icon"/>
                    </button>
                    <button onClick={() => handleContinentClick('Oceania')}>
                        Oceania <img src={require("../../resources/icons8-globe-50.png")} alt="plus"
                                     className="globe-icon"/>
                    </button>
                    <button onClick={() => handleGeolocate()} className="my-location">
                        Vicino a me <img src={require("../../resources/icons8-my-location-50 (1).png")} alt="plus"
                                         className="globe-icon"/>
                    </button>
                </div>
                {createFormVisible && (<Crea setCreateFormVisible={setCreateFormVisible} apiKey={apiKey}/>)}
                {savedVisible && (<Salvati apiKey={apiKey} setSavedVisible={setSavedVisible} username={username} events={savedEvents}
                                           locations={savedLocations} changed={setChangedSaved} setBounds={setBounds} setCity={setCity}/>)}
                {mapOverlaysVisible && (
                    <>
                        <Eventi musicaIcon={musicaIcon} cucinaIcon={cucinaIcon} museiIcon={museiIcon}
                                setMusicaIcon={setMusicaIcon} setCucinaIcon={setCucinaIcon}
                                setMuseiIcon={setMuseiIcon} allEventsVisible={allEventsVisible}
                                setAllEventsVisible={setAllEventsVisible} data={events}
                                videoIcon={videoIcon} cineIcon={cineIcon} tecnoIcon={tecnoIcon}
                                setCineIcon={setCineIcon} setTecnoIcon={setTecnoIcon}
                                setVideoIcon={setVideoIcon}/>
                        <StoriaCucinaCultura storia={storiaVisible} cucina={cucinaVisible} cultura={culturaVisible}
                                             setStoria={setStoriaVisible} setCucina={setCucinaVisible}
                                             setCultura={setCulturaVisible}/>
                        <InfoPanel city={city} storia={storiaVisible} cucina={cucinaVisible} cultura={culturaVisible}
                                   setPanelVisible={setInfoPanelVisible} panelVisible={InfoPanelVisible}
                                   setPanelEventVisible={setPanelEventVisible}></InfoPanel>
                        <InfoEventPanel data={filteredEvents} panelEventVisible={panelEventVisible}
                                        setPanelInfoVisible={setInfoPanelVisible}
                                        setPanelEventVisible={setPanelEventVisible} activeMarker={activeMarker}
                                        apiKey={apiKey} allMarkers={markersByType} savedEvents={savedEvents}
                                        setChangedSaved={setChangedSaved} username={username}/>

                        <Favourite locations={savedLocations} isFavourite={isFavaourite} username={username} setIsFavourite={setIsFavaourite} city={city} setChangedSaved={setChangedSaved}/>
                    </>
            )}
        </div>
</div>
)
    ;
};

export default Map;


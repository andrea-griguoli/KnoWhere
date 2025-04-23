import React, {useEffect, useState} from "react";
import {EventiI, SccI} from "../../InterfaceUtilities";
import './Eventi.css'


const Eventi: React.FC<EventiI> = ({musicaIcon, cucinaIcon, setCucinaIcon,
                                       setMusicaIcon, setMuseiIcon,
                                       museiIcon, allEventsVisible, setAllEventsVisible,
                                       data, setCineIcon, setTecnoIcon,
                                       tecnoIcon, videoIcon, setVideoIcon,
                                       cineIcon, }) => {

    // { --- Variabili di conteggio degli eventi --- }
    const [cucinaEventCount, setCucinaEventCount] = useState<number>(0);
    const [museiEventCount, setMuseiEventCount] = useState<number>(0);
    const [musicaEventCount, setMusicaEventCount] = useState<number>(0);
    const [videoEventCount, setVideoEventCount] = useState<number>(0);
    const [tecnoEventCount, setTecnoEventCount] = useState<number>(0);
    const [cineEventCount, setCineEventCount] = useState<number>(0);
    const [eventCount, setEventCount] = useState<number>(0)

    useEffect(() => {
        // Supponiamo che 'data' sia l'array di eventi ricevuti dalla fetch
        const cucinaEvents = data.filter((event:any) => event.tipo === "cucina");
        setCucinaEventCount(cucinaEvents.length);  // Imposta il numero di eventi di tipo "cucina"
        const museiEvents = data.filter((event:any) => event.tipo === "musei");
        setMuseiEventCount(museiEvents.length);  // Imposta il numero di eventi di tipo "cucina"
        const musicaEvents = data.filter((event:any) => event.tipo === "musica");
        setMusicaEventCount(musicaEvents.length);  // Imposta il numero di eventi di tipo "cucina"
        const videoEvents = data.filter((event:any) => event.tipo === "videogiochi");
        setVideoEventCount(videoEvents.length);  // Imposta il numero di eventi di tipo "cucina"
        const tecnoEvents = data.filter((event:any) => event.tipo === "tecnologia");
        setTecnoEventCount(tecnoEvents.length);  // Imposta il numero di eventi di tipo "cucina"
        const cineEvents = data.filter((event:any) => event.tipo === "cinema");
        setCineEventCount(cineEvents.length);  // Imposta il numero di eventi di tipo "cucina"
        setEventCount(data.length)
    }, [data]); // Aggiornamento delle variabili di conteggio
    const handleChevron = () =>{
        if(allEventsVisible){
            setAllEventsVisible(false);
            setCucinaIcon(false);
            setMusicaIcon(false);
            setMuseiIcon(false);
            setVideoIcon(false);
            setCineIcon(false);
            setTecnoIcon(false);
        }else{
            setAllEventsVisible(true);
        }
    }

    return (
        <div className="eventi">
            <div className="bottone-all">
                <img src={require("../../../resources/icons8-chevron-down-50.png")} alt="storia"
                     className={`chevron-icon ${allEventsVisible ? 'rotatedback' : 'rotated'}`}
                     onClick={() => handleChevron()}/>
                <button className="eventi-button">
                    {!allEventsVisible ? (<img src={require("../../../resources/bluef.png")} alt="storia"
                                               className="events-icon"/>) :
                        (<img src={require("../../../resources/blu.png")} alt="storia"
                              className="events-icon"/>)} Eventi
                    <span className="event-count">
                        {eventCount}
                    </span>
                </button>
            </div>

            {allEventsVisible && (
                <div className="eventi-container">
                    <button className="cucina-button">
                        {cucinaIcon ? (<img src={require("../../../resources/redf.png")} alt="storia"
                                            className="events-icon"
                                            onClick={() => setCucinaIcon(prev => !prev)}/>) :
                            (<img src={require("../../../resources/red.png")} alt="storia"
                                  className="events-icon"
                                  onClick={() => setCucinaIcon(prev => !prev)}/>)} Cucina
                        <span className="event-count">
                {cucinaEventCount}
            </span>
                    </button>
                    <button className="musica-button">
                        {musicaIcon ? (<img src={require("../../../resources/greenf.png")} alt="storia"
                                            className="events-icon"
                                            onClick={() => setMusicaIcon(prev => !prev)}/>) :
                            (<img src={require("../../../resources/green.png")} alt="storia"
                                  className="events-icon"
                                  onClick={() => setMusicaIcon(prev => !prev)}/>)} Musica
                        <span className="event-count">
                {musicaEventCount}
            </span>
                    </button>
                    <button className="musei-button">
                        {museiIcon ? (<img src={require("../../../resources/yellowf.png")} alt="storia"
                                           className="events-icon"
                                           onClick={() => setMuseiIcon(prev => !prev)}/>) :
                            (<img src={require("../../../resources/yellow.png")} alt="storia"
                                  className="events-icon" onClick={() => setMuseiIcon(prev => !prev)}/>)} Musei
                        <span className="event-count">
                {museiEventCount}
            </span>
                    </button>
                    <button className="tecnologia-button">
                        {tecnoIcon ? (<img src={require("../../../resources/aranciof.png")} alt="storia"
                                           className="events-icon"
                                           onClick={() => setTecnoIcon(prev => !prev)}/>) :
                            (<img src={require("../../../resources/aranci.png")} alt="storia"
                                  className="events-icon" onClick={() => setTecnoIcon(prev => !prev)}/>)} Tecnologia
                        <span className="event-count">
                {tecnoEventCount}
            </span>
                    </button>
                    <button className="videogiochi-button">
                        {videoIcon ? (<img src={require("../../../resources/celestef.png")} alt="storia"
                                           className="events-icon"
                                           onClick={() => setVideoIcon(prev => !prev)}/>) :
                            (<img src={require("../../../resources/celeste.png")} alt="storia"
                                  className="events-icon" onClick={() => setVideoIcon(prev => !prev)}/>)} Videogiochi
                        <span className="event-count">
                {videoEventCount}
            </span>
                    </button>
                    <button className="cinema-button">
                        {cineIcon ? (<img src={require("../../../resources/violaf.png")} alt="storia"
                                           className="events-icon"
                                           onClick={() => setCineIcon(prev => !prev)}/>) :
                            (<img src={require("../../../resources/viola.png")} alt="storia"
                                  className="events-icon" onClick={() => setCineIcon(prev => !prev)}/>)} Cinema
                        <span className="event-count">
                {cineEventCount}
            </span>
                    </button>
                </div>
            )}
        </div>
    )

}

export default Eventi
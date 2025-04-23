import './InfoPanel.css'
import React, {useEffect, useRef, useState} from "react";
import {InfoPanelI} from "../../InterfaceUtilities";

const InfoPanel: React.FC<InfoPanelI> = ({city, storia, cultura, cucina,
                                             panelVisible, setPanelVisible, setPanelEventVisible}) => {

    const panelContentRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState<string>('');
    const [search, setSearch] = useState<string>('')
    const [error, setError] = useState<boolean>(false);
    const [background, setBackground] = useState("../../../resources/cultura.jpg");

    useEffect(() => {
        if(storia) {setSearch("Cenni storici");setBackground("storia");}
        else if(cucina) {setSearch("Dove mangiare");setBackground("cucina");}
        else {setSearch("Da sapere");setBackground("cultura");}
        if (panelContentRef.current) {
            panelContentRef.current.scrollTop = 0; // Riporta lo scroll all'inizio
        }
    }, [storia, cultura, cucina, city]);// Aggiorna il topic da cercare e riporta il pannello all'inizio del testo
    useEffect(() => {
        if(city.includes(',')) {
            fetchSection(city.substring(0, city.indexOf(',')), search); // Recupera la sezione "search" per la città selezionata
        }
        fetchSection(city, search); // Recupera la sezione "search" per la Nazione selezionata
    }, [city, search]);// Aggiorna la sezione da mostrare
    const fetchSection = async (city: string, search: string) => {
        try {
            // Chiamata API per ottenere l'ID delle sezioni
            const sectionsResponse = await fetch(`https://it.wikivoyage.org/w/api.php?action=parse&page=${city}&prop=sections&format=json&origin=*`);
            const sectionsData = await sectionsResponse.json();

            if (sectionsData.parse && sectionsData.parse.sections) {
                setError(false)
                // trova le seioni richieste, se la ricerca è una nazione allora sotituisce "dove mangiare" con "a tavola"
                let sectionResult = sectionsData.parse.sections.find((section: any) => section.line === search);
                if(!sectionResult) sectionResult=sectionsData.parse.sections.find((section: any) => section.line === "A tavola");

                if (sectionResult) {
                    // Se la sezione è presente, ottieni il contenuto della sezione
                    const contentResponse = await fetch(`https://it.wikivoyage.org/w/api.php?action=parse&page=${city}&section=${sectionResult.index}&prop=text&format=json&origin=*`);
                    const contentData = await contentResponse.json();

                    if (contentData.parse && contentData.parse.text) {
                        const content = contentData.parse.text['*']; // Contenuto HTML della sezione
                        const parser = new DOMParser();
                        const doc=parser.parseFromString(content, 'text/html')
                        let rem;
                        if(search!=='Cenni storici')  rem= doc.querySelector('.mw-heading.mw-heading2')
                        else rem = doc.querySelector('.mw-heading.mw-heading3')
                        if (rem) {
                            rem.remove()
                        }
                        // Nella sezione "da sapere" elimino la parte dei "cenni storici"
                        if(search==='Da sapere'){
                            const sec= doc.querySelector('h3#Cenni_storici')
                            if(sec) {
                                rem = sec.closest('div')
                                if(rem) rem.remove()
                            }
                        }
                        // Rimuovo tutte le "[modifica]" del documento
                        const editSections = doc.querySelectorAll('.mw-editsection');
                        editSections.forEach((element) => {
                            element.remove(); // Rimuove ogni elemento con la classe "mw-editsection"
                        });

                        let updateContent = doc.body.innerHTML;
                        setContent(updateContent);
                    }else{
                        setError(true)
                    }
                }else{
                    setError(true);
                }
            }
        } catch (err) {
            setError(true);
            console.log(err)

        }

    };// Funzione che esegue una fetch dal sito WikiVoyage e cerca le informazioni su una città che verrano poi gestite in modo da mostare solo quelle volute
    function handlePanel() {
        if (panelVisible) {
            setPanelVisible(false);
        } else {
            setPanelVisible(true);
            setPanelEventVisible(false)
        }
    }

    return (
        <div className="info-panel">
            <button className={`info-button ${panelVisible ? "selected-button" : ""}`} onClick={() => handlePanel()}>
                <img src={require("../../../resources/icons8-info-50.png")} alt="info" className="info-icon"/>
            </button>
            {panelVisible &&
                (
                <div className="custom-panel-info">
                    <div className={`title-info-${background}`} >
                        <span>{search}</span>
                    </div>
                    {error ? (
                        <div className="no-info-message-info">
                            <img src={require("../../../resources/icons8-info-50 (1).png")} alt="info" className="info-icon"/>
                            Informazioni non disponibili
                        </div>
                    ) : (
                        <div className="content" dangerouslySetInnerHTML={{__html: content }} ref={panelContentRef}/>
                    )}
                </div>)}
        </div>
        )}

export default InfoPanel;
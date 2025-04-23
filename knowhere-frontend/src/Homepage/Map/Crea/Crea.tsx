import './Crea.css'
import {CreaI, GeocodingResponse} from "../../InterfaceUtilities";
import React, {useState} from 'react';

const Crea: React.FC<CreaI> = ({setCreateFormVisible, apiKey}) =>{

    const [img, setImage] = useState<null| string>(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [ora, setOra] = useState<string>('');
    const [partecipanti, setPartecipanti] = useState<number>(0);
    const [tipo, setTipo] = useState('altro')
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [cittaPrincipale, setCittaPrincipale] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Previene il refresh della pagina

        // Raccolta dei dati dal form
        const formData = {
            name,
            date,
            ora,
            location,
            partecipanti,
            tipo,
            description,
            cittaPrincipale,
            img,
        };

        try {
            const response = await fetch('http://localhost:8080/home', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Errore nella richiesta: ${response.status}`);
            }
            setCreateFormVisible(false)

        } catch (error) {
            console.error('Errore durante la fetch:', error);
            alert('Errore durante l\'invio dei dati.');
        }
    }; // Funzione che gestisce l'invio del form al DB
    // Funzione per chiudere il pannello cliccando sullo sfondo
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
    }; // Funzione che mostra i suggerimenti nel form di input
    function extractCity(input: string): string | null {
        // Utilizza una regex per estrarre la parte tra le virgole e rimuovere numeri e spazi non necessari
        const regex = /.*,([^,]+),.*$/;
        const match = input.match(regex);

        if (match) {
            // Rimuove numeri e spazi extra prima della città
            const city = match[1].replace(/^\s*\d+\s*/g, '').trim();
            return city || null;  // Restituisce la città, o null se non trovata
        } else {
            return null;  // Restituisce null se la stringa non contiene due virgole
        }
    } // Funzione che prende dal form di input della location la città dell'evento
    const handleSuggestionClick = (suggestion: string) => {
        setLocation(suggestion)
        const main=extractCity(suggestion)
        if(main) setCittaPrincipale(main)
        setSuggestions([]); // Rimuovi i suggerimenti dopo la selezione
    };
    const handleOverlayClick = (e: any) => {
        if (e.target.classList.contains('overlay-create')) {
            setCreateFormVisible(false);
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (input.length > 2) {
            fetchSuggestions(input);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <>
            <div className="overlay-create" onClick={handleOverlayClick}>
                <h2>Crea il tuo evento</h2>
                <div className="panel-create" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setCreateFormVisible(false)} className="close-button">X</button>

                    <div className="form-container">
                        {/* Parte sinistra: selezione immagine */}
                        <div className="image-upload">
                            <h3>Seleziona Immagine</h3>
                            <input type="file"
                                   onChange={(e) => {
                                       if (e.target.files && e.target.files[0]) {
                                           const selectedFile = e.target.files[0];
                                           const reader = new FileReader();
                                           const nameFile = selectedFile.name as string;

                                           reader.onload = (event) => {
                                               if (event.target) {
                                                   const imageURL = "/" + nameFile;
                                                   setImage(imageURL);
                                               }
                                           };
                                           reader.readAsDataURL(selectedFile);
                                       }
                                   }}
                            />
                            {img && <img src={img} alt="Preview" className="image-preview"/>}
                        </div>

                        {/* Parte destra: informazioni */}
                        <div className="info-form">
                            <form>
                                <div className="form-row">
                                    <div className="form-field">
                                        <label htmlFor="name">Nome</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="date">Data</label>
                                        <input
                                            type="date"
                                            id="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="time">Orario</label>
                                        <input
                                            type="time"
                                            id="time"
                                            value={ora}
                                            onChange={(e) => setOra(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-field-single">
                                        <label htmlFor="location">Luogo</label>
                                        <input
                                            type="text"
                                            id="location"
                                            value={location}
                                            onChange={(e) => (setLocation(e.target.value), handleInputChange(e))}
                                            required
                                        />
                                        {suggestions.length > 0 && (
                                            <ul className="suggestions-list-c">
                                                {suggestions.map((suggestion, index) => (
                                                    <li key={index} onClick={(e) => handleSuggestionClick(suggestion)}>
                                                        {suggestion}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="form-field-part">
                                        <label htmlFor="participants">Partecipanti</label>
                                        <input
                                            type="number"
                                            id="participants"
                                            value={partecipanti}
                                            onChange={(e) => setPartecipanti(Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="form-field-part">
                                        <label htmlFor="tipo">Tipo</label>
                                        <select
                                            id="tipo"
                                            value={tipo}
                                            onChange={(e) => setTipo(e.target.value)}
                                            required
                                        >
                                            <option value="altro">Altro</option>
                                            <option value="cucina">Cucina</option>
                                            <option value="musei">Musei</option>
                                            <option value="musica">Musica</option>
                                            <option value="cucina">Tecnologia</option>
                                            <option value="musei">Videogiochi</option>
                                            <option value="musica">Cinema</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-field-desc">
                                    <label htmlFor="description">Descrizione</label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                            </form>
                            <button type="submit" className="submit-button" onClick={(e)=>handleSubmit(e)}>Salva</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Crea
import React, {useEffect, useState} from 'react';
import './Favourite.css';
import {FavouriteI} from "../../InterfaceUtilities";

const Favourite: React.FC<FavouriteI> = ({ isFavourite, username, locations, setIsFavourite, city, setChangedSaved}) => {
    const [loc, setLoc] = useState<string>("");

    useEffect(() => {
        let location = city.includes(',') ? city.substring(0, city.indexOf(',')) : city;
        setLoc(location);

        if (locations.includes(location)) {
            setIsFavourite(true);
        } else {
            setIsFavourite(false);
        }

    }, [city]);

    const fetchNewFavourite = async (luogo: string) =>{
        const data = {
            utente: username,
            luogo: luogo
        };
        fetch(`http://localhost:8080/home/saved_locations/new`, {
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

    return (
        <>
        {isFavourite ?
            <button className={"info-button-f"}>
                <img
                    src={require("../../../resources/icons8-favourite-30.png")}
                    alt="Logo" className="info-icon"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            </button>
            :
            <button className={"info-button-f"} >
                <img
                    src={require("../../../resources/icons8-favourite-50.png")}
                    alt="Logo" className="info-icon"
                    onClick={(e) => {
                        fetchNewFavourite(loc);
                        setIsFavourite(true);
                    }}
                />
            </button>
        }
        </>
    );
};

export default Favourite;

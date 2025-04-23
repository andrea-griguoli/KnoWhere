import React, {useEffect, useState} from 'react';
import './SavedItem.css';
import {EventItemI, SavedItemI} from "../../../InterfaceUtilities";
import SavedSpecificEvent from "./SavedSpecificEvent/SavedSpecificEvent";

const SavedItem: React.FC<SavedItemI> = ({ evento, username }) => {
    const [viewMore, setViewMore] = useState(false)

    useEffect(() => {

    }, []);

    return (
        <>
        {!viewMore ?
            (
                <div className={`sevent-item-${evento.tipo}`} onClick={() => setViewMore(true)}>
                    <div className="sevent-image">
                        <img src={evento.img} alt={evento.img} className="sevent-photo"/>
                    </div>
                    <div className="sevent-info">
                        <div className="sevent-title-date">
                            <h1 className="sevent-title">{evento.name}</h1>
                        </div>
                        <p className="sevent-date">{evento.date}</p>
                        <span className="sevent-more" onClick={() => setViewMore(true)}>
                        Vedi di più
                        </span>
                    </div>
                </div>
            )
            :
            (
                <SavedSpecificEvent evento={evento} setSpecificEventVisible={setViewMore} username={username} />
            )
        }
        </>
    );
};

export default SavedItem;

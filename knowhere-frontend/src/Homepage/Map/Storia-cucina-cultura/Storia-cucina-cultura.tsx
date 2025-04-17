import React from "react";
import {SccI} from "../../InterfaceUtilities";
import './Storia-cucina-cultura.css'


const StoriaCucinaCultura: React.FC<SccI> = ({storia, cucina, cultura, setStoria, setCultura, setCucina }) => {

    const handleBottomLeftButtons = (type: string) =>{
        switch (type) {
            case ("storia"):
                if(!storia) {setStoria(true); setCucina(false);setCultura(false);}
                break;
            case ("cucina"):
                if(!cucina) {setStoria(false); setCucina(true);setCultura(false);}
                break;
            case ("cultura"):
                if(!cultura) {setStoria(false); setCucina(false);setCultura(true);}
                break;
            default:
                break;
        }
    }

    return (
        <div className="storia-cucina-cult">
            <button className={`sto-button ${storia ? "selecteds" : ""}`}
                    onClick={() => handleBottomLeftButtons("storia")}><img
                src={require("../../../resources/icons8-greek-pillar-base-50.png")}
                alt="storia" className="left-buttons"/> Storia
            </button>
            <button className={`cuc-button ${cucina ? "selectedc" : ""}`}
                    onClick={() => handleBottomLeftButtons("cucina")}><img
                src={require("../../../resources/icons8-restaurant-64.png")}
                alt="storia" className="left-buttons"/> Cucina
            </button>
            <button className={`cul-button ${cultura ? "selectedcu" : ""}`}
                    onClick={() => handleBottomLeftButtons("cultura")}><img
                src={require("../../../resources/icons8-literature-50.png")}
                alt="storia" className="left-buttons"/> Cultura
            </button>
        </div>
    )

}

export default StoriaCucinaCultura
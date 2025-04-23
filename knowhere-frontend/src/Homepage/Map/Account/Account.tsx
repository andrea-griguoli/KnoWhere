import "./Account.css"
import {AccountI} from "../../InterfaceUtilities";
import React from "react";

const Account:React.FC<AccountI> = ({setAccountButton, apiKey}) =>{

    const handleOverlayClick = (e: any) => {
        if (e.target.classList.contains('overlay-account')) {
            setAccountButton(false);
        }
    };

    return (
        <>
            <div className={"overlay-account"} onClick={handleOverlayClick}>
                <div className="panel-account">
                    <div className="row1">
                        <button className="btn evento">I miei eventi</button>
                        <button className="btn impostazioni">Impostazioni</button>
                        <button className="btn aiuto">Aiuto</button>
                    </div>
                    <div className="row2">
                        <button className="btn esci">Esci</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account
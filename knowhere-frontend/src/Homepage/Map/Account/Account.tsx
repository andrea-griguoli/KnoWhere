import "./Account.css"
import {AccountI} from "../../InterfaceUtilities";
import React, {useState} from "react";
import MyEvents from "./Miei Eventi/MyEvents";

const Account:React.FC<AccountI> = ({setAccountButton, apiKey}) =>{

    const [myEvents, setMyEvents] = useState(false)
    const [options, setOptions] = useState(false)
    const [help, setHelp] = useState(false)
    const [exit, setExit] = useState(false)
    const handleOverlayClick = (e: any) => {
        if (e.target.classList.contains('overlay-account')) {
            setAccountButton(false);
        }
    };

    return (
        <>
            <div className={"overlay-account"} onClick={handleOverlayClick}>
                <div className="panel-account">
                    {myEvents && (<MyEvents></MyEvents>)}
                    <div className="row1">
                        <div className={"account-opt"}>
                            <button className="btn evento" onClick={()=>setMyEvents(prev=>prev)}>I miei eventi
                                <img className={"options"} src={require("../../../resources/icons8-my-homework-50.png")}
                                     alt={"MyEvents"}/>
                            </button>
                        </div>
                        <div className={"account-opt"} onClick={()=>setOptions(prev=>prev)}>
                            <button className="btn impostazioni">Impostazioni
                                <img className={"options"} src={require("../../../resources/icons8-settings-100.png")}
                                 alt={"MyEvents"}/>
                            </button>
                        </div>
                        <div className={"account-opt"} onClick={()=>setHelp(prev=>prev)}>
                            <button className="btn aiuto">Aiuto
                            <img className={"options"} src={require("../../../resources/icons8-help-100.png")}
                                 alt={"MyEvents"}/>
                            </button>
                        </div>
                    </div>
                    <div className="row2">
                        <div className={"account-opt"} onClick={()=>setExit(prev=>prev)}>
                            <button className="btn esci">Esci
                                <img className={"options"} src={require("../../../resources/icons8-log-out-60.png")}
                                 alt={"MyEvents"}/>
                            </button>
                        </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default Account
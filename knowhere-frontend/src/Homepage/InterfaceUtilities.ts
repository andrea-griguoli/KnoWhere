import {LngLatBoundsLike} from "@maptiler/sdk";
import * as maptilersdk from "@maptiler/sdk";
import maplibregl from "maplibre-gl";

export interface LoginI {
    isAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface NavbarI{
    username: string;
    apiKey: string;
    setBounds: React.Dispatch<React.SetStateAction<LngLatBoundsLike | null | undefined>>;
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>;
    setCreateFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSavedVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface MapI{
    apiKey: string;
    bounds: LngLatBoundsLike | null | undefined;
    city: string;
    setBounds: React.Dispatch<React.SetStateAction<LngLatBoundsLike | null | undefined>>;
    setCity: React.Dispatch<React.SetStateAction<string>>;
    setCreateFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
    createFormVisible: boolean;
    savedVisible: boolean;
    setSavedVisible: React.Dispatch<React.SetStateAction<boolean>>;
    username: any;
}
export interface Feature {
    place_name: string;
}
export interface GeocodingResponse {
    features: Feature[];
}
export interface InfoPanelI{
    city: string;
    storia: boolean;
    cucina: boolean;
    cultura: boolean;
    panelVisible: boolean;
    setPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setPanelEventVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InfoEventPanelI{
    data: Evento[];
    panelEventVisible: boolean;
    setPanelInfoVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setPanelEventVisible: React.Dispatch<React.SetStateAction<boolean>>;
    activeMarker: maptilersdk.Marker | null;
    apiKey: string;
    allMarkers: { [key: string]: maplibregl.Marker[] };
    savedEvents: Evento[];
    setChangedSaved: React.Dispatch<React.SetStateAction<boolean>>
    username: string;
}
export interface EventItemI {
    evento: Evento;
    setSpecificEventVisible: React.Dispatch<React.SetStateAction<Evento|null>>;
    savedEvents: Evento[];
    setChangedSaved: React.Dispatch<React.SetStateAction<boolean>>
    username: string;
}
export interface SavedItemI {
    evento: Evento;
    username: string;
}

export interface SpecificEventItemI {
    evento: Evento;
    setSpecificEventVisible: React.Dispatch<React.SetStateAction<Evento|null>>;
    savedEvents: Evento[];
    setChangedSaved: React.Dispatch<React.SetStateAction<boolean>>
    username: string;
}
export interface SavedSpecificEventItemI {
    evento: Evento;
    setSpecificEventVisible: React.Dispatch<React.SetStateAction<boolean>>;
    username: string;
}

export interface SccI{
    storia: boolean;
    cucina: boolean;
    cultura: boolean;
    setStoria: React.Dispatch<React.SetStateAction<boolean>>;
    setCucina: React.Dispatch<React.SetStateAction<boolean>>;
    setCultura: React.Dispatch<React.SetStateAction<boolean>>;

}

export interface EventiI{
    musicaIcon: boolean;
    cucinaIcon: boolean;
    museiIcon: boolean;
    setMusicaIcon: React.Dispatch<React.SetStateAction<boolean>>;
    setCucinaIcon: React.Dispatch<React.SetStateAction<boolean>>;
    setMuseiIcon: React.Dispatch<React.SetStateAction<boolean>>;
    videoIcon: boolean;
    tecnoIcon: boolean;
    cineIcon: boolean;
    setVideoIcon: React.Dispatch<React.SetStateAction<boolean>>;
    setTecnoIcon: React.Dispatch<React.SetStateAction<boolean>>;
    setCineIcon: React.Dispatch<React.SetStateAction<boolean>>;
    allEventsVisible: boolean;
    setAllEventsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    data: Evento[];

}
export interface CreaI{
    setCreateFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
    apiKey: string;
}
export interface SalvatiI{
    setSavedVisible: React.Dispatch<React.SetStateAction<boolean>>;
    apiKey: string;
    username: string;
    locations: string[];
    events: Evento[];
    changed: React.Dispatch<React.SetStateAction<boolean>>
    setBounds: React.Dispatch<React.SetStateAction<LngLatBoundsLike | null | undefined>>;
    setCity: React.Dispatch<React.SetStateAction<string>>;
}

export interface Evento {
    id: number;
    name: string;
    location: string;
    description: string;
    date: string;
    ora: string
    tipo: string;
    partecipanti: number;
    citta_principale: string;
    img: string;
}

export interface FavouriteI{
    locations: string[];
    username: string;
    isFavourite: boolean;
    setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>;
    city: string;
    setChangedSaved: React.Dispatch<React.SetStateAction<boolean>>;
}



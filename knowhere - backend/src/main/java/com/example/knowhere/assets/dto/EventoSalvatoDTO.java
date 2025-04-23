package com.example.knowhere.assets.dto;

public class EventoSalvatoDTO {
    private String utente;
    private Long evento;

    public EventoSalvatoDTO() {
    }

    // Getters e setters
    public String getUtente() {
        return utente;
    }

    public void setUtente(String utente) {
        this.utente = utente;
    }

    public Long getEvento() {
        return evento;
    }

    public void setEvento(Long evento) {
        this.evento = evento;
    }

}

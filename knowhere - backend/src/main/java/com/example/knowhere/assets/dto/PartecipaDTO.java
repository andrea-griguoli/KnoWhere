package com.example.knowhere.assets.dto;

public class PartecipaDTO {
    private String utente;
    private Long evento;

    public PartecipaDTO() {
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

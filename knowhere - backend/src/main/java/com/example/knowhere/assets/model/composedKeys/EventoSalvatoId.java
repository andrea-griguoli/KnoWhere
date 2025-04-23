package com.example.knowhere.assets.model.composedKeys;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class EventoSalvatoId implements Serializable {

    @Column(insertable = false, updatable = false)
    private String utente;
    @Column(insertable = false, updatable = false)
    private Long evento;

    // Costruttore predefinito
    public EventoSalvatoId() {
    }

    // Costruttore con argomenti
    public EventoSalvatoId(String utente, Long idEvento) {
        this.utente = utente;
        this.evento = idEvento;
    }

    // Getter e setter
    public String getUtente() {
        return utente;
    }

    public void setUtente(String email) {
        this.utente = email;
    }

    public Long getEvento() {
        return evento;
    }

    public void setEvento(Long evento) {
        this.evento = evento;
    }

    // hashCode e equals (necessari per funzionamento corretto con JPA)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EventoSalvatoId that = (EventoSalvatoId) o;
        return Objects.equals(utente, that.utente) &&
                Objects.equals(evento, that.evento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(utente, evento);
    }
}

package com.example.knowhere.assets.model.composedKeys;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class PartecipaId implements Serializable {

    @Column(insertable = false, updatable = false)
    private String utente;
    private Long evento;

    // Costruttore predefinito
    public PartecipaId() {
    }

    // Costruttore con argomenti
    public PartecipaId(String utente, Long idEvento) {
        this.utente = utente;
        this.evento = idEvento;
    }

    // Getter e setter
    public String getUtente() {
        return utente;
    }

    public void setUtente(String email) {
        this.utente = utente;
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
        PartecipaId that = (PartecipaId) o;
        return Objects.equals(utente, that.utente) &&
                Objects.equals(evento, that.evento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(utente, evento);
    }
}

package com.example.knowhere.assets.model.composedKeys;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class LuogoSalvatoId implements Serializable {

    @Column(insertable = false, updatable = false)
    private String utente;
    private String luogo;

    // Costruttore predefinito
    public LuogoSalvatoId() {
    }

    // Costruttore con argomenti
    public LuogoSalvatoId(String utente, String luogo) {
        this.utente = utente;
        this.luogo = luogo;
    }

    // Getter e setter
    public String getUtente() {
        return utente;
    }

    public void setUtente(String utente) {
        this.utente = utente;
    }
    public String getLuogo() {
        return luogo;
    }
    public void setLuogo(String luogo) {
        this.luogo = luogo;
    }

    // hashCode e equals (necessari per funzionamento corretto con JPA)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LuogoSalvatoId that = (LuogoSalvatoId) o;
        return Objects.equals(utente, that.utente) &&
                Objects.equals(luogo, that.luogo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(utente, luogo);
    }
}

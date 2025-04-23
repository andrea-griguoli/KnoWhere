package com.example.knowhere.assets.model;

import com.example.knowhere.assets.model.composedKeys.PartecipaId;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "partecipa")
public class Partecipa {
    @EmbeddedId
    private PartecipaId id;
    @Column(insertable = false, updatable = false)
    private int evento;

    public void setId(PartecipaId id) {
        this.id=id;
    }

    public int getEvento() {
        return evento;
    }

    public void setEvento(int evento) {
        this.evento = evento;
    }
}

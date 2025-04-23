package com.example.knowhere.assets.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import com.example.knowhere.assets.model.composedKeys.EventoSalvatoId;
@Entity
@Table(name = "evento_salvato")
public class EventoSalvato {

    @EmbeddedId
    private EventoSalvatoId id;

    public EventoSalvato() {}

    public void setId(EventoSalvatoId id) {
        this.id=id;
    }
}

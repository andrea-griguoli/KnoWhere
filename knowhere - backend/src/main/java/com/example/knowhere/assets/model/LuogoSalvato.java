package com.example.knowhere.assets.model;

import com.example.knowhere.assets.model.composedKeys.LuogoSalvatoId;
import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "luogo_salvato")
public class LuogoSalvato {
    @EmbeddedId
    private LuogoSalvatoId id;
    @Column(insertable = false, updatable = false)
    private String luogo;

    public String getLuogo() {
        return luogo;
    }

    public void setLuogo(String luogo) {
        this.luogo = luogo;
    }


    public void setId(LuogoSalvatoId id) {
        this.id=id;
    }
}

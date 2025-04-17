package com.example.knowhere.assets.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity // Indica che questa classe è una tabella del database
public class Evento {

    @Id // Indica la chiave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment della chiave primaria
    private Long id;

    private String name;
    private String location;
    private String description;
    private String date;
    private String tipo;
    private int partecipanti;
    @Column
    @JsonProperty("citta_principale")
    private String cittaPrincipale;
    private String img;
    private String ora;

    public Evento() {} // costruttore vuoto per JPA

    public String getCittaPrincipale() {
        return cittaPrincipale;
    }

    public void setCittaPrincipale(String cittaPrincipale) {
        this.cittaPrincipale = cittaPrincipale;
    }
    public String getOra() {
        return ora;
    }

    public void setOra(String ora) {
        this.ora = ora;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }


    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getPartecipanti() {
        return partecipanti;
    }

    public void setPartecipanti(int partecipanti) {
        this.partecipanti = partecipanti;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}

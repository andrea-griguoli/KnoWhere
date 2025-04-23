package com.example.knowhere.assets.controller;

import com.example.knowhere.assets.dto.PartecipaDTO;
import com.example.knowhere.assets.model.Partecipa;
import com.example.knowhere.assets.model.composedKeys.PartecipaId;
import com.example.knowhere.assets.repository.PartecipaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:3000")
public class PartecipaController {

    @Autowired
    private PartecipaRepository partecipaRepository;

    // Restituisce tutti i luohi salvati dall'utente
    @GetMapping("/join/{id}")
    public Long getPartecipantsById(@PathVariable Long id) {
        return partecipaRepository.countDistinctUtentiByEventoId(id);
    }
    @GetMapping("/join/find/{email}")
    public List<Partecipa> getEventIfUserIsIn(@PathVariable String email) {
        return partecipaRepository.findByIdUtente(email);
    }

    // Crea una entry luogo-utente
    @PostMapping("/join/new")
    public ResponseEntity<String> newMember(@RequestBody PartecipaDTO dto) {
        PartecipaId id = new PartecipaId(dto.getUtente(), dto.getEvento());
        Partecipa partecipa = new Partecipa();
        partecipa.setId(id);
        partecipaRepository.save(partecipa);
        return ResponseEntity.ok("Aggiornamento effettuato con successo!");
    }

    // Elimina un luogo salvato
    @DeleteMapping("/join/delete")
    public String deleteEvent(@RequestParam String email, @RequestParam int id) {
        partecipaRepository.deleteByIdUtenteAndEvento(email, id);
        return "Evento eliminato con successo!";
    }
}

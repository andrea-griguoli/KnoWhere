package com.example.knowhere.assets.controller;

import com.example.knowhere.assets.dto.EventoDTO;
import com.example.knowhere.assets.dto.EventoSalvatoDTO;
import com.example.knowhere.assets.dto.LuogoSalvatoDTO;
import com.example.knowhere.assets.model.Evento;
import com.example.knowhere.assets.model.EventoSalvato;
import com.example.knowhere.assets.model.LuogoSalvato;
import com.example.knowhere.assets.model.composedKeys.EventoSalvatoId;
import com.example.knowhere.assets.model.composedKeys.LuogoSalvatoId;
import com.example.knowhere.assets.repository.EventoSalvatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:3000")
public class EventoSalvatoController {

    @Autowired
    private EventoSalvatoRepository eventoSalvatoRepository;

    // Restituisce tutti i luohi salvati dall'utente
    @GetMapping("/saved_events/{email}")
    public List<Evento> getEventsSavedByUser(@PathVariable String email) {
        return eventoSalvatoRepository.findEventiByIdUtente(email);
    }

    // Crea una entry luogo-utente
    @PostMapping("/saved_events/new")
    public ResponseEntity<String> updateEventoSalvato(@RequestBody EventoSalvatoDTO dto) {
        EventoSalvatoId id = new EventoSalvatoId(dto.getUtente(), dto.getEvento());
        EventoSalvato eventoSalvato = new EventoSalvato();
        eventoSalvato.setId(id);
        eventoSalvatoRepository.save(eventoSalvato);
        return ResponseEntity.ok("Aggiornamento effettuato con successo!");
    }
    // Elimina un luogo salvato
    @DeleteMapping("/saved_events/delete")
    public String deleteEvent(@RequestParam String email, @RequestParam Long id) {
        eventoSalvatoRepository.deleteByIdUtenteAndIdEvento(email, id);
        return "Evento eliminato con successo!";
    }
}

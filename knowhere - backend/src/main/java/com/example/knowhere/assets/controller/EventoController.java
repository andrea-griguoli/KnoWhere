package com.example.knowhere.assets.controller;

import com.example.knowhere.assets.model.Evento;
import com.example.knowhere.assets.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:3000")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;

    // Restituisce tutti gli eventi
    @GetMapping
    public List<Evento> getAllEvents() {
        return eventoRepository.findAll();
    }

    // Restituisce gli eventi per località
    @GetMapping("/location/{cittaPrincipale}")
    public List<Evento> getEventsByCity(@PathVariable String cittaPrincipale) {
            return eventoRepository.findByCittaPrincipale(cittaPrincipale);
    }

    // Crea un nuovo evento
    @PostMapping
    public Evento createEvent(@RequestBody Evento event) {
        return eventoRepository.save(event);
    }

    // Aggiorna un evento esistente
    @PutMapping("/{id}")
    public Evento updateEvent(@PathVariable Long id, @RequestBody Evento eventDetails) {
        Evento event = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento non trovato con id: " + id));

        event.setName(eventDetails.getName());
        event.setLocation(eventDetails.getLocation());
        event.setDescription(eventDetails.getDescription());
        event.setDate(eventDetails.getDate());

        return eventoRepository.save(event);
    }

    // Elimina un evento
    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable Long id) {
        eventoRepository.deleteById(id);
        return "Evento eliminato con successo!";
    }
}

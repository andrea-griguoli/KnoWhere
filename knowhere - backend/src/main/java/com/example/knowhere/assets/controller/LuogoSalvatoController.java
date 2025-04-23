package com.example.knowhere.assets.controller;

import com.example.knowhere.assets.dto.LuogoSalvatoDTO;
import com.example.knowhere.assets.model.LuogoSalvato;
import com.example.knowhere.assets.model.composedKeys.LuogoSalvatoId;
import com.example.knowhere.assets.repository.LuogoSalvatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:3000")
public class LuogoSalvatoController {

    @Autowired
    private LuogoSalvatoRepository luogoSalvatoRepository;

    // Restituisce tutti i luohi salvati dall'utente
    @GetMapping("/saved_locations/{email}")
    public List<LuogoSalvato> getCitySavedByUser(@PathVariable String email) {
        return luogoSalvatoRepository.findByIdUtente(email);
    }
    // Crea una entry luogo-utente
    @PostMapping("/saved_locations/new")
    public ResponseEntity<String> updateLuogoSalvato(@RequestBody LuogoSalvatoDTO dto) {
        LuogoSalvatoId id = new LuogoSalvatoId(dto.getUtente(), dto.getLuogo());
        LuogoSalvato luogoSalvato = new LuogoSalvato();
        luogoSalvato.setId(id);
        luogoSalvatoRepository.save(luogoSalvato);
        return ResponseEntity.ok("Aggiornamento effettuato con successo!");
    }

    // Elimina un luogo salvato
    @DeleteMapping("/saved_locations/delete")
    public String deleteEvent(@RequestParam String email, @RequestParam String luogo) {
        luogoSalvatoRepository.deleteByIdUtenteAndLuogo(email, luogo);
        return "Evento eliminato con successo!";
    }
}

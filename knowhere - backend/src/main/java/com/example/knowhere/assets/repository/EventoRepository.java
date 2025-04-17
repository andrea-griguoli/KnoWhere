package com.example.knowhere.assets.repository;

import com.example.knowhere.assets.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByCittaPrincipale(String cittaPrincipale); // Trova eventi per località
}

package com.example.knowhere.assets.repository;

import com.example.knowhere.assets.model.Evento;
import com.example.knowhere.assets.model.Partecipa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PartecipaRepository extends JpaRepository<Partecipa, Long> {
    List<Partecipa> findByIdUtente(String user); // Trova eventi per località

    @Transactional
    void deleteByIdUtenteAndEvento(String email, int id);
    @Query("SELECT COUNT(DISTINCT p.id.utente) FROM Partecipa p WHERE p.id.evento = :eventoId")
    Long countDistinctUtentiByEventoId(@Param("eventoId") Long eventoId);
}
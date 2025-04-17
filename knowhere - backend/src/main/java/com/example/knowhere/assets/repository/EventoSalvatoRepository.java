package com.example.knowhere.assets.repository;

import com.example.knowhere.assets.dto.EventoDTO;
import com.example.knowhere.assets.model.Evento;
import com.example.knowhere.assets.model.EventoSalvato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface EventoSalvatoRepository extends JpaRepository<EventoSalvato, Long> {
    // Query per trovare tutti gli eventi associati a un utente
    @Query("SELECT e FROM Evento e WHERE e.id IN (SELECT es.id.evento FROM EventoSalvato es WHERE es.id.utente = :utente)")
    List<Evento> findEventiByIdUtente(@Param("utente") String utente);
    @Transactional
    void deleteByIdUtenteAndIdEvento(String email, Long id);
}

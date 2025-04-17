package com.example.knowhere.assets.repository;

import com.example.knowhere.assets.dto.LuogoSalvatoDTO;
import com.example.knowhere.assets.model.LuogoSalvato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LuogoSalvatoRepository extends JpaRepository<LuogoSalvato, String> {

    List<LuogoSalvato> findByIdUtente(String user); // Trova eventi per località

    @Transactional
    void deleteByIdUtenteAndLuogo(String email, String citta);
}

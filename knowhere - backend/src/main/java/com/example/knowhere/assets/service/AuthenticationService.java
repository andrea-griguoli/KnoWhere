package com.example.knowhere.assets.service;

import com.example.knowhere.assets.repository.UserRepository;
import com.example.knowhere.assets.model.Utente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    @Autowired
    public AuthenticationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean authenticate(String email, String password) {
        Optional<Utente> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            Utente utente = userOpt.get();
            // Verifica che la password sia corretta (considera hashing)
            return password.equals(utente.getPassword()); // Usa bcrypt o un altro sistema per sicurezza
        }

        return false;
    }

    @Transactional
    public boolean addUser(String email, String password, String username) {
        Optional<Utente> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            return false;
        }
        Utente newUtente = new Utente();
        newUtente.setEmail(email);
        newUtente.setPassword(password);
        newUtente.setUsername(username);
        userRepository.save(newUtente);
        return true;
    }

    public String getUsernameFromDB(String email){
        return userRepository.findByEmail(email).get().getUsername();
    }
}

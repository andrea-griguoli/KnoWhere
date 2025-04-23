package com.example.knowhere.assets.controller;

import com.example.knowhere.assets.dto.LoginRequest;
import com.example.knowhere.assets.dto.RegistrationRequest;
import com.example.knowhere.assets.model.Utente;
import com.example.knowhere.assets.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final AuthenticationService authenticationService;

    @Autowired
    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = authenticationService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        if (isAuthenticated) {
            return ResponseEntity.ok(Collections.singletonMap("username", authenticationService.getUsernameFromDB(loginRequest.getEmail())));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "Credenziali non valide"));
        }
    }

    @PutMapping("/registration")
    public ResponseEntity<String> Registration(@RequestBody RegistrationRequest regReq) {
        boolean isAdded = authenticationService.addUser(regReq.getEmail(), regReq.getPassword(), regReq.getUsername());

        if (isAdded) {
            return ResponseEntity.ok("Utente registrato con successo!");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Utente già registrato");
        }
    }
}

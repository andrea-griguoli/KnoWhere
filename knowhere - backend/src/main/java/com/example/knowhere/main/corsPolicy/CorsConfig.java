package com.example.knowhere.main.corsPolicy;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // richieste a tutte le rotte
                .allowedOrigins("http://localhost:3000")  //l'URL del front-end
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // metodi consentiti
                .allowedHeaders("*");  // intestazioni
    }
}

package com.springboot.backend.douremember.groundtruth.groundtruth_backend.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.HashMap;
import java.util.Map;

import com.springboot.backend.douremember.groundtruth.groundtruth_backend.repositories.GroundTruthRepository;

@Service
public class GroundTruthServiceImpl implements GroundTruthService {

    private final GroundTruthRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();

    public GroundTruthServiceImpl(GroundTruthRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public void generateGroundTruthTestResponse() {
        String url = "http://localhost:8000/api/ai/v1";

        // Create JSON-like body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("response", "tell me a fun fact about spiders");

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Combine headers and body
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Make POST request
        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        System.out.println("Response from Django: " + response.getBody());
    }
}

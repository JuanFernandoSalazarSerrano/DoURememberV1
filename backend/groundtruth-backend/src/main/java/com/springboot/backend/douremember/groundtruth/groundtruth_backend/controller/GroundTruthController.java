package com.springboot.backend.douremember.groundtruth.groundtruth_backend.controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.douremember.groundtruth.groundtruth_backend.entities.GroundTruthAnswer;
import com.springboot.backend.douremember.groundtruth.groundtruth_backend.entities.GroundTruthResponse;
import com.springboot.backend.douremember.groundtruth.groundtruth_backend.services.GroundTruthService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/v1/groundtruth")
public class GroundTruthController {

    @Autowired
    private GroundTruthService service;

    @PostMapping("/sendUserAnswer")
    public ResponseEntity<?> sendUserAnswer(@RequestBody GroundTruthAnswer userAnswer) {
        service.generateGroundTruthTestSendAnswer(userAnswer.getUserAnswer());
        return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("succes", "LLM evaluating your answer"));
    }

    @PostMapping("/saveAiResponse") // in db
    public ResponseEntity<?> saveAiResponse(@RequestBody GroundTruthResponse llmResponse) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.saveGroundTruthResponse(llmResponse));
    }
}
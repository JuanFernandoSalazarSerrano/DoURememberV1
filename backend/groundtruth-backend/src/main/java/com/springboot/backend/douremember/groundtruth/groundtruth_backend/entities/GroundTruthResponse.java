package com.springboot.backend.douremember.groundtruth.groundtruth_backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import static jakarta.persistence.GenerationType.*;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "GroundTruthAnswers")
public class GroundTruthResponse {
    
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private String aiResponse;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAiResponse() {
        return aiResponse;
    }

    public void setAiResponse(String aiResponse) {
        this.aiResponse = aiResponse;
    }
    
}

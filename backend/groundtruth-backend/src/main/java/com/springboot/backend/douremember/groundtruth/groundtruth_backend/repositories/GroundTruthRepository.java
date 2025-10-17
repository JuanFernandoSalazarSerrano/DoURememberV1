package com.springboot.backend.douremember.groundtruth.groundtruth_backend.repositories;

import org.springframework.data.repository.CrudRepository;

import com.springboot.backend.douremember.groundtruth.groundtruth_backend.entities.GroundTruthResponse;

public interface GroundTruthRepository extends CrudRepository<GroundTruthResponse, Long> {
}

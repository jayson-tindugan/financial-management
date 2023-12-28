package com.bsit4d.backend.repository;

import com.bsit4d.backend.model.LoginHistoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginHistoryRepository extends JpaRepository<LoginHistoryModel, Long> {

    List<LoginHistoryModel> findByIdNumber(Long idNumber);

}
package com.bsit4d.backend.repository;

import com.bsit4d.backend.model.TransactionModel;
import com.bsit4d.backend.model.TransactionVersionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionVersionRepository extends JpaRepository<TransactionVersionModel, String> {
    // You can define custom queries or methods if needed

}


package com.bsit4d.backend.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OptimisticLockType;
import org.hibernate.annotations.OptimisticLocking;

import java.time.LocalDate;
import java.time.LocalDateTime;
    @Entity
    @Table(name = "transactionVersion")
    public class TransactionVersionModel {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "transactionId", referencedColumnName = "transactionId")
        @JsonBackReference
        private TransactionModel transaction;

        private Double amount;
        private Double quantity;
        private Double total;
        private String remark;
        private String orNumber;

        private LocalDate transactionDate;

        // Other fields...

        @Column(name = "timeChanged")
        @CreationTimestamp
        private LocalDateTime changeTime;

        public TransactionVersionModel() {

        }
        @Version
        private Long version;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public TransactionModel getTransaction() {
            return transaction;
        }

        public void setTransaction(TransactionModel transaction) {
            this.transaction = transaction;
        }

        public Double getAmount() {
            return amount;
        }

        public void setAmount(Double amount) {
            this.amount = amount;
        }

        public Double getQuantity() {
            return quantity;
        }

        public void setQuantity(Double quantity) {
            this.quantity = quantity;
        }

        public Double getTotal() {
            return total;
        }

        public void setTotal(Double total) {
            this.total = total;
        }

        public String getRemark() {
            return remark;
        }

        public void setRemark(String remark) {
            this.remark = remark;
        }

        public String getOrNumber() {
            return orNumber;
        }

        public void setOrNumber(String orNumber) {
            this.orNumber = orNumber;
        }

        public LocalDate getTransactionDate() {
            return transactionDate;
        }

        public void setTransactionDate(LocalDate transactionDate) {
            this.transactionDate = transactionDate;
        }

        public LocalDateTime getChangeTime() {
            return changeTime;
        }

        public void setChangeTime(LocalDateTime changeTime) {
            this.changeTime = changeTime;
        }

        public Long getVersion() {
            return version;
        }

        public void setVersion(Long version) {
            this.version = version;
        }

        public TransactionVersionModel(Long id, TransactionModel transaction, Double amount, Double quantity, Double total, String remark, String orNumber, LocalDate transactionDate, LocalDateTime changeTime, Long version) {
            this.id = id;
            this.transaction = transaction;
            this.amount = amount;
            this.quantity = quantity;
            this.total = total;
            this.remark = remark;
            this.orNumber = orNumber;
            this.transactionDate = transactionDate;
            this.changeTime = changeTime;
            this.version = version;
        }
    }

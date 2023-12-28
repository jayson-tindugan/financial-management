package com.bsit4d.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

public class FetchAllTransactionModel {
    private Double id;
    private String transactionId;
    private String allocationType;
    private Double amount;
    private Double quantity;
    private Double total;
    private String transactionType;
    private String particular;
    private String orNumber;
    private String remark;
    private Double idNumber;
    private Double cashOnHandsCollection;
    private Double cashOnHandsDonation;
    private Double cashOnHandsIGP;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime transactionDate;

    public Double getId() {
        return id;
    }

    public void setId(Double id) {
        this.id = id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getAllocationType() {
        return allocationType;
    }

    public void setAllocationType(String allocationType) {
        this.allocationType = allocationType;
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

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getParticular() {
        return particular;
    }

    public void setParticular(String particular) {
        this.particular = particular;
    }

    public String getOrNumber() {
        return orNumber;
    }

    public void setOrNumber(String orNumber) {
        this.orNumber = orNumber;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Double getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(Double idNumber) {
        this.idNumber = idNumber;
    }

    public Double getCashOnHandsCollection() {
        return cashOnHandsCollection;
    }

    public void setCashOnHandsCollection(Double cashOnHandsCollection) {
        this.cashOnHandsCollection = cashOnHandsCollection;
    }

    public Double getCashOnHandsDonation() {
        return cashOnHandsDonation;
    }

    public void setCashOnHandsDonation(Double cashOnHandsDonation) {
        this.cashOnHandsDonation = cashOnHandsDonation;
    }

    public Double getCashOnHandsIGP() {
        return cashOnHandsIGP;
    }

    public void setCashOnHandsIGP(Double cashOnHandsIGP) {
        this.cashOnHandsIGP = cashOnHandsIGP;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }

    public FetchAllTransactionModel(Double id, String transactionId, String allocationType, Double amount, Double quantity, Double total, String transactionType, String particular, String orNumber, String remark, Double idNumber, Double cashOnHandsCollection, Double cashOnHandsDonation, Double cashOnHandsIGP, LocalDateTime transactionDate) {
        this.id = id;
        this.transactionId = transactionId;
        this.allocationType = allocationType;
        this.amount = amount;
        this.quantity = quantity;
        this.total = total;
        this.transactionType = transactionType;
        this.particular = particular;
        this.orNumber = orNumber;
        this.remark = remark;
        this.idNumber = idNumber;
        this.cashOnHandsCollection = cashOnHandsCollection;
        this.cashOnHandsDonation = cashOnHandsDonation;
        this.cashOnHandsIGP = cashOnHandsIGP;
        this.transactionDate = transactionDate;
    }
    private TransactionModel transactionModel;
    public FetchAllTransactionModel(
            TransactionModel t,
            Double cashOnHandsCollection,
            Double cashOnHandsDonation,
            Double cashOnHandsIGP
    ) {
        this.transactionModel = t;
        this.cashOnHandsCollection = cashOnHandsCollection;
        this.cashOnHandsDonation = cashOnHandsDonation;
        this.cashOnHandsIGP = cashOnHandsIGP;
    }

}

package com.bsit4d.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
@NoArgsConstructor
@Entity
@Table(name = "transaction")
public class TransactionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Double id;
    @Column(unique = true)
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String transactionId;
    @NotNull
    private String allocationType;
    @NotNull
    private Double amount;
    @NotNull
    private Double quantity;
    @NotNull
    private Double total;
    private String transactionType;
    @Column(nullable = true)
    private String particular;
    @Column(nullable = true)
    private String orNumber;
    @Column(nullable = true)
    private String remark;
    @NotNull
    private Double idNumber;
    @Column(nullable = true)
    private Double balance;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private LocalDateTime dateAdded;
    @Temporal(TemporalType.DATE)
    @OrderBy("transactionDate ASC")
    private LocalDate transactionDate;

    @OneToMany(mappedBy = "transaction", cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @JsonManagedReference
    private List<TransactionVersionModel> transactionVersion;
    @Version
    private Long version;
    @PrePersist
    private void generateTransactionId() {
        if (this.transactionId == null) {
            String year = String.valueOf(LocalDate.now().getYear());
            String uuid = UUID.randomUUID().toString().toUpperCase().substring(0, 6);
            this.transactionId = "BITS" + year + "-" + uuid;
        }
    }


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

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balanceCollection, Double balanceDonation, Double balanceIGP) {
        if ("COLLECTION".equals(this.allocationType)) {
            this.balance = balanceCollection;
        } else if ("DONATION".equals(this.allocationType)) {
            this.balance = balanceDonation;
        } else if ("IGP".equals(this.allocationType)) {
            this.balance = balanceIGP;
        }
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }

    public TransactionModel(Double id, String transactionId, String allocationType, Double amount, Double quantity, Double total, String transactionType, String particular, String orNumber, String remark, Double idNumber, Double balance, LocalDate transactionDate, LocalDateTime dateAdded, Long version) {
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
        balance = balance;
        this.transactionDate = transactionDate;
        this.dateAdded = dateAdded;
        this.version = version;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public List<TransactionVersionModel> getTransactionVersion() {
        return transactionVersion;
    }

    public void setTransactionVersion(List<TransactionVersionModel> transactionVersion) {
        this.transactionVersion = transactionVersion;
    }
}

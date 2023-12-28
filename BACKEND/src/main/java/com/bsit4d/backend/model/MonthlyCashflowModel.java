package com.bsit4d.backend.model;

public class MonthlyCashflowModel {
private String month;
private Double cashInflows;
private Double cashOutflows;
private Double cashOnHands;

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Double getCashInflows() {
        return cashInflows;
    }

    public void setCashInflows(Double cashInflows) {
        this.cashInflows = cashInflows;
    }

    public Double getCashOutflows() {
        return cashOutflows;
    }

    public void setCashOutflows(Double cashOutflows) {
        this.cashOutflows = cashOutflows;
    }

    public Double getCashOnHands() {
        return cashOnHands;
    }

    public void setCashOnHands(Double cashOnHands) {
        this.cashOnHands = cashOnHands;
    }

    public MonthlyCashflowModel(String month, Double cashInflows, Double cashOutflows, Double cashOnHands) {
        this.month = month;
        this.cashInflows = cashInflows;
        this.cashOutflows = cashOutflows;
        this.cashOnHands = cashOnHands;
    }

    public MonthlyCashflowModel() {
    }
}

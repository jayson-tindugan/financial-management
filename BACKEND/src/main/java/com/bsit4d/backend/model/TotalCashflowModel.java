package com.bsit4d.backend.model;


public class TotalCashflowModel {
    private String allocationType;
    private Double totalInflows;
    private Double totalOutflows;
    private Double netProfitLoss;

    public String getAllocationType() {
        return allocationType;
    }

    public void setAllocationType(String allocationType) {
        this.allocationType = allocationType;
    }

    public Double getTotalInflows() {
        return totalInflows;
    }

    public void setTotalInflows(Double totalInflows) {
        this.totalInflows = totalInflows;
    }

    public Double getTotalOutflows() {
        return totalOutflows;
    }

    public void setTotalOutflows(Double totalOutflows) {
        this.totalOutflows = totalOutflows;
    }

    public Double getNetProfitLoss() {
        return netProfitLoss;
    }

    public void setNetProfitLoss(Double netProfitLoss) {
        this.netProfitLoss = netProfitLoss;
    }

    public TotalCashflowModel(String allocationType, Double totalInflows, Double totalOutflows, Double netProfitLoss) {
        this.allocationType = allocationType;
        this.totalInflows = totalInflows;
        this.totalOutflows = totalOutflows;
        this.netProfitLoss = netProfitLoss;
    }
}

package com.bsit4d.backend.repository;


import com.bsit4d.backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionModel, Long> {
    TransactionModel findByTransactionId(String transactionId);

    @Override
    List<TransactionModel> findAll();

    //For outflow inflow breakdown
    @Query(value = "SELECT igpBalance FROM transaction WHERE allocationType = 'IGP' ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Float findLatestIgpBalance();

    @Query(value = "SELECT collectionBalance FROM transaction WHERE allocationType = 'COLLECTION' ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Float findLatestCollectionBalance();

    @Query(value = "SELECT donationBalance FROM transaction WHERE allocationType = 'DONATION' ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Float findLatestDonationBalance();

    //For total outflow, inflow, and netprofit lostt
    @Query("SELECT NEW com.bsit4d.backend.model.TotalCashflowModel(" +
            "t.allocationType, " +
            "SUM(CASE WHEN t.transactionType = 'INFLOW' THEN t.total ELSE 0 END) as totalInflows, " +
            "SUM(CASE WHEN t.transactionType = 'OUTFLOW' THEN t.total ELSE 0 END) as totalOutflows, " +
            "SUM(CASE WHEN t.transactionType = 'INFLOW' THEN t.total ELSE -t.total END)) " +
            "FROM com.bsit4d.backend.model.TransactionModel t " +
            "WHERE t.allocationType IN ('COLLECTION', 'DONATION', 'IGP') " +
            "GROUP BY t.allocationType")
    List<TotalCashflowModel> findTotalCashflow();

//    @Query("")
//    List<MonthlyCollectionModel> findMonthlyCollection();
//
//    @Query("")
//    List<MonthlyDonationModel> findMonthlyDonation();
//
//    @Query("")
//    List<MonthlyIgpModel> findMonthlyIgp();
//
//    @Query("SELECT\n" +
//            "   NEW com.bsit4d.backend.model.FetchAllTransactionModel(\n" +
//            "       t,\n" +
//            "       CASE \n" +
//            "           WHEN t.allocationType = 'COLLECTION' THEN \n" +
//            "               SUM(CASE WHEN t.transactionType = 'INFLOW' THEN t.total ELSE 0 END) OVER (ORDER BY t.transactionDate) \n" +
//            "           ELSE 0 \n" +
//            "       END AS cashOnHandsCollection,\n" +
//            "       CASE \n" +
//            "           WHEN t.allocationType = 'DONATION' THEN \n" +
//            "               SUM(CASE WHEN t.transactionType = 'INFLOW' THEN t.total ELSE 0 END) OVER (ORDER BY t.transactionDate) \n" +
//            "           ELSE 0 \n" +
//            "       END AS cashOnHandsDonation,\n" +
//            "       CASE \n" +
//            "           WHEN t.allocationType = 'IGP' THEN \n" +
//            "               SUM(CASE WHEN t.transactionType = 'INFLOW' THEN t.total ELSE 0 END) OVER (ORDER BY t.transactionDate) \n" +
//            "           ELSE 0 \n" +
//            "       END AS cashOnHandsIGP\n" +
//            "   )\n" +
//            "FROM\n" +
//            "   com.bsit4d.backend.model.TransactionModel t \n" +
//            "WHERE\n" +
//            "   t.allocationType IN ('COLLECTION', 'DONATION', 'IGP')\n" +
//            "ORDER BY\n" +
//            "   t.transactionDate DESC\n")
//    List<FetchAllTransactionModel> findAllTransactions();
@Query(value = "SELECT t FROM TransactionModel t LEFT JOIN FETCH t.transactionVersion tv ORDER BY t.transactionDate ASC, tv.changeTime DESC")
List<TransactionModel> findAllByAllocationTypeInOrderByTransactionDateDesc(List<String> allocationTypes);

    @Query(value = "SELECT NEW com.bsit4d.backend.model.MonthlyCashflowModel(MONTHNAME(t.transactionDate) AS month, \n" +
            "            SUM(CASE WHEN t.transactionType = 'Inflow' THEN t.total ELSE 0 END) AS cashInflows, \n" +
            "            SUM(CASE WHEN t.transactionType = 'Outflow' THEN t.total ELSE 0 END) AS cashOutflows," +
            "              SUM(CASE WHEN t.transactionType = 'INFLOW' THEN t.total ELSE - t.total END))" +
            "            FROM com.bsit4d.backend.model.TransactionModel t\n" +
            "            WHERE t.allocationType = 'COLLECTION' GROUP BY YEAR(t.transactionDate), MONTHNAME(t.transactionDate), t.transactionDate \n" +
            "            ORDER BY YEAR(t.transactionDate) ASC, MONTH(t.transactionDate) ASC, t.transactionDate")
    List<MonthlyCashflowModel> getMonthlyCollection();


    @Query(value = "SELECT NEW com.bsit4d.backend.model.MonthlyCashflowModel (MONTHNAME(t.transactionDate) AS month, \n" +
            "            SUM(CASE WHEN t.transactionType = 'Inflow' THEN t.total ELSE 0 END) AS cashInflows, \n" +
            "            SUM(CASE WHEN t.transactionType = 'Outflow' THEN t.total ELSE 0 END) AS cashOutflows," +
            "              SUM(CASE WHEN t.transactionType = 'INFLOW' THEN t.total ELSE - t.total END))" +
            "            FROM com.bsit4d.backend.model.TransactionModel t\n" +
            "            WHERE t.allocationType = 'DONATION' GROUP BY YEAR(t.transactionDate), MONTHNAME(t.transactionDate), t.transactionDate \n" +
            "            ORDER BY YEAR(t.transactionDate) ASC, MONTH(t.transactionDate) ASC, t.transactionDate")
    List<MonthlyCashflowModel> getMonthlyDonation();

    @Query(value = "SELECT NEW com.bsit4d.backend.model.MonthlyCashflowModel(MONTHNAME(t.transactionDate) AS month, \n" +
            "            SUM(CASE WHEN t.transactionType = 'Inflow' THEN t.total ELSE 0 END) AS cashInflows, \n" +
            "            SUM(CASE WHEN t.transactionType = 'Outflow' THEN t.total ELSE 0 END) AS cashOutflows," +
            "              SUM(CASE WHEN t.transactionType = 'INFLOW' THEN t.total ELSE - t.total END))" +
            "            FROM com.bsit4d.backend.model.TransactionModel t\n" +
            "            WHERE t.allocationType = 'IGP' GROUP BY YEAR(t.transactionDate), MONTHNAME(t.transactionDate), t.transactionDate \n" +
            "            ORDER BY YEAR(t.transactionDate) ASC, MONTH(t.transactionDate) ASC, t.transactionDate")
    List<MonthlyCashflowModel> getMonthlyIgp();

    //for displaying all transaction
    List<TransactionModel> findByAllocationType(String allocationType);

    @Query("SELECT t FROM TransactionModel t JOIN FETCH t.transactionVersion")
    List<TransactionModel> findAllWithTransactionVersion();
    List<TransactionModel> findByIdNumber(Long idNumber);

}

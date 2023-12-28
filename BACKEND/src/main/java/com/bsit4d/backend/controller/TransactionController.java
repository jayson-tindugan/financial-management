package com.bsit4d.backend.controller;

import com.bsit4d.backend.model.*;
//import com.bsit4d.backend.service.ExcelTransactionService;
import com.bsit4d.backend.service.TransactionService;
import com.bsit4d.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserService userService;

    @PostMapping("/save")
    @PreAuthorize("hasAuthority ('TREASURER')")
    public ResponseEntity save(@RequestBody TransactionModel transactionModel){
        return new ResponseEntity<>(transactionService.save(transactionModel), HttpStatus.OK);
    }


    @GetMapping("/igpList")
    public ResponseEntity<List<TransactionModel>> getAllIgpTransactions() {
        try {
            List<TransactionModel> transactions = transactionService.findAllIgpTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/collectionList")
    public ResponseEntity<List<TransactionModel>> getAllCollectionTransactions() {
        try {
            List<TransactionModel> transactions = transactionService.findAllCollectionTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/donationList")
    public ResponseEntity<List<TransactionModel>> getAllDonationTransactions() {
        try {
            List<TransactionModel> transactions = transactionService.findAllDonationTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/totalCashflow")
    public List<TotalCashflowModel> getTotalChart() {
        return transactionService.findTotalCashflow();
    }
    @GetMapping("/monthlyCollection")
    public ResponseEntity<List<MonthlyCashflowModel>> getMonthlyCollection() {
        return ResponseEntity.ok(transactionService.getMonthlyCollection());
    }
    @GetMapping("/monthlyDonation")
    public ResponseEntity<List<MonthlyCashflowModel>> getMonthlyDonation() {
        return ResponseEntity.ok(transactionService.getMonthlyDonation());
    }
    @GetMapping("/monthlyIgp")
    public ResponseEntity<List<MonthlyCashflowModel>> getMonthlyIgp() {
        return ResponseEntity.ok(transactionService.getMonthlyIgp());
    }

    @GetMapping("/fetchAll")
    public List<TransactionModel> getAllTransaction() {
        return transactionService.findAllTransactionsWithBalance();
    }


    @PutMapping("/update/{transactionId}")
    public ResponseEntity<String> updateTransaction(@PathVariable String transactionId, @RequestBody TransactionModel updatedTransaction) {
        try {
            String result = transactionService.updateTransaction(transactionId, updatedTransaction);
            if ("Success".equals(result)) {
                return new ResponseEntity<>("Success", HttpStatus.OK);
            } else {
                return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating transaction: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/updateLogs")
    public List<TransactionModel> getAllTransactionsWithVersions() {
        return  transactionService.getAllTransactionsWithVersions();
    }


//    @GetMapping("/exportExcel")
//    public ResponseEntity<Resource> exportTransactionsToExcel() {
//        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
//        String currentDateTime = dateFormatter.format(new Date());
//
//        try {
//            List<TransactionModel> transactions = transactionService.getAllTransactions();
//            byte[] excelBytes = excelTransactionService.generateExcel(transactions);
//
//            ByteArrayResource resource = new ByteArrayResource(excelBytes);
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=BITS-FINANCIAL-REPORT_" + currentDateTime+ ".xlsx");
//
//            return ResponseEntity.ok()
//                    .headers(headers)
//                    .contentLength(excelBytes.length)
//                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                    .body(resource);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.badRequest().build();
//        }
//    }

}

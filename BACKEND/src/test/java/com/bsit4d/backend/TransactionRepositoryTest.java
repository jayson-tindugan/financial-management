package com.bsit4d.backend;

import com.bsit4d.backend.model.TransactionModel;
import com.bsit4d.backend.model.TransactionVersionModel;
import com.bsit4d.backend.repository.TransactionRepository;
import com.bsit4d.backend.repository.TransactionVersionRepository;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class TransactionRepositoryTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(TransactionRepositoryTest.class);

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionVersionRepository transactionVersionRepository;

    @Test
    public void testSaveAndFetchTransactionWithVersions() {

            // Create a new TransactionModel instance
            TransactionModel transaction = new TransactionModel();
            // Set other properties in transaction
            transaction.setAmount(100.0);
            transaction.setAllocationType("Some Allocation Type");
            transaction.setIdNumber(1323.34);
            transaction.setTotal(500.0);
            transaction.setQuantity(10.0);

            // Create a new TransactionVersionModel instance
            TransactionVersionModel version = new TransactionVersionModel();
            // Set other properties in version

            // Establish the bidirectional association
            version.setTransaction(transaction);

            transactionRepository.save(transaction);

            // Query to fetch TransactionModel with associated TransactionVersionModel entities
            List<TransactionModel> transactionsWithVersions = transactionRepository.findAllWithVersions();

            // Logging
            LOGGER.info("Number of transactions with versions: {}", transactionsWithVersions.size());
            for (TransactionModel transactionModel : transactionsWithVersions) {
                LOGGER.info("Transaction ID: {}", transactionModel.getTransactionId());
                // Log other relevant information about the transaction and associated versions
            }

        // Clean up (optional)
        transactionRepository.deleteAll();
        transactionVersionRepository.deleteAll();
    }
}

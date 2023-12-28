//package com.bsit4d.backend.service;
//
//
//import com.bsit4d.backend.model.TransactionModel;
//import org.apache.poi.ss.usermodel.*;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//import org.springframework.stereotype.Service;
//
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class ExcelTransactionService {
//    public byte[] generateExcel(List<TransactionModel> transactions) throws IOException {
//        try (Workbook workbook = new XSSFWorkbook()) {
//            Map<String, Sheet> sheets = new HashMap<>();
//
//            // Create sheets for each allocation type
//            for (TransactionModel transaction : transactions) {
//                String allocationType = transaction.getAllocationType();
//                if (!sheets.containsKey(allocationType)) {
//                    sheets.put(allocationType, workbook.createSheet(allocationType));
//                    createHeaderRow(sheets.get(allocationType), workbook);
//                }
//
//                addTransactionRow(sheets.get(allocationType), transaction);
//            }
//
//            // Adjust column widths and set header style for all sheets
//            for (Sheet sheet : sheets.values()) {
//                autoSizeColumns(sheet);
//            }
//
//            // Write to ByteArrayOutputStream
//            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//            workbook.write(outputStream);
//            return outputStream.toByteArray();
//        }
//    }
//
//    private void createHeaderRow(Sheet sheet, Workbook workbook) {
//        Row headerRow = sheet.createRow(0);
//        CellStyle headerStyle = workbook.createCellStyle();
//        Font font = workbook.createFont();
//        font.setBold(true);
//        headerStyle.setFont(font);
//
//        // Set the style for each header cell
//        for (int i = 0; i < 9; i++) {
//            Cell cell = headerRow.createCell(i);
//            cell.setCellStyle(headerStyle);
//        }
//
//        headerRow.getCell(0).setCellValue("Transaction ID");
//        headerRow.getCell(1).setCellValue("Transaction Type");
//        headerRow.getCell(2).setCellValue("Amount");
//        headerRow.getCell(3).setCellValue("Quantity");
//        headerRow.getCell(4).setCellValue("Total");
//        headerRow.getCell(5).setCellValue("Balance");
//        headerRow.getCell(6).setCellValue("Particular");
//        headerRow.getCell(7).setCellValue("Remark");
//        headerRow.getCell(8).setCellValue("Transaction Date");
//    }
//
//    private void addTransactionRow(Sheet sheet, TransactionModel transaction) {
//        int rowNum = sheet.getLastRowNum() + 1;
//        Row row = sheet.createRow(rowNum);
//        row.createCell(0).setCellValue(transaction.getTransactionId());
//        row.createCell(1).setCellValue(transaction.getTransactionType());
//        row.createCell(2).setCellValue(transaction.getAmount());
//        row.createCell(3).setCellValue(transaction.getQuantity());
//        row.createCell(4).setCellValue(transaction.getTotal());
//        // Set the 'balance' value in the appropriate column based on the allocation type
//        String allocationType = transaction.getAllocationType();
//        setBalanceCellValue(row, transaction, allocationType);
//        row.createCell(6).setCellValue(transaction.getParticular());
//        row.createCell(7).setCellValue(transaction.getTransactionDate().toString());
//        row.createCell(8).setCellValue(transaction.getRemark());
//    }
//
//    private void setBalanceCellValue(Row row, TransactionModel transaction, String allocationType) {
//        // Set the 'balance' value in the appropriate column based on the allocation type
//        switch (allocationType) {
//            case "COLLECTION":
//                row.createCell(5).setCellValue(transaction.getCollectionBalance());
//                break;
//            case "IGP":
//                row.createCell(5).setCellValue(transaction.getIgpBalance());
//                break;
//            case "DONATION":
//                row.createCell(5).setCellValue(transaction.getDonationBalance());
//                break;
//            default:
//                row.createCell(5).setCellValue(transaction.getDonationBalance()); // Default or handle additional cases as needed
//        }
//    }
//
//    private void autoSizeColumns(Sheet sheet) {
//        for (int i = 0; i < sheet.getRow(0).getPhysicalNumberOfCells(); i++) {
//            sheet.autoSizeColumn(i);
//        }
//    }
//}
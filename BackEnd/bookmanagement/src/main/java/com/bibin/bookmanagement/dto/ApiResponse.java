package com.bibin.bookmanagement.dto;

public record ApiResponse(
        String status,
        Object o,
        String message
) {
}

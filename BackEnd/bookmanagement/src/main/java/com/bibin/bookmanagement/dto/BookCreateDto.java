package com.bibin.bookmanagement.dto;

import java.util.Date;

public record BookCreateDto(
                            String title,
                            String author,
                            Date publicationDate,
                            String isbn,
                            String genre,
                            Integer rating) {
}

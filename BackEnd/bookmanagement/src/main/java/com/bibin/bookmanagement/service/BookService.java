package com.bibin.bookmanagement.service;

import com.bibin.bookmanagement.dto.BookCreateDto;
import com.bibin.bookmanagement.model.Book;
import com.bibin.bookmanagement.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book createBook(BookCreateDto bookCreateDto){
        Book book = new Book();
        book.setAuthor(bookCreateDto.author());
        book.setTitle(bookCreateDto.title());
        book.setIsbn(bookCreateDto.isbn());
        book.setRating(bookCreateDto.rating());
        book.setGenre(bookCreateDto.genre());
        book.setPublicationDate(bookCreateDto.publicationDate());
        book.setUniqueId(createUniqueId());

        try {
         return bookRepository.save(book);
        } catch (RuntimeException e) {
            throw new RuntimeException("couldnt save book, " + e.getMessage());
        }
    }


//todo
    private String createUniqueId() {
        return String.valueOf(Math.random());
    }


    public void deleteBookWithId(String id){
        Book book = bookRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("couldnt find book with id : "+id)
        );

        try {
            bookRepository.delete(book);
        } catch (RuntimeException e) {
            throw new RuntimeException("cannot delete book with id : "+id+" cause : "+e.getMessage());
        }
    }

    public List<Book> bookList(){
        List<Book> bookList =  bookRepository.findAll();
        return bookList;
    }

}

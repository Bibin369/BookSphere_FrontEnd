package com.bibin.bookmanagement.api;

import com.bibin.bookmanagement.dto.ApiResponse;
import com.bibin.bookmanagement.dto.BookCreateDto;
import com.bibin.bookmanagement.model.Book;
import com.bibin.bookmanagement.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
public class BookApi {
    @Autowired
    private BookService bookService;

    @GetMapping("/listAll")
    public ResponseEntity<ApiResponse> listAllBooks(){
        List<Book> bookList = bookService.bookList();

        if (bookList.isEmpty()){
            return ResponseEntity.ok(new ApiResponse("success","There are no books",null));
        }
        return ResponseEntity.ok(new ApiResponse("success",bookList,null));
    }

    @PostMapping("/new")
    public ResponseEntity<ApiResponse> createNewBook(@RequestBody BookCreateDto bookCreateDto){
        try {
            Book book = bookService.createBook(bookCreateDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse("success","book created with title ",null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("error",e.getMessage(),null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable String id){
        try {
            bookService.deleteBookWithId(id);
            return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("success","book deleted with id "+id,null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("error",e.getMessage(),null));
        }
    }

}

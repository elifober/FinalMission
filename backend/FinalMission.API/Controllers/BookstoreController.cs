using System.Collections.Generic;
using System.Linq;
using FinalMission.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace FinalMission.API.Controllers;

[Route("[controller]")]
[ApiController]

public class BookstoreController : Controller
{
    private BookstoreContext _bookstoreContext;

    public BookstoreController(BookstoreContext temp) => _bookstoreContext = temp;
    
    [HttpGet("AllBooks")]
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookCategory = null)
    {
        var query = _bookstoreContext.Books.AsQueryable();

        if (bookCategory != null && bookCategory.Any())
        {
            query = query.Where(b => bookCategory.Contains(b.Category));
        }
        
        var totalNumBooks = query.Count();
        
        var list = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        
        return Ok(new
        {
            books = list,
            totalNumBooks = totalNumBooks
        });
    }

    [HttpGet("GetBookCategories")]
    public IActionResult GetBookCategories()
    {
        var categories = _bookstoreContext.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();
        return Ok(categories);
    }

    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book newBook)
    {
        _bookstoreContext.Books.Add(newBook);
        _bookstoreContext.SaveChanges();
        return Ok(newBook);
    }

    [HttpPut("UpdateBook/{bookId}")]
    public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
    {
        var existingBook = _bookstoreContext.Books.Find(bookId);

        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.Publisher = updatedBook.Publisher;
        existingBook.Isbn = updatedBook.Isbn;
        existingBook.Classification = updatedBook.Classification;
        existingBook.Category = updatedBook.Category;
        existingBook.PageCount = updatedBook.PageCount;
        existingBook.Price = updatedBook.Price;

        _bookstoreContext.Update(existingBook);
        _bookstoreContext.SaveChanges();
        return Ok(existingBook);
    }

    [HttpDelete("DeleteBook/{bookId}")]
    public IActionResult DeleteBook(int bookId)
    {
        var book = _bookstoreContext.Books.Find(bookId);

        if (book == null)
        {
            return NotFound(new {message = "Project Not Found"});
        }

        _bookstoreContext.Books.Remove(book);
        _bookstoreContext.SaveChanges();
        return NoContent();
    }
}
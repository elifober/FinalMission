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
}
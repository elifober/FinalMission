using System.Collections.Generic;
using System.Linq;
using FinalMission.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace FinalMission.API.Controllers;

[Route("[controller]")]
[ApiController]

public class BookstoreController : Controller
{
    private BookstoreContext _bookstoreContext;

    public BookstoreController(BookstoreContext temp) => _bookstoreContext = temp;
    
    [HttpGet("AllBooks")]
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1)
    {
        var list = _bookstoreContext.Books
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var totalNumBooks = _bookstoreContext.Books.Count();
        
        return Ok(new
        {
            books = list,
            totalNumBooks = totalNumBooks
        });
    }
}
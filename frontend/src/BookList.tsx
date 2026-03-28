import { useEffect, useState } from "react";
import type { Book } from "./types/Book";

function BookList({selectedCategories}: {selectedCategories: string[]}) {

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize] = useState<number>(8);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    

    useEffect(() => {
        const fetchBooks = async () => {

            const categoryParams = selectedCategories.map((cat) => `bookCategory=${encodeURIComponent(cat)}`).join('&')

            const response = await fetch(`https://localhost:5000/Bookstore/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            setBooks(data.books ?? []);
            setTotalPages(Math.ceil((data.totalNumBooks ?? 0) / pageSize));
        }

        fetchBooks();
    }, [pageSize, pageNum, selectedCategories]);
    
    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {books.map((b) => (
                <div 
                    key={b.isbn} 
                    style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    width: '250px',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
                    }}
                >
                    <h3 style={{ margin: '0 0 8px 0' }}>{b.title}</h3>
                    <p><strong>Author:</strong> {b.author}</p>
                    <p><strong>Publisher:</strong> {b.publisher}</p>
                    <p><strong>ISBN:</strong> {b.isbn}</p>
                    <p><strong>Category:</strong> {b.category}</p>
                    <p><strong>Page Count:</strong> {b.pageCount}</p>
                    <p><strong>Price:</strong> ${b.price}</p>
                </div>
                ))}
            </div>

            <br />
            <br />

            <div>
                <button disabled={pageNum <= 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

                {[...Array(totalPages)].map((_, i) => (
                <button 
                    key={i + 1} 
                    onClick={() => setPageNum(i + 1)} 
                    disabled={pageNum === i + 1}
                >
                    {i + 1}
                </button>
                ))}

                <button disabled={pageNum >= totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>
            </div>
        </>
    );


}

export default BookList;
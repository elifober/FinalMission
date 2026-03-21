import { useEffect, useState } from "react";
import type { Book } from "./types/Book";

function BookList() {

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`https://localhost:5000/Bookstore/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`);
            const data = await response.json();
            setBooks(data.books ?? []);
            setTotalPages(Math.ceil((data.totalNumBooks ?? 0) / pageSize));
        }

        fetchBooks();
    }, [pageSize, pageNum]);
    
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Category</th>
                        <th>Page Count</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((b) => (
                        <tr key={b.isbn}>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.publisher}</td>
                            <td>{b.isbn}</td>
                            <td>{b.category}</td>
                            <td>{b.pageCount}</td>
                            <td>{b.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <br/>
            <button disabled={pageNum <= 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

            {
                [...Array(totalPages)].map((_, i) => (
                    <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNum === i+1}>
                        {i + 1}
                    </button>
                ))
            }

            <button disabled={pageNum >= totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

            <br/>
            <label>Results per page:</label>
            <select 
                value={pageSize} 
                onChange={(p) => {
                    setPageSize(Number(p.target.value));
                    setPageNum(1)
                }
                }>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
        </>
    );


}

export default BookList;
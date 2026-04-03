import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { loadBooks } from "../api/ProjectsAPI";
import Pagination from "./Pagination";

function BookList({selectedCategories}: {selectedCategories: string[]}) {

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize] = useState<number>(6);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async(pageSize: number, pageNum: number, selectedCategories: string[]) => {
            try {
                setLoading(true);
                setError(null);
                const data = await loadBooks(pageSize, pageNum, selectedCategories);

                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch(error) {
                setError((error as Error).message)
            } finally {
                setLoading(false);
            }
        };

        fetchBooks(pageSize, pageNum, selectedCategories);
    }, [pageSize, pageNum, selectedCategories]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading books…</span>
                </div>
                <p className="text-muted small mt-3 mb-0">Loading books…</p>
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (books.length === 0) {
        return (
            <div className="alert alert-secondary shadow-sm mb-0" role="status">
                No books match your filters. Try clearing some categories or
                check back later.
            </div>
        );
    }

    return (
        <>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {books.map((b) => (
                <div key={b.isbn} className="col">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title h5">{b.title}</h3>
                            <p className="card-text small mb-1"><strong>Author:</strong> {b.author}</p>
                            <p className="card-text small mb-1"><strong>Publisher:</strong> {b.publisher}</p>
                            <p className="card-text small mb-1"><strong>ISBN:</strong> {b.isbn}</p>
                            <p className="card-text small mb-1"><strong>Category:</strong> {b.category}</p>
                            <p className="card-text small mb-1"><strong>Page Count:</strong> {b.pageCount}</p>
                            <p className="card-text small mb-3">
                                <strong>Price:</strong>{" "}
                                <span className="text-primary fw-semibold">
                                    ${b.price}
                                </span>
                            </p>
                            <button
                                type="button"
                                className="btn btn-success mt-auto w-100"
                                onClick={() =>
                                    navigate(
                                        `/bookDetails/${b.bookId}/${encodeURIComponent(b.title)}/${encodeURIComponent(String(b.price))}`
                                    )
                                }
                            >
                                View book details
                            </button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            <Pagination 
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={() => {}}
            />
        </>
    );


}

export default BookList;
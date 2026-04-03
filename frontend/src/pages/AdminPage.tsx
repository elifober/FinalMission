import { useState, useEffect } from "react";
import type { Book } from "../types/Book";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";
import { deleteBook } from "../api/ProjectsAPI";

const AdminPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize] = useState<number>(6);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editBook, setEditBook] = useState<Book | null>(null);
    /** Bump to refetch when add/edit succeeds while already on page 1 */
    const [listVersion, setListVersion] = useState(0);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(
                    `https://localhost:5000/Bookstore/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch books");
                }
                const data = await response.json();

                setBooks(data.books ?? []);
                setTotalPages(
                    Math.ceil((data.totalNumBooks ?? 0) / pageSize)
                );
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, [pageSize, pageNum, listVersion]);

    const handleDelete = async (b: Book) => {
        if (
            !window.confirm(
                `Delete ${b.title}?`
            )
        ) {
            return;
        }
        try {
            await deleteBook(b.bookId);
            if (editBook?.bookId === b.bookId) {
                setEditBook(null);
            }
            if (books.length === 1 && pageNum > 1) {
                setPageNum((p) => Math.max(1, p - 1));
            }
            setListVersion((v) => v + 1);
        } catch (err) {
            window.alert((err as Error).message);
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading books…</span>
                </div>
                <p className="text-muted small mt-3 mb-0">Loading books…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger shadow-sm" role="alert">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h1 className="h2 mb-4">Admin — Books</h1>

            {!showForm && !editBook && (
                <button
                    type="button"
                    className="btn btn-success mb-3"
                    onClick={() => {
                        setEditBook(null);
                        setShowForm(true);
                    }}
                >
                    Add book
                </button>
            )}

            {showForm && (
                <NewBookForm
                    onSuccess={() => {
                        setShowForm(false);
                        setPageNum(1);
                        setListVersion((v) => v + 1);
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editBook && (
                <EditBookForm
                    book={editBook}
                    onSuccess={() => {
                        setEditBook(null);
                        setPageNum(1);
                        setListVersion((v) => v + 1);
                    }}
                    onCancel={() => setEditBook(null)}
                />
            )}



            {books.length === 0 ? (
                <div className="alert alert-secondary shadow-sm mb-4" role="status">
                    No books on this page.
                </div>
            ) : (
                <div className="card shadow-sm border-0 mb-4">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Publisher</th>
                                    <th scope="col">ISBN</th>
                                    <th scope="col">Classification</th>
                                    <th scope="col">Category</th>
                                    <th scope="col" className="text-end">
                                        Page Count
                                    </th>
                                    <th scope="col" className="text-end">
                                        Price
                                    </th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((b) => (
                                    <tr key={b.bookId}>
                                        <td>{b.bookId}</td>
                                        <td className="fw-medium">{b.title}</td>
                                        <td>{b.author}</td>
                                        <td>{b.publisher}</td>
                                        <td>{b.isbn}</td>
                                        <td>{b.classification}</td>
                                        <td>{b.category}</td>
                                        <td className="text-end">{b.pageCount}</td>
                                        <td className="text-end">
                                            ${b.price.toFixed(2)}
                                        </td>
                                        <td>
                                            <div className="btn-group btn-group-sm">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => {
                                                        setShowForm(false);
                                                        setEditBook(b);
                                                    }}

                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() =>
                                                        void handleDelete(b)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={() => {}}
            />
        </div>
    );
};

export default AdminPage;

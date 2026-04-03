import { useState } from "react";
import type { Book } from "../types/Book";
import { updateBook } from "../api/ProjectsAPI";
import AdminFormModal from "./AdminFormModal";

interface EditBookFormProps {
    book: Book;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
    const [formData, setFormData] = useState<Book>({ ...book });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        if (type === "number") {
            const num =
                name === "price"
                    ? parseFloat(value) || 0
                    : parseInt(value, 10) || 0;
            setFormData({ ...formData, [name]: num });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateBook(formData.bookId, formData);
        onSuccess();
    };

    return (
        <AdminFormModal title="Edit book" onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-12">
                        <label className="form-label text-muted small mb-0">
                            Book ID
                        </label>
                        <p className="fw-semibold mb-0">{formData.bookId}</p>
                    </div>
                    <div className="col-12">
                        <label className="form-label" htmlFor="edit-title">
                            Title
                        </label>
                        <input
                            id="edit-title"
                            className="form-control"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="edit-author">
                            Author
                        </label>
                        <input
                            id="edit-author"
                            className="form-control"
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="edit-publisher">
                            Publisher
                        </label>
                        <input
                            id="edit-publisher"
                            className="form-control"
                            type="text"
                            name="publisher"
                            value={formData.publisher}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="edit-isbn">
                            ISBN
                        </label>
                        <input
                            id="edit-isbn"
                            className="form-control"
                            type="text"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="edit-category">
                            Category
                        </label>
                        <input
                            id="edit-category"
                            className="form-control"
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label
                            className="form-label"
                            htmlFor="edit-classification"
                        >
                            Classification
                        </label>
                        <input
                            id="edit-classification"
                            className="form-control"
                            type="text"
                            name="classification"
                            value={formData.classification}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="edit-pageCount">
                            Page count
                        </label>
                        <input
                            id="edit-pageCount"
                            className="form-control"
                            type="number"
                            name="pageCount"
                            min={0}
                            value={formData.pageCount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="edit-price">
                            Price
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input
                                id="edit-price"
                                className="form-control"
                                type="number"
                                name="price"
                                min={0}
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-footer border-0 px-0 pb-0 pt-4 gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Save changes
                    </button>
                </div>
            </form>
        </AdminFormModal>
    );
};

export default EditBookForm;

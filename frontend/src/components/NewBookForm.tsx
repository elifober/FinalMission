import { useState } from "react";
import type { Book } from "../types/Book";
import { addBook } from "../api/ProjectsAPI";
import AdminFormModal from "./AdminFormModal";

interface NewBookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
    const [formData, setFormData] = useState<Book>({
        bookId: 0,
        title: "",
        author: "",
        publisher: "",
        isbn: "",
        classification: "",
        category: "",
        pageCount: 0,
        price: 0,
    });

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
        await addBook(formData);
        onSuccess();
    };

    return (
        <AdminFormModal title="Add new book" onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-12">
                        <label className="form-label" htmlFor="new-title">
                            Title
                        </label>
                        <input
                            id="new-title"
                            className="form-control"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="new-author">
                            Author
                        </label>
                        <input
                            id="new-author"
                            className="form-control"
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="new-publisher">
                            Publisher
                        </label>
                        <input
                            id="new-publisher"
                            className="form-control"
                            type="text"
                            name="publisher"
                            value={formData.publisher}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="new-isbn">
                            ISBN
                        </label>
                        <input
                            id="new-isbn"
                            className="form-control"
                            type="text"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="new-category">
                            Category
                        </label>
                        <input
                            id="new-category"
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
                            htmlFor="new-classification"
                        >
                            Classification
                        </label>
                        <input
                            id="new-classification"
                            className="form-control"
                            type="text"
                            name="classification"
                            value={formData.classification}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="new-pageCount">
                            Page count
                        </label>
                        <input
                            id="new-pageCount"
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
                        <label className="form-label" htmlFor="new-price">
                            Price
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input
                                id="new-price"
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
                        Add book
                    </button>
                </div>
            </form>
        </AdminFormModal>
    );
};

export default NewBookForm;

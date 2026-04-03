import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

function CategoryFilter({
    selectedCategories,
    setSelectedCategories,
}: {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
}) {
    const [categories, setCategories] = useState<string[]>([]);

    function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
        const updatedCategories = selectedCategories.includes(target.value)
            ? selectedCategories.filter((x) => x !== target.value)
            : [...selectedCategories, target.value];
        setSelectedCategories(updatedCategories);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/GetBookCategories`
                );
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-primary text-white py-3">
                <h2 className="h6 mb-0 fw-semibold">Filter by category</h2>
                <p className="small mb-0 mt-1 opacity-75">
                    Narrow the book list below
                </p>
            </div>
            <div className="card-body">
                {categories.length === 0 ? (
                    <div className="d-flex align-items-center gap-2 text-muted small">
                        <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span>Loading categories…</span>
                    </div>
                ) : (
                    <div className="vstack gap-2">
                        {categories.map((c, i) => {
                            const inputId = `category-filter-${i}`;
                            return (
                                <div key={c} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={inputId}
                                        value={c}
                                        checked={selectedCategories.includes(c)}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label
                                        className="form-check-label small"
                                        htmlFor={inputId}
                                    >
                                        {c}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryFilter;

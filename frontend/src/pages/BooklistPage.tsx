import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategortFilter';

function Welcome() {
  return (
    <div className="text-center mb-4 pb-4 border-bottom border-secondary-subtle">
      <h2 className="display-6 fw-semibold mb-2 text-body">Welcome to the Bookstore</h2>
      <p className="text-muted mb-0 lead fs-6">
        Browse our collection and filter by category.
      </p>
    </div>
  );
}

function BooklistPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container py-4">
      <Welcome />
      <div className="row g-4">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BooklistPage;

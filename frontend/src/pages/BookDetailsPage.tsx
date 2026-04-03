import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";

function BookDetailsPage() {
    const navigate = useNavigate();
    const { bookId, title, price } = useParams();
    const { addCart } = useCart();

    const displayTitle = title
        ? decodeURIComponent(title)
        : "";
    const displayPrice = price ? decodeURIComponent(price) : "";

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId),
            title: displayTitle,
            price: Number(price),
            quantity: 1,
        };
        addCart(newItem);
        navigate("/cart");
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-xl-7">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white">
                            <h1 className="h4 mb-0">{displayTitle}</h1>
                        </div>
                        <div className="card-body">
                            <p className="lead text-primary fw-semibold mb-4">
                                ${displayPrice}
                            </p>
                            <p className="text-muted small mb-0">
                                Add this title to your cart to purchase. You can
                                adjust quantities from the cart.
                            </p>
                        </div>
                        <div className="card-footer bg-body-tertiary d-flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleAddToCart}
                            >
                                Add to cart
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetailsPage;

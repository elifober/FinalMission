import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeCart, clearCart } = useCart();

    const cartTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="container py-4">
            <h1 className="h2 mb-4">Your cart</h1>

            {cart.length === 0 ? (
                <div className="alert alert-info shadow-sm" role="status">
                    Your cart is empty. Add books from the browse page to get
                    started.
                </div>
            ) : (
                <div className="card shadow-sm border-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col" className="text-end">
                                        Base price
                                    </th>
                                    <th scope="col" className="text-center">
                                        Qty
                                    </th>
                                    <th scope="col" className="text-end">
                                        Line total
                                    </th>
                                    <th scope="col">
                                        <span className="visually-hidden">
                                            Remove
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item: CartItem) => {
                                    const lineTotal =
                                        item.price * item.quantity;
                                    return (
                                        <tr key={item.bookId}>
                                            <td className="fw-medium">
                                                {item.title}
                                            </td>
                                            <td className="text-end text-nowrap">
                                                ${item.price.toFixed(2)}
                                            </td>
                                            <td className="text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="text-end text-nowrap fw-semibold">
                                                ${lineTotal.toFixed(2)}
                                            </td>
                                            <td className="text-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        removeCart(item.bookId)
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer bg-body d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center gap-3">
                        <p className="h5 mb-0">
                            Total:{" "}
                            <span className="text-primary">
                                ${cartTotal.toFixed(2)}
                            </span>
                        </p>
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => clearCart()}
                            >
                                Clear cart
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => navigate("/")}
                            >
                                Continue browsing
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {cart.length > 0 && (
                <p className="mt-3 mb-0 small text-muted">
                    Review your items above, then continue shopping or clear the
                    cart.
                </p>
            )}
        </div>
    );
}

export default CartPage;

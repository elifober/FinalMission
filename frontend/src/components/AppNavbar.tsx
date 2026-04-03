import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function AppNavbar() {
    const { cart } = useCart();
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm"
            role="navigation"
        >
            <div className="container-fluid">
                <NavLink className="navbar-brand fw-semibold" to="/" end>
                    Bookstore
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMain"
                    aria-controls="navbarMain"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarMain">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active" : ""}`
                                }
                                to="/"
                                end
                            >
                                Browse books
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center flex-wrap ${isActive ? "active" : ""}`
                                }
                                to="/cart"
                            >
                                <span>Cart</span>
                                {itemCount > 0 && (
                                    <span className="badge text-bg-light ms-2">
                                        {itemCount}
                                    </span>
                                )}
                                {cartTotal > 0 && (
                                    <span className="ms-2 small">
                                        ${cartTotal.toFixed(2)}
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default AppNavbar;

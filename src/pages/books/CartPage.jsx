import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { clearCart, removeFromCart } from "../../redux/features/cart/cartSlice";
import "./CartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  // Calculate total price
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  // Remove single item from cart
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
    localStorage.setItem("cart", JSON.stringify(cartItems.filter((p) => p._id !== product._id)));
  };

  // Clear all items from cart
  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem("cart"); // Ensures cart is cleared in local storage
  };

  // Sync cart state with localStorage on refresh
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (savedCart.length === 0) {
      localStorage.removeItem("cart");
    }
  }, [cartItems]);

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button onClick={handleClearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((product) => (
                <li key={product._id} className="cart-item">
                  <img
                    src={getImgUrl(product.coverImage)}
                    alt="Product"
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <h3>
                      <Link to="/">{product.title}</Link>
                    </h3>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Price:</strong> ${product.newPrice}</p>
                    <p><strong>Qty:</strong> 1</p>
                    <button
                      onClick={() => handleRemoveFromCart(product)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-cart">No products in the cart!</p>
          )}
        </div>
      </div>

      {/* Subtotal & Checkout */}
      <div className="cart-footer">
        <div className="subtotal">
          <p>Subtotal:</p>
          <p>${totalPrice || 0}</p>
        </div>
        <p className="shipping-info">Shipping and taxes calculated at checkout.</p>
        <Link to="/checkout" className="checkout-btn">Checkout</Link>
        <Link to="/" className="continue-shopping">Continue Shopping &rarr;</Link>
      </div>
    </div>
  );
};

export default CartPage;

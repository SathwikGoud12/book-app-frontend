import React, { useEffect } from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";
import "./OrderPage.css";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const email = currentUser?.email;

  // Ensure API is not called with an undefined email
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(email, {
    skip: !email, // Skips API call if email is undefined
  });

  useEffect(() => {
    console.log("Fetched Orders:", orders);
  }, [orders]);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error getting orders data</div>;

  return (
    <div className="order-container">
      <h2 className="order-heading">Your Orders</h2>

      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={order._id} className="order-card">
            <p className="order-number"># {index + 1}</p>
            <h2 className="order-id">Order ID: {order._id}</h2>
            <p className="order-text">Name: {order.name}</p>
            <p className="order-text">Email: {order.email}</p>
            <p className="order-text">Phone: {order.phone}</p>
            <p className="order-text">Total Price: ${order.totalPrice}</p>

            <h3 className="order-subheading">Address:</h3>
            <p className="order-address">
              {order.address?.city}, {order.address?.state},{" "}
              {order.address?.country}, {order.address?.zipcode}
            </p>

            <h3 className="order-subheading">Products:</h3>
            <ul className="order-products">
              {Array.isArray(order.productIds) && order.productIds.length > 0 ? (
                order.productIds.map((productId) => (
                  <li key={productId} className="order-product-id">
                    {productId}
                  </li>
                ))
              ) : (
                <p>No Products</p>
              )}
            </ul>
          </div>
        ))
      ) : (
        <div className="no-orders">No orders found!</div>
      )}
    </div>
  );
};

export default OrderPage;

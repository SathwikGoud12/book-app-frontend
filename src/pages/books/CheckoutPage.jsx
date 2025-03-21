import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import "./CheckoutPage.css"; // Importing the CSS file

const CheckoutPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });

    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: data.phone,
            productIds: cartItems.map((item) => item?._id),
            totalPrice: totalPrice,
        };

        try {
            const response = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder),
            });

            if (!response.ok) {
                throw new Error("Order submission failed. Please try again.");
            }

            Swal.fire({
                title: "Order Confirmed!",
                text: "Your order has been placed successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });

            navigate("/orders");
        } catch (error) {
            console.error("Error placing order:", error);
            Swal.fire({
                title: "Order Failed",
                text: error.message || "Something went wrong!",
                icon: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="checkout-section">
            <div className="checkout-container">
                <h2 className="checkout-title">Cash On Delivery</h2>
                <p className="checkout-price">Total Price: ${totalPrice}</p>
                <p className="checkout-items">Items: {cartItems.length}</p>

                <div className="checkout-form-container">
                    <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
                        <div className="form-header">
                            <p className="form-title">Personal Details</p>
                            <p>Please fill out all the fields.</p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                type="text"
                                id="name"
                            />
                            {errors.name && <span className="error">{errors.name.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="text" id="email" disabled defaultValue={currentUser?.email} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Enter a valid 10-digit phone number",
                                    },
                                })}
                                type="tel"
                                id="phone"
                            />
                            {errors.phone && <span className="error">{errors.phone.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address / Street</label>
                            <input
                                {...register("address", { required: "Address is required" })}
                                type="text"
                                id="address"
                            />
                            {errors.address && <span className="error">{errors.address.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                {...register("city", { required: "City is required" })}
                                type="text"
                                id="city"
                            />
                            {errors.city && <span className="error">{errors.city.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input
                                {...register("country", { required: "Country is required" })}
                                type="text"
                                id="country"
                            />
                            {errors.country && <span className="error">{errors.country.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <input
                                {...register("state", { required: "State is required" })}
                                type="text"
                                id="state"
                            />
                            {errors.state && <span className="error">{errors.state.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="zipcode">Zipcode</label>
                            <input
                                {...register("zipcode", {
                                    required: "Zipcode is required",
                                    pattern: {
                                        value: /^[0-9]{5,6}$/,
                                        message: "Enter a valid Zipcode",
                                    },
                                })}
                                type="text"
                                id="zipcode"
                            />
                            {errors.zipcode && <span className="error">{errors.zipcode.message}</span>}
                        </div>

                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="terms"
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
                            <label htmlFor="terms">
                                I agree to the <Link to="#">Terms & Conditions</Link> and{" "}
                                <Link to="#">Shopping Policy</Link>.
                            </label>
                        </div>

                        <button type="submit" className="submit-btn" disabled={!isChecked || !isValid || isLoading}>
                            {isLoading ? "Placing Order..." : "Place an Order"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;

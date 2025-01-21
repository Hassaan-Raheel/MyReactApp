import { useState } from 'react'
import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

function Cart() {
  const [counter, setCounter] = useState(1);
  const [isPickupChecked, setIsPickupChecked] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [subtotal, setSubtotal] = useState(150);
  const pricePerItem = 150;
  const [total, setTotal] = useState(subtotal);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(30);
  const [showPopup, setShowPopup] = useState("");
  const [isHeartClicked, setIsHeartClicked] = useState(false); // Initialize the heart icon state
  const [itemInCart, setItemInCart] = useState(true); // Initialize itemInCart state

  const addvalue = () => {
    setCounter(counter + 1);
    const newSubtotal = subtotal + pricePerItem; // Calculate the new subtotal
    setSubtotal(newSubtotal);
    const taxAmount = (newSubtotal + shipping) * 0.2; // Calculate the tax on the new subtotal
    setTax(taxAmount);
    setTotal(newSubtotal + shipping + taxAmount); // Update the grand total
  };
  
  const removevalue = () => {
    if (counter > 1) {
      setCounter(counter - 1);
      const newSubtotal = subtotal - pricePerItem; // Calculate the new subtotal
      setSubtotal(newSubtotal);
      const taxAmount = (newSubtotal + shipping) * 0.2; // Calculate the tax on the new subtotal
      setTax(taxAmount);
      setTotal(newSubtotal + shipping + taxAmount); // Update the grand total
    }
  };
  const handlePickupChange = () => {
    setIsPickupChecked(!isPickupChecked);
    if (!isPickupChecked) {
      setShipping(0);
      setSelectedShipping("");
      setZipCode("");
    }
    calculateTotal();
  };

  const handleShippingChange = (e) => {
    setSelectedShipping(e.target.value);
    const randomShipping = Math.floor(Math.random() * 15) + 5; // Random shipping charge between $5 and $20
    setShipping(randomShipping);
    calculateTotal();
    setZipCode("");
  };

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
    if (zipCode) {
      const nearestShippingCost = Math.floor(Math.random() * 15) + 5; // Calculate shipping based on zip
      setShipping(nearestShippingCost);
      calculateTotal();
      setSelectedShipping("");
    }
  };

  const calculateTotal = () => {
    const taxAmount = (subtotal + shipping) * 0.2; // Tax is 20% of subtotal + shipping
    setTax(taxAmount);
    setTotal(subtotal + shipping + taxAmount);
  };

  const toggleHeart = () => {
    setIsHeartClicked(!isHeartClicked);
    if (isHeartClicked) {
      setShowPopup("Removed from Wishlist");
    } else {
      setShowPopup("Added to Wishlist");
    }
    setTimeout(() => {
      setShowPopup(""); // Hide the popup after 2 seconds
    }, 3000);
  };

  const deleteItem = () => {
    setItemInCart(false); // Remove the item from the cart
  };

  return (
    <div className="cart-container">
      <div className="cart-left">
        <div className="Heading">
          <div>
            <h2>MY CART</h2>
          </div>
          <div className="button-container">
            <button className="move-btn" onClick={toggleHeart}>
              <i className={`fa fa-heart ${isHeartClicked ? 'clicked' : ''}`}></i> {/* Heart icon with dynamic class */}
              {isHeartClicked ? '' : ''}
            </button>
            <button className="remove-btn" onClick={deleteItem}>
              <i className="fa fa-trash"></i> {/* Trash icon for "Remove Item" */}
            </button>
          </div>
        </div>

        {itemInCart && (
          <div className="cart-item">
            <img
              src="https://fm.skyhub.pk/uploads/media/Products/1732941318121_710_Kano-lifestyle-1.jpg" // Replace with your product image URL
              alt="Product"
              className="product-image"
            />
            <div className="item-details">
              <div className="product-info">
                <h3 className="product-name">Kano Bedroom Set</h3>
                <p className="in-stock">In Stock</p>

                <div className="cart-actions">
                  <button onClick={removevalue}>-</button>
                  <span>{counter}</span>
                  <button onClick={addvalue}>+</button>
                </div>
                <p className="price">${subtotal}</p>
              </div>
            </div>
          </div>
        )}
        <div className="protection-plan">
          <p>Protection Plans starting at <strong>$14.99</strong></p>
          <button className="see-options-btn">See Options</button>
        </div>
      </div>

      {showPopup && (
        <div className="wishlist-popup">
          <p>{showPopup}</p>
        </div>
      )}

      <div className="cart-right">
        <h4>SHIPPING & TAX</h4>
        <div className="shipping-options">
          <div className="inline-container">
            <label htmlFor="store-pickup">Pickup</label>
            <input
              type="checkbox"
              id="store-pickup"
              checked={isPickupChecked}
              onChange={handlePickupChange}
            />
          </div>
          <p className="see-details">See Details</p>
          <select
            disabled={isPickupChecked}
            value={selectedShipping}
            onChange={handleShippingChange}
          >
            <option value="">Select a Location</option>
            <option value="E Venango St, Philadelphia, PA 19134">E Venango St, Philadelphia, PA 19134</option>
            <option value="1430 W Hunting Park Ave, Philadelphia, PA 19140">1430 W Hunting Park Ave, Philadelphia, PA 19140</option>
            <option value="St #4232, Upper Darby, Philadelphia, PA 19082">St #4232, Upper Darby, Philadelphia, PA 19082</option>
            <option value="130 E Baltimore Ave, Lansdowne, PA 19050">130 E Baltimore Ave, Lansdowne, PA 19050</option>
            <option value="611 W Brookdale St, Allentown, PA 18103">611 W Brookdale St, Allentown, PA 18103</option>
          </select>

          <input
            type="text"
            placeholder="Enter Zip Code"
            value={zipCode}
            onChange={handleZipCodeChange}
            disabled={isPickupChecked}
          />
        </div>

        <div className="totals">
          <p>Subtotal: <strong>${subtotal}</strong></p>
          <p>Shipping: <strong>${shipping}</strong></p>
          <p>Sales Tax: <strong>${tax.toFixed(2)}</strong></p>
          <p>Total: <strong>${total.toFixed(2)}</strong></p>
        </div>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;

// src/pages/Orders.js
import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await orderAPI.getById(orderId);
      setSelectedOrder(response.data);
    } catch (error) {
      alert('Failed to load order details');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      confirmed: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  if (loading) {
    return <div className="loading-container">Loading orders...</div>;
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span 
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status}
                </span>
              </div>

              <div className="order-body">
                <p className="order-customer">Customer: {order.user_name}</p>
                <p className="order-total">Total: ${parseFloat(order.total_price).toFixed(2)}</p>
              </div>

              <button 
                className="view-details-btn"
                onClick={() => fetchOrderDetails(order.id)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedOrder(null)}>
              ✕
            </button>
            
            <h2>Order Details - #{selectedOrder.id}</h2>
            
            <div className="order-detail-info">
              <p><strong>Status:</strong> 
                <span 
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(selectedOrder.status) }}
                >
                  {selectedOrder.status}
                </span>
              </p>
              <p><strong>Order Date:</strong> {new Date(selectedOrder.created_at).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${parseFloat(selectedOrder.total_price).toFixed(2)}</p>
            </div>

            <h3>Order Items</h3>
            <div className="order-items-list">
              {selectedOrder.items?.map((item, index) => (
                <div key={index} className="order-item">
                  <span className="item-name">{item.product_name}</span>
                  <span className="item-quantity">Qty: {item.quantity}</span>
                  <span className="item-price">
                    ${parseFloat(item.price_at_time_of_order).toFixed(2)}
                  </span>
                  <span className="item-total">
                    ${(parseFloat(item.price_at_time_of_order) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
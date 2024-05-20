import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useFirebase } from '../context/Firebase';

const OrderDetail = () => {
  const { getOrders } = useFirebase();
  const params = useParams();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders(params.bookId).then((orders) => setOrders(orders.docs));
  }, [getOrders, params.bookId]);

  return (
    <div className="mx-auto my-4 max-w-4xl md:my-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => {
          const data = order.data();
        
          return (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4">
              <h5 className="text-lg font-semibold">Ordered by: {data.displayName}</h5>
              <h6 className="text-sm">Quantity: {data.quantity}</h6>
              <h6 className="text-sm">Email: {data.userEmail}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderDetail;

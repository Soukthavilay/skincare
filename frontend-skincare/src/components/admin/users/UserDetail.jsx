import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import axios from 'axios';

const UserDetail = () => {
    const { id } = useParams();
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            const getOrder = async () => {
                try {
                    setLoading(true);
                    const res = await axios.get(`http://localhost:5000/api/order-by-customer/${id}`, {
                        headers: { Authorization: token },
                    });
                    setOrderDetail(res.data);
                } catch (err) {
                    setError('Error fetching data');
                } finally {
                    setLoading(false);
                }
            };
            getOrder();
        }
    }, [token, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (orderDetail && orderDetail.length === 0) {
        return <div>No orders found</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-xl font-semibold mb-4">Order Details</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                {orderDetail && orderDetail.map((order) => (
                    <div key={order._id} className="mb-6 border-b border-gray-300 pb-6">
                        <div className="flex justify-between mb-4">
                            <div className="text-lg font-semibold">Order ID: {order._id}</div>
                            <div className="text-xs text-gray-500">{order.status}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                                <div className="font-semibold text-sm text-gray-800">Customer Info:</div>
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-600"><strong>Name:</strong> {order.name}</p>
                                    <p className="text-xs text-gray-600"><strong>Email:</strong> {order.email}</p>
                                    <p className="text-xs text-gray-600"><strong>Phone:</strong> {order.phone}</p>
                                    <p className="text-xs text-gray-600"><strong>Address:</strong> {order.address}</p>
                                </div>
                            </div>

                            <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                                <div className="font-semibold text-sm text-gray-800">Payment Method:</div>
                                <p className="text-xs text-gray-600">{order.paymentMethod}</p>
                            </div>

                            <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                                <div className="font-semibold text-sm">Total:</div>
                                <p className="text-md font-semibold">${order.total}</p>
                            </div>
                        </div>


                        <div className="mb-4">
                            <div className="font-semibold text-sm">Ordered Items:</div>
                            {order.listOrderItems.map((item) => (
                                <div key={item._id} className="border-b py-4">
                                    <div className="flex justify-between">
                                        <div className="flex items-center">
                                            <img src={item.images.url} alt={item.title} className="w-12 h-12 mr-4" />
                                            <div>
                                                <p className="text-sm font-semibold">{item.title}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-md font-semibold">${item.price}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserDetail;

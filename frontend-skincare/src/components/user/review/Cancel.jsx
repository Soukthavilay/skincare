import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';

const Cancel = (orderId) => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const id = orderId.orderId;
    const [cancellationReason, setCancellationReason] = useState('');
    const handleChangeInput = (e) => {
        const { value } = e.target;
        setCancellationReason(value);
    };
    const handleCancel = async () => {
        await axios.put(
            `http://localhost:5000/api/orders/cancel-request/${id}`,
            { ...cancellationReason },
            {
                headers: { Authorization: token },
            }
        );
        alert('Wite admin accept your request !');
        window.location.reload();
    }
  return (
    <>
        <h3>Write your cancel request</h3>
        <div className="comment-form">
            <textarea
                name="content"
                id="contentUser"
                cols="30"
                rows="5"
                placeholder="Why you want cancel this order..."
                onChange={handleChangeInput}
            ></textarea>
            <button type="button" onClick={handleCancel} className="btn btn--animated btn--primary--blue btn--border--blue">
                Send Request
            </button>
        </div>
    </>
  )
}

export default Cancel
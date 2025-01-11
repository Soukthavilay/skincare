import { useState } from "react";
import StepTracker from "./StepTracker"
import { useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import { useContext } from "react";


const PaymentMethod = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
    const state = useContext(GlobalState);

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const handleButtonClick = () => {
        if(selectedPaymentMethod === 'cod') {
            history.push('/');
        } else if (selectedPaymentMethod === 'paypal') {
            const callPaypalApi = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/paypal');
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
  return (
    <>
        <div className="form-group">
            <StepTracker current={3} />
            <label htmlFor="payment-method">Payment methods</label>
            <select
                name="payment-method"
                id="paymentMethod"
                value={selectedPaymentMethod}
                onChange={handlePaymentMethodChange}
            >
                <option value="cod">Ship cod</option>
                <option value="paypal">Paypal</option>
            </select>

            <button onClick={handleButtonClick} className="btn btn--animated btn--primary--blue btn--border--blue">
                Pay
            </button>
        </div>
    </>
  )
}

export default PaymentMethod
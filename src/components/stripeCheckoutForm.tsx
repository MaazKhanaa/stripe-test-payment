import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export const StripeCheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setError("Stripe.js has not loaded yet. Please try again.");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setError("Card details could not be found. Please try again.");
            return;
        }

        try { 
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });

            if (error) {
                setError(error.message || "An unknown error occurred.");
                setSuccess(false);
            } else {
                setError(null);
                setSuccess(true);
                console.log("Payment Method:", paymentMethod);
            }
        } catch (error) {
            setError("Payment failed. Please check your card details and try again.");
            setSuccess(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h1 className="mb-5">Stripe Test Payment</h1>
                    <form onSubmit={handleSubmit}>
                        <CardElement className="form-control" />
                        <button type="submit" className="btn btn-primary mt-4 float-end" disabled={!stripe}>
                            Pay Payment
                        </button>
                        {error && <div className="text-danger">{error}</div>}
                        {success && <div className="text-success">Payment Successful</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

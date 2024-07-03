import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51PYSCIRumugNxLDOzVqrc57pnEeMLRZIXw3w4tKYs8EEaZCTWagoJnt8m9xmL5HGZ3tU7ZJLyaQaJOC3x10SaK1c00ktDTKEr1")

export const StripeProvider = ({children}: {children: any}) => (
    <Elements stripe={stripePromise}>{children}</Elements>
)
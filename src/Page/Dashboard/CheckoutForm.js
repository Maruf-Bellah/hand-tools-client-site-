
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ payment }) => {
     const stripe = useStripe();
     const elements = useElements();
     const [cardError, setCardError] = useState('');
     const [clientSecret, setClientSecret] = useState('');

     const { price } = payment;

     useEffect(() => {
          fetch('https://gentle-anchorage-39185.herokuapp.com/create-payment-intent', {
               method: 'POST',
               headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
               },
               body: JSON.stringify({ price })
          })
               .then(res => res.json())
               .then(data => {
                    if (data?.clientSecret) {
                         setClientSecret(data.clientSecret);
                    }
               })

     }, [price])



     const handleSubmit = async (event) => {
          event.preventDefault();

          if (!stripe || !elements) {
               return;
          }

          const card = elements.getElement(CardElement);

          if (card === null) {
               return;
          }

          const { error, paymentMethod } = await stripe.createPaymentMethod({
               type: 'card',
               card
          })

          setCardError(error?.message || '')
     }
     return (
          <>
               <form onSubmit={handleSubmit}>
                    <CardElement
                         options={{
                              style: {
                                   base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                             color: '#aab7c4',
                                        },
                                   },
                                   invalid: {
                                        color: '#9e2146',
                                   },
                              },
                         }}
                    />
                    <button className='btn mt-4 btn-sm btn-success' type="submit" disabled={!stripe}>
                         Pay ...
                    </button>
               </form>
               {
                    cardError && <p className='text-red-500'>{cardError}</p>
               }
          </>
     );
};

export default CheckoutForm;
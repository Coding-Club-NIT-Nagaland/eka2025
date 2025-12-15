import { useEffect } from 'react';

const MockRazorpay = ({ options, onSuccess, onError }) => {
  useEffect(() => {
    // Create a mock Razorpay object
    window.Razorpay = {
      open: () => {
        // Show a confirmation dialog
        const shouldProceed = window.confirm(
          `Mock Payment: Pay ₹${options.amount / 100} for ${options.description}?\n\n` +
          'Click OK to simulate successful payment\n' +
          'Click Cancel to simulate payment failure'
        );

        if (shouldProceed) {
          // Simulate successful payment
          const response = {
            razorpay_payment_id: 'pay_' + Math.random().toString(36).substring(2, 15),
            razorpay_order_id: options.order_id,
            razorpay_signature: 'mock_signature_' + Math.random().toString(36).substring(2, 15)
          };
          
          // Call the success handler with mock data
          if (options.handler) {
            options.handler(response);
          }
          
          // Also call the onSuccess prop if provided
          if (onSuccess) {
            onSuccess({
              ...response,
              orderId: options.order_id,
              amount: options.amount,
              currency: options.currency,
              timestamp: new Date().toISOString()
            });
          }
        } else {
          // Simulate payment failure
          const error = { 
            error: {
              description: 'Payment was cancelled by user',
              code: 'PAYMENT_CANCELLED'
            }
          };
          
          // Call the payment failed handler if it exists
          const paymentFailedHandler = window.Razorpay._handlers?.paymentFailed;
          if (paymentFailedHandler) {
            paymentFailedHandler(error);
          }
          
          // Also call the onError prop if provided
          if (onError) {
            onError(error.error.description);
          }
        }
      },
      on: function(event, callback) {
        // Store the callback for later use
        this._handlers = this._handlers || {};
        this._handlers[event] = callback;
      }
    };

    // Clean up the mock when component unmounts
    return () => {
      if (window.Razorpay) {
        delete window.Razorpay;
      }
    };
  }, [options, onSuccess, onError]);

  return null; // This component doesn't render anything
};

export default MockRazorpay;

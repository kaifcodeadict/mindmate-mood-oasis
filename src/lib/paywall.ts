// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface OrderDetails {
  id: string;
  amount: number;
  currency: string;
}

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface PaywallOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  handler: (response: PaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    [key: string]: string;
  };
  theme?: {
    color?: string;
  };
}

export const initializePayment = (order: OrderDetails, onSuccess: (response: PaymentResponse) => void, onError?: (error: any) => void) => {
  try {
    const options: PaywallOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      handler: response => {
        onSuccess(response);
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      notes: {
        'MindMate Payment': 'Mood tracking premium subscription'
      },
      theme: {
        color: '#6366f1'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Payment initialization failed:', error);
    if (onError) {
      onError(error);
    }
  }
};

import axios from "@/lib/axios";

export const verifyPayment = async (paymentResponse: PaymentResponse, getToken: () => Promise<string | null>): Promise<boolean> => {
  try {
    const token = await getToken();

    const { data } = await axios.post('/payment/verify-payment', paymentResponse, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.success;
  } catch (error) {
    console.error('Payment verification failed:', error);
    return false;
  }
};

export const createOrder = async (amount: number, currency: string = 'INR', getToken: () => Promise<string | null>): Promise<OrderDetails> => {
  try {
    const token = await getToken();
    const { data } = await axios.post('/payment/create-order', {
      amount,
      currency
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("data",data);

    return data;
  } catch (error) {
    console.error('Order creation failed:', error);
    throw error;
  }
};

// Utility function to check if Razorpay is loaded
export const isRazorpayLoaded = (): boolean => {
  return typeof window !== 'undefined' && window.Razorpay !== undefined;
};

// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isRazorpayLoaded()) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay script'));
    document.head.appendChild(script);
  });
};

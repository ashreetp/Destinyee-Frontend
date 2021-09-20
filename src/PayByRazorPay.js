import React, { useEffect } from 'react';

const PayByRazorPay = () => {
    const options = {
        key: 'rzp_test_fexJOswEsG63La',
        amount: 399,
        currency : "INR",
        name: 'Destinyee',
        order_id: "order_HG8iXuzzTJz9xz",
        description: 'some description',
        handler: function(response) {
            console.log(response)
        },
        prefill: {
            name: 'ashreet_p',
            contact: '8328099394',
            email: 'ashreet.p@gmail.com'
        },
        notes: {
            address: 'some address'
        },
        theme: {
            color: '#E41B57',
            hide_topbar: false
        }
    };

    const openPayModal = () => {
        let rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <button onClick={openPayModal}>Pay with Razorpay</button>
        </>
    );
};

export default PayByRazorPay;
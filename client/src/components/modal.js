import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [contactInfo, setContactInfo] = React.useState('');
    const [error, setError] = React.useState(''); // State to manage error messages

    const handleSubmit = (event) => {
        event.preventDefault();

        //matches south african phone number
        const numberRegex = /^(\+27|0)[6-8][0-9]{8}$/;

        if (numberRegex.test(contactInfo)) {
            setError(''); // Clear any previous error message
            onSubmit(contactInfo); // Proceed to payment
            onClose(); // Close the modal
        } else {
            setError('Please enter a valid 10-digit phone number.Make sure it is a South African phone number.'); // Set error message
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Enter Your Phone Number so I can notify you on your order progress</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        value={contactInfo} 
                        onChange={(e) => setContactInfo(e.target.value)} 
                        required 
                    />
                    {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
                    <button type="submit">Proceed to Payment</button>
                </form>
                <div className='cancel-div'>
                    <button className='cancel-btn' onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
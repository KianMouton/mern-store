import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [contactInfo, setContactInfo] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(contactInfo);
        onClose();
    };

    const numberRegex = /^\d{10}$/;

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Enter Your Phone number so i can notify you on your order progress</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        value={contactInfo} 
                        onChange={(e) => setContactInfo(e.target.value)} 
                        required 
                    />
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
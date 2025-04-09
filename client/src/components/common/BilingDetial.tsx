import React, { useState } from 'react';
import styles from ('../common/';

interface BillingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  saveInfo: boolean;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
}

interface BillingDetailsProps {
  onComplete: (details: BillingDetails) => void;
}

const BillingDetails: React.FC<BillingDetailsProps> = ({ onComplete }) => {
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
    saveInfo: false
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setBillingDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
    if (!billingDetails.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!billingDetails.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!billingDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(billingDetails.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!billingDetails.address.trim()) newErrors.address = 'Address is required';
    if (!billingDetails.city.trim()) newErrors.city = 'City is required';
    if (!billingDetails.country.trim()) newErrors.country = 'Country is required';
    if (!billingDetails.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete(billingDetails);
    }
  };

  return (
    <div className="checkout-billing-details">
      <h2>Billing Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={billingDetails.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name*</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={billingDetails.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={billingDetails.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={billingDetails.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Street Address*</label>
          <input
            type="text"
            id="address"
            name="address"
            value={billingDetails.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="city">Town/City*</label>
          <input
            type="text"
            id="city"
            name="city"
            value={billingDetails.city}
            onChange={handleChange}
            className={errors.city ? 'error' : ''}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country">Country*</label>
            <select
              id="country"
              name="country"
              value={billingDetails.country}
              onChange={handleChange}
              className={errors.country ? 'error' : ''}
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
            </select>
            {errors.country && <span className="error-message">{errors.country}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={billingDetails.state}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">Zip/Postal Code*</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={billingDetails.zipCode}
              onChange={handleChange}
              className={errors.zipCode ? 'error' : ''}
            />
            {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
          </div>
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="saveInfo"
            name="saveInfo"
            checked={billingDetails.saveInfo}
            onChange={handleChange}
          />
          <label htmlFor="saveInfo">Save this information for next time</label>
        </div>

        <button type="submit" className="continue-button">
          Continue to Shipping
        </button>
      </form>
    </div>
  );
};

export default BillingDetails;
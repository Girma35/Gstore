import React, { useState } from 'react';
import styles from './BilingDetail.module.css';

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
    <div className={styles.checkoutContainer}>
      <h2 className={styles.sectionTitle}>Billing Details</h2>
      <form onSubmit={handleSubmit} className={styles.billingForm}>
        <div className={styles.formRow}>
          <div className={`${styles.formGroup} ${errors.firstName ? styles.errorField : ''}`}>
            <label htmlFor="firstName" className={styles.inputLabel}>First Name*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={billingDetails.firstName}
              onChange={handleChange}
              className={styles.formInput}
            />
            {errors.firstName && <span className={styles.errorMessage}>{errors.firstName}</span>}
          </div>
          
          <div className={`${styles.formGroup} ${errors.lastName ? styles.errorField : ''}`}>
            <label htmlFor="lastName" className={styles.inputLabel}>Last Name*</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={billingDetails.lastName}
              onChange={handleChange}
              className={styles.formInput}
            />
            {errors.lastName && <span className={styles.errorMessage}>{errors.lastName}</span>}
          </div>
        </div>

        <div className={`${styles.formGroup} ${errors.email ? styles.errorField : ''}`}>
          <label htmlFor="email" className={styles.inputLabel}>Email Address*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={billingDetails.email}
            onChange={handleChange}
            className={styles.formInput}
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.inputLabel}>Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={billingDetails.phone}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>

        <div className={`${styles.formGroup} ${errors.address ? styles.errorField : ''}`}>
          <label htmlFor="address" className={styles.inputLabel}>Street Address*</label>
          <input
            type="text"
            id="address"
            name="address"
            value={billingDetails.address}
            onChange={handleChange}
            className={styles.formInput}
          />
          {errors.address && <span className={styles.errorMessage}>{errors.address}</span>}
        </div>

        <div className={`${styles.formGroup} ${errors.city ? styles.errorField : ''}`}>
          <label htmlFor="city" className={styles.inputLabel}>Town/City*</label>
          <input
            type="text"
            id="city"
            name="city"
            value={billingDetails.city}
            onChange={handleChange}
            className={styles.formInput}
          />
          {errors.city && <span className={styles.errorMessage}>{errors.city}</span>}
        </div>

        <div className={styles.formRow}>
          <div className={`${styles.formGroup} ${errors.country ? styles.errorField : ''}`}>
            <label htmlFor="country" className={styles.inputLabel}>Country*</label>
            <select
              id="country"
              name="country"
              value={billingDetails.country}
              onChange={handleChange}
              className={styles.formSelect}
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="AU">Ethiopia</option>
            </select>
            {errors.country && <span className={styles.errorMessage}>{errors.country}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="state" className={styles.inputLabel}>State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={billingDetails.state}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>

          <div className={`${styles.formGroup} ${errors.zipCode ? styles.errorField : ''}`}>
            <label htmlFor="zipCode" className={styles.inputLabel}>Zip/Postal Code*</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={billingDetails.zipCode}
              onChange={handleChange}
              className={styles.formInput}
            />
            {errors.zipCode && <span className={styles.errorMessage}>{errors.zipCode}</span>}
          </div>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="saveInfo"
            name="saveInfo"
            checked={billingDetails.saveInfo}
            onChange={handleChange}
            className={styles.checkboxInput}
          />
          <label htmlFor="saveInfo" className={styles.checkboxLabel}>
            Save this information for next time
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>
          Continue to Shipping
        </button>
      </form>
    </div>
  );
};

export default BillingDetails;
"use client";

import { MdMessage } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { Button } from '../common/Button';
import styles from './contact_form.module.css';
import { useState, FormEvent } from 'react';
import {Support } from "../../assets/images/index";
import Swal from 'sweetalert2';


interface FormData {
  name: string;
  email: string;
  text: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    text: ''
  });



  const onSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    try{

      event.preventDefault();
      const formData = new FormData(event.currentTarget);
  
      formData.append("access_key", "6f64d16b-4a65-460d-9811-780a2012d987");
      formData.append("subject", "New Contact Form Submission from GStore");
  
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
  
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());
  
      if (res.success) {
        Swal.fire({
          title: '<strong>Thank You for Contacting GStore!</strong> 🛍️',
          html: `
            <div style="border-top: 1px solid #eee; padding-top: 1rem;">
              <p>We've received your message and our team will respond within 24 hours.</p>
              <p style="font-size: 0.9em; color: #666;">Reference ID: ${res.responseId || 'GS-' + Date.now()}</p>
            </div>
          `,
          icon: 'success',
          imageWidth: 120,
          imageAlt: 'GStore Logo',
          confirmButtonText: '<i class="fas fa-shopping-cart"></i> Continue Shopping <a href="/shop">shop</a></p>',
          confirmButtonColor: '#4CAF50',
          showCancelButton: true,
          cancelButtonText: '<i class="fas fa-home"></i> Back to Home',
          footer: `
            <div style="margin-top: 1rem; border-top: 1px solid #eee; padding-top: 1rem;">
              <p style="font-size: 0.8em;">Need immediate help? <a href="/contact">Live Chat</a></p>
            </div>
          `,
          backdrop: `
            rgba(40,167,69,0.2)
            url("/images/gstore-pattern.png")
            center left
            no-repeat
          `,
          width: '600px',
          padding: '2rem',
          timer: 10000,
          timerProgressBar: true,
          didClose: () => {
            // Track when user closes the modal
            console.log('User closed thank you modal');
          }
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/shop';
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            window.location.href = '/';
          }
        });
      }


    }catch (error){

      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
    
   
  }


  return (
    <section className={styles.form_section}>
      <div className={styles.form_container}>
        <div className={styles.contact_form}>
          <div className={styles.top_btn}>
            <Button variant="outlined">
              <MdMessage fontSize='20px'/>
              VIA SUPPORT CHAT
            </Button>
            <Button variant="outlined">
              <FaPhoneAlt fontSize='20px'/>
              VIA CALL
            </Button>
          </div>
          <Button variant="outlined">
            <HiMail fontSize='20px'/>
            VIA EMAIL FORM
          </Button>
        </div>

        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.form_control}>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder='John Peter'
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className={styles.form_control}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder='abc@example.com'
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className={styles.form_control}>
            <label htmlFor="text">Message</label>
            <textarea 
              id="text" 
              name="text" 
              placeholder='Description'
              rows={4}
              value={formData.text}
              onChange={(e) => setFormData({...formData, text: e.target.value})}
              required
            />
          </div>

          <div className={styles.ctaButton}>
            <Button type="submit" variant="filled">
              SUBMIT
            </Button>
          </div>

          {(formData.name || formData.email || formData.text) && (
            <div className={styles.form_result}>
              <p>Name: {formData.name}</p>
              <p>Email: {formData.email}</p>
              <p>Message: {formData.text}</p>
            </div>
          )}
        </form>
      </div>

      <div className={styles.contact_image}>
        <Support />
      </div>
    </section>
  );
};

export default ContactForm;
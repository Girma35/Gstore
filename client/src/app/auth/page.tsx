"use client";

import React ,{useState}from "react";
import PageHeader from "../../components/common/pageHeader";
import PageFooter from "../../components/common/pageFooter";
import styles from './auth.module.css';
import { useRouter } from "next/navigation";


const Auth = () => {
  

  interface AuthRequest {
    email: string;
    password: string;
    action: 'login' | 'register';
    name?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    type?: string;
  }
  
  const initialState: AuthRequest = {
    email: '',
    password: '',
    action: 'login',
    name: '',
    first_name: '',
    last_name: '',
    username: '',
    type: ''
  };
  
  const router = useRouter();
  const [state, setState] = useState<AuthRequest>(initialState);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login form submitted", state);
    
 
  
    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      console.log('Login successful:', data);
      alert("Login successful!"); 
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
const handleSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Register form submitted", state);

  try {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: state.first_name,
        last_name: state.last_name,
        username: state.username,
        email: state.email,
        type: state.type,
        password: state.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    console.log("Registration successful:", data);
    alert("Registration successful!"); 
    router.push('/');
  } catch (error) {
    console.error("Registration error:", error);
    alert(error instanceof Error ? error.message : "Registration failed");
  }
};

  return (
    <>
      <PageHeader title="My Account" />
      
      <div className={styles.section}>


        {/* Login section */}

        <div className={styles.registerContainer}>
      <form className={styles.form} onSubmit={handleSubmitLogin}>
        {/* Email Field */}
        <div className={styles.formGroup}>
          <label htmlFor="Email">Email address</label>
          <input
            type="email"
            className={styles.input}
            id="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="name@example.com"
            required
          />
        </div>

        {/* Password Field */}
        <div className={styles.formGroup}>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            className={styles.input}
            id="Password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        {/* Remember Me Checkbox */}
        <div className={styles.formGroup}>
          <label className={styles.rememberLabel}>
            <input
              type="checkbox"
              name="remember"
              className={styles.checkbox}

              onChange={handleChange}
            />{' '}
            Remember Me
          </label>
        </div>

        {/* Redirect Message */}
        <div className={styles.redirectMessage}>
              <p>
                Don&apos;t have an account?{' '}
                <span role="img" aria-label="thumb pointing right">👉</span>
              </p>
            </div>
            
        {/* Submit Button - Removed nested form */}
        
      
        <div className={styles.buttonWrapper}>
        <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </div>
          
      </form>
    </div>




        {/* Register section */}


        <div className={styles.registerContainer}>
  <form className={styles.form} onSubmit={handleSubmitRegister}>  
    <div className={styles.formGroup}>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        className={styles.input}
        id="firstName"
        name="first_name"
        value={state.first_name}
        onChange={handleChange}
        placeholder="Enter Your First Name"
        required
      />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        className={styles.input}
        id="lastName"
        name="last_name"
        value={state.last_name}
        onChange={handleChange}
        placeholder="Enter Your Last Name"
        required
      />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        className={styles.input}
        id="username"
        name="username"
        value={state.username}
        onChange={handleChange}
        placeholder="Choose a Username"
        required
      />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="email">Email address</label>
      <input
        type="email"
        className={styles.input}
        id="email"
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="name@example.com"
        required
      />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="userType">User Type</label>
      <input
        type="text"
        className={styles.input}
        id="userType"
        name="type"
        value={state.type}
        onChange={handleChange}
        placeholder="Enter user type"
        required
      />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        className={styles.input}
        id="password"
        placeholder="Password"
        name="password"
        value={state.password}
        onChange={handleChange}
        required
      />
    </div>

    <div className={styles.redirectMessage}>
      <p>
        Already have an account?{' '}
        <span role="img" aria-label="pointing left">👈</span>{' '}
      </p>
    </div>
        <div className={styles.buttonWrapper}>

        <button type="submit" className={styles.submitButton}>
        Register
      </button>
      
        </div>
    

  </form>
</div>
</div>



      <PageFooter />
    </>
  );
};

export default Auth;

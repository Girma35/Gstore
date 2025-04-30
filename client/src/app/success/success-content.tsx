'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Style from "./style.module.css";
import Link from "next/link";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session_id = searchParams.get('session_id');

    if (!session_id) {
      setLoading(false);
      return;
    }

    const fetchSessionStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/session-status?session_id=${session_id}`);
        const data = await response.json();

        setStatus(data.status);
        setEmail(data.customer_email);
      } catch (err) {
        console.error('Failed to get session status:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionStatus();
  }, [searchParams]);

  return (
    <div className={Style.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={Style.card}
      >
        <div className={Style.header}>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
            className={Style.iconWrapper}
          >
            <CheckCircle2 size={64} className={Style.icon} strokeWidth={1.5} />
          </motion.div>
          <h1 className={Style.title}>Payment Successful</h1>
          <p className={Style.subtitle}>Thank you for your purchase</p>
        </div>

        <div className={Style.content}>
          {loading ? (
            <div className={Style.loading}>
              <div className={Style.spinner}></div>
              <p className={Style.loadingText}>Loading session details...</p>
            </div>
          ) : (
            <div className={Style.sessionDetails}>
              <div className={Style.row}>
                <span className={Style.label}>Status</span>
                <span className={Style.value}>{status}</span>
              </div>
              <div className={Style.row}>
                <span className={Style.label}>Confirmation sent to</span>
                <span className={Style.value}>{email}</span>
              </div>

              <button 
                className={Style.backButton}
                onClick={() => window.location.href = '/'}
              >
                Back to Home
              </button>
            </div>
          )}
        </div>

        <div className={Style.footer}>
          Need help? <Link href="/contact" className={Style.supportLink}>Contact support</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessContent;

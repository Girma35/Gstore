"use client";

import React ,{useState}from "react";
import PageHeader from "../../components/common/pageHeader";
import PageFooter from "../../components/common/pageFooter";
import ContactForm from "@/components/contactForm/contact";

const Contact  = () => {

  return (
    <>
      <PageHeader title="Contact" />
      <section>
   <ContactForm />
      </section>


      <PageFooter />
    </>
  );
};

export default Contact;

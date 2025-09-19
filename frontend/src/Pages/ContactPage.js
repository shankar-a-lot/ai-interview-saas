import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Heading from '../components/Heading';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    toast.success('Your message has been sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <Heading>Get in Touch</Heading>
      <div className="max-w-2xl mx-auto backdrop-blur-sm bg-white/10 p-8 rounded-lg shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-poppins text-gray-300 mb-2" htmlFor="name">Name</label>
            <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary" type="text" id="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block font-poppins text-gray-300 mb-2" htmlFor="email">Email</label>
            <input className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary" type="email" id="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label className="block font-poppins text-gray-300 mb-2" htmlFor="message">Message</label>
            <textarea className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 h-32 text-white focus:outline-none focus:border-primary" id="message" value={formData.message} onChange={handleChange}></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="font-poppins bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-lg text-lg">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
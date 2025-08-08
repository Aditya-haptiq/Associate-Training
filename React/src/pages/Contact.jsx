import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      content: '+91 1234567890',
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      content: 'support@clothify.com',
      description: 'Online support'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Office',
      content: '123 Baner-Pashan Road, Pune',
      description: 'Visit us during working hours'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      content: 'Mon-Fri: 8am-5pm',
      description: 'Sat-Sun: 10am-3pm'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-extrabold mb-4">Get in Touch</h1>
          <p className="text-xl text-blue-100">
            We’re here to help. Drop us a message and we’ll get back to you as soon as we can.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

            {submitted && (
              <div className="mb-6 bg-green-100 border border-green-300 rounded-lg p-4">
                <p className="text-green-800 font-medium">
                  Thank you! We'll get back to you shortly.
                </p>
              </div>
            )}

           <form onSubmit={handleSubmit} className="space-y-6">
  <div className="grid md:grid-cols-2 gap-6">
    {/* Name */}
    <div className="flex flex-col">
      <label htmlFor="name" className="label">Name *</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
        className="input"
        placeholder="Your full name"
      />
    </div>

    {/* Email */}
    <div className="flex flex-col">
      <label htmlFor="email" className="label">Email *</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        className="input"
        placeholder="Your email address"
      />
    </div>
  </div>

  {/* Subject */}
  <div className="flex flex-col">
    <label htmlFor="subject" className="label">Subject *</label>
    <input
      type="text"
      id="subject"
      name="subject"
      value={formData.subject}
      onChange={handleInputChange}
      required
      className="input"
      placeholder="What is this about?"
    />
  </div>

  {/* Message */}
  <div className="flex flex-col">
    <label htmlFor="message" className="label">Message *</label>
    <textarea
      id="message"
      name="message"
      rows="6"
      value={formData.message}
      onChange={handleInputChange}
      required
      className="input resize-none"
      placeholder="Write your message here..."
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full py-3 px-4 flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:opacity-90 transition"
  >
    <Send className="w-5 h-5" />
    {isSubmitting ? 'Sending...' : 'Send Message'}
  </button>
</form>

          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-600">We are always open to talk and assist you with anything you need.</p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg flex items-start gap-4">
                  <div className="text-indigo-600 mt-1">{info.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{info.title}</h3>
                    <p className="text-gray-800">{info.content}</p>
                    <p className="text-gray-500 text-sm">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-indigo-800 mb-1">Looking for Quick Help?</h3>
              <p className="text-indigo-700 text-sm mb-3">Check out our FAQ section for instant answers.</p>
              <button className="text-indigo-700 font-semibold hover:underline">Go to FAQ →</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

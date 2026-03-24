import { useState } from 'react';
import type { FormEvent } from 'react';
import './Contact.css';

const Contact = () => {
  // We use useState to create "memory" for our form fields.
  // name, email, and message are the current values.
  // setName, setEmail, and setMessage are functions to update those values.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevents the page from refreshing when the form is submitted
    
    // In a real app, you'd send this data to an API
    console.log('Form Submitted:', { name, email, message });
    
    alert('Thanks for reaching out! (Check the console to see your data)');
    
    // Clear the form after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2>Get In Touch</h2>
        <p>Have a project in mind or just want to say hi? Feel free to send a message!</p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Your Name"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="your.email@example.com"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              rows={5} 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Tell me about your project..."
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

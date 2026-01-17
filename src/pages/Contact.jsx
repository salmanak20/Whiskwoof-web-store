import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/Button';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-info">
                    <h1>Get in Touch</h1>
                    <p>
                        Have questions about our grooming products? Need help with an order?
                        We're here to help! Fill out the form or reach out directly.
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <div className="contact-icon"><Mail size={24} /></div>
                            <div>
                                <h3>Email Us</h3>
                                <p>support@whiskwoof.com</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon"><Phone size={24} /></div>
                            <div>
                                <h3>Call Us</h3>
                                <p>+1 (555) 123-4567</p>
                                <p className="text-sm text-gray-500">Mon-Fri, 9am - 6pm EST</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon"><MapPin size={24} /></div>
                            <div>
                                <h3>Visit Us</h3>
                                <p>123 Pet Street, Paws City, PC 12345</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-form-card">
                    {isSuccess ? (
                        <div className="success-message">
                            <h3>Message Sent!</h3>
                            <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
                            <Button variant="outline" onClick={() => setIsSuccess(false)} className="mt-4">
                                Send Another Message
                            </Button>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <h2>Send us a Message</h2>

                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-field"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input-field"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Subject</label>
                                <select
                                    name="subject"
                                    className="input-field"
                                    value={formData.subject}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a topic</option>
                                    <option value="Order Status">Order Status</option>
                                    <option value="Product Question">Product Question</option>
                                    <option value="Returns">Returns & Exchanges</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    className="input-field"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : <><Send size={18} style={{ marginRight: '8px' }} /> Send Message</>}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;

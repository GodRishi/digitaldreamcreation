import React, { useState } from 'react';
import { Reveal } from './ui/Reveal';
import { Send, MapPin, Mail, Phone, MessageCircle, Check, Loader2, AlertCircle } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventDate: '',
    eventType: 'Wedding',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/saharishav.1940@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Enquiry: ${formData.eventType} - ${formData.name}`,
          _template: 'table', // Formats the email nicely
          _captcha: 'false'   // Disables captcha for smoother UX (optional)
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', eventDate: '', eventType: 'Wedding', message: '' });
        // Reset status after 5 seconds so they can send another if needed
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-20 md:py-24 bg-gray-100 dark:bg-cinema-dark relative transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-12">
            <span className="text-gold-500 text-xs tracking-[0.2em] uppercase font-bold">Get In Touch</span>
            <h2 className="font-serif text-3xl md:text-5xl text-gray-900 dark:text-white mt-3 font-bold">Let's Create Magic</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-base md:text-lg font-light">
              We accept a limited number of video editing projects each year to ensure the highest quality. 
              Fill out the form below to check availability for your dates.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <Reveal>
             <div className="space-y-8 h-full flex flex-col justify-center">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gold-500 shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-900 dark:text-white font-serif mb-1 font-bold">Call Us</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-1 text-xs md:text-sm font-medium">Mon-Sat from 10am to 8pm.</p>
                    <a href="tel:+916291645907" className="text-lg md:text-xl text-gray-800 dark:text-white hover:text-gold-500 transition-colors font-bold tracking-wide">+91 62916 45907</a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-green-500 shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-900 dark:text-white font-serif mb-1 font-bold">WhatsApp</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-1 text-xs md:text-sm font-medium">Chat with us directly.</p>
                    <a href="https://wa.me/919339316872" target="_blank" rel="noreferrer" className="text-lg md:text-xl text-gray-800 dark:text-white hover:text-green-500 transition-colors font-bold tracking-wide">+91 93393 16872</a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gold-500 shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-900 dark:text-white font-serif mb-1 font-bold">Email Us</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-1 text-xs md:text-sm font-medium">For collaborations and general queries.</p>
                    <a href="mailto:saharishav.1940@gmail.com" className="text-base md:text-lg text-gray-800 dark:text-white hover:text-gold-500 transition-colors font-bold break-all">saharishav.1940@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gold-500 shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-900 dark:text-white font-serif mb-1 font-bold">Studio Location</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg font-medium leading-relaxed">
                      Kolkata, West Bengal<br/>
                      <span className="text-gold-500 text-xs uppercase tracking-wider font-bold">Available Globally</span>
                    </p>
                  </div>
                </div>
             </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.4}>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-white/5 p-6 md:p-10 rounded-sm border border-gray-200 dark:border-white/5 space-y-5 shadow-2xl dark:shadow-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-[0.65rem] uppercase tracking-widest text-gray-500 mb-2 font-bold">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-sm px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors placeholder-gray-400 dark:placeholder-gray-600 font-medium"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[0.65rem] uppercase tracking-widest text-gray-500 mb-2 font-bold">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-sm px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors placeholder-gray-400 dark:placeholder-gray-600 font-medium"
                    placeholder="+91..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="eventType" className="block text-[0.65rem] uppercase tracking-widest text-gray-500 mb-2 font-bold">Event Type</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-sm px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors font-medium"
                  >
                    <option>Wedding</option>
                    <option>Reception</option>
                    <option>Pre-Wedding</option>
                    <option>Birthday</option>
                    <option>Rice Ceremony</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="eventDate" className="block text-[0.65rem] uppercase tracking-widest text-gray-500 mb-2 font-bold">Event Date</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-sm px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors placeholder-gray-400 dark:placeholder-gray-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-[0.65rem] uppercase tracking-widest text-gray-500 mb-2 font-bold">Tell us about your project</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-sm px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors placeholder-gray-400 dark:placeholder-gray-600 font-medium"
                  placeholder="Venue details, specific editing requirements, etc."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={`w-full py-3.5 rounded-sm font-bold tracking-[0.15em] uppercase transition-all flex items-center justify-center gap-2 shadow-lg text-sm ${
                  status === 'success' 
                  ? 'bg-green-600 text-white cursor-default' 
                  : status === 'error'
                  ? 'bg-red-600 text-white'
                  : 'bg-gold-500 hover:bg-gold-600 text-white dark:text-cinema-black hover:shadow-gold-500/30'
                }`}
              >
                {status === 'submitting' ? (
                  <>Sending <Loader2 size={18} className="animate-spin" /></>
                ) : status === 'success' ? (
                  <>Message Sent <Check size={18} /></>
                ) : status === 'error' ? (
                   <>Failed. Retry? <AlertCircle size={18} /></>
                ) : (
                  <>Send Enquiry <Send size={16} /></>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
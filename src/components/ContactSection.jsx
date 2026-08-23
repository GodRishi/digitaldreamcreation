import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    names: '',
    phone: '',
    email: '',
    eventDate: '',
    venue: '',
    filmType: 'Full Wedding Film',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-14 md:py-20 px-6 md:px-16 bg-[#000000] relative">
      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3D1417]/30 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Booking Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full apple-glass text-[10px] uppercase font-cinzel tracking-[0.25em] text-[#D9B36C] mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Booking 2025/2026 Celebrations</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-serif text-[#F5F5F7] leading-[1.1] mb-6">
                Reserve Your <span className="italic font-serif text-gold-gradient font-normal">Wedding Date</span>
              </h2>

              <p className="text-[#86868B] font-light leading-relaxed mb-8 text-sm sm:text-base">
                Fill out the form or reach out directly to check date availability and discuss bespoke film packaging for your celebration.
              </p>

              {/* Direct Info */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#000000] border border-[#2C2C2E] flex items-center justify-center text-[#D9B36C] shrink-0 shadow-lg">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-cinzel tracking-[0.2em] text-[#86868B]">Direct Line / WhatsApp</p>
                    <a href="tel:+919830012345" className="text-sm font-medium text-[#F5F5F7] hover:text-[#D9B36C] transition-colors mt-0.5 block">
                      +91 98300 12345 / +91 70034 56789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#000000] border border-[#2C2C2E] flex items-center justify-center text-[#D9B36C] shrink-0 shadow-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-cinzel tracking-[0.2em] text-[#86868B]">Direct Email</p>
                    <a href="mailto:hello@digitaldreamcreation.com" className="text-sm font-medium text-[#F5F5F7] hover:text-[#D9B36C] transition-colors mt-0.5 block">
                      hello@digitaldreamcreation.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#000000] border border-[#2C2C2E] flex items-center justify-center text-[#D9B36C] shrink-0 shadow-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-cinzel tracking-[0.2em] text-[#86868B]">Studio Location</p>
                    <p className="text-sm text-[#F5F5F7] mt-0.5">
                      Southern Avenue, Ballygunge, Kolkata 700029
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl apple-glass border border-[#2C2C2E] text-xs text-[#86868B] font-light">
              🔒 <span className="text-[#F5F5F7] font-medium">Guaranteed Response</span> within 24 hours. Your details remain strictly confidential.
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl apple-glass-card border border-[#2C2C2E] shadow-2xl relative overflow-hidden">
              
              {formSubmitted ? (
                <div className="py-16 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#D9B36C]/20 border border-[#D9B36C]/50 text-[#D9B36C] flex items-center justify-center mb-6 shadow-xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-serif text-[#F5F5F7] mb-3">
                    Enquiry Received
                  </h3>
                  <p className="text-sm text-[#86868B] max-w-md mx-auto mb-8 leading-relaxed font-light">
                    Thank you for sharing your story, <span className="text-[#D9B36C] font-medium">{formData.names}</span>. Rishav will personally review date availability and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-8 py-3 rounded-full bg-[#000000] border border-[#2C2C2E] text-xs font-cinzel tracking-[0.2em] uppercase text-[#F5F5F7] hover:border-[#D9B36C] cursor-pointer transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Names */}
                  <div>
                    <label className="block text-[10px] uppercase font-cinzel tracking-[0.2em] text-[#86868B] font-medium mb-2">
                      Couple Names *
                    </label>
                    <input
                      type="text"
                      name="names"
                      required
                      placeholder="e.g. Ananya & Aarav"
                      value={formData.names}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-xl bg-[#000000] border border-[#2C2C2E] text-[#F5F5F7] placeholder-[#86868B]/40 text-sm focus:outline-none focus:border-[#D9B36C] transition-colors"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase font-cinzel tracking-[0.2em] text-[#86868B] font-medium mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-xl bg-[#000000] border border-[#2C2C2E] text-[#F5F5F7] placeholder-[#86868B]/40 text-sm focus:outline-none focus:border-[#D9B36C] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-cinzel tracking-[0.2em] text-[#86868B] font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="ananya@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-xl bg-[#000000] border border-[#2C2C2E] text-[#F5F5F7] placeholder-[#86868B]/40 text-sm focus:outline-none focus:border-[#D9B36C] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Date & Venue */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase font-cinzel tracking-[0.2em] text-[#86868B] font-medium mb-2">
                        Wedding Date *
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        required
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-xl bg-[#000000] border border-[#2C2C2E] text-[#F5F5F7] text-sm focus:outline-none focus:border-[#D9B36C] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-cinzel tracking-[0.2em] text-[#86868B] font-medium mb-2">
                        Venue / Location
                      </label>
                      <input
                        type="text"
                        name="venue"
                        placeholder="e.g. Vedic Village, Kolkata"
                        value={formData.venue}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-xl bg-[#000000] border border-[#2C2C2E] text-[#F5F5F7] placeholder-[#86868B]/40 text-sm focus:outline-none focus:border-[#D9B36C] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Package Interest */}
                  <div>
                    <label className="block text-[10px] uppercase font-cinzel tracking-[0.2em] text-[#86868B] font-medium mb-2">
                      Film Package Interest
                    </label>
                    <select
                      name="filmType"
                      value={formData.filmType}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-xl bg-[#000000] border border-[#2C2C2E] text-[#F5F5F7] text-sm focus:outline-none focus:border-[#D9B36C] transition-colors"
                    >
                      <option value="Full Wedding Film">Full Cinematic Wedding Film + Teaser</option>
                      <option value="Pre-Wedding Engagement">Pre-Wedding / Engagement Film</option>
                      <option value="Complete Cinema & Album Suite">Complete Cinema Film & Heirloom Album Suite</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] uppercase font-cinzel tracking-[0.2em] text-[#86868B] font-medium mb-2">
                      Tell Us About Your Vision
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Share your wedding theme, special moments, or any specific questions..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-xl bg-[#000000] border border-[#2C2C2E] text-[#F5F5F7] placeholder-[#86868B]/40 text-sm focus:outline-none focus:border-[#D9B36C] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gold-gradient text-[#000000] font-semibold text-xs font-cinzel tracking-[0.2em] uppercase shadow-xl shadow-[#D9B36C]/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Check Date & Request Pricing</span>
                    <Send className="w-4 h-4" />
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

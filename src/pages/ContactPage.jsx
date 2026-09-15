import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="badge-label">CONTACT US</span>
        <h1 className="text-4xl font-extrabold text-gray-900">We’re Here to Help</h1>
        <p className="text-xs text-gray-500">Have questions about bulk orders, custom branding, or sample kits?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#ECE7E8] text-center space-y-2">
          <div className="w-12 h-12 bg-[#F5F5F5] text-[#000000] rounded-2xl flex items-center justify-center mx-auto">
            <PhoneCall size={22} />
          </div>
          <h4 className="font-bold text-gray-900 text-sm">Call Us</h4>
          <p className="text-xs text-gray-500">+91 98765 43210</p>
          <p className="text-[10px] text-gray-400">Mon-Sat: 9am - 7pm</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#ECE7E8] text-center space-y-2">
          <div className="w-12 h-12 bg-[#F5F5F5] text-[#000000] rounded-2xl flex items-center justify-center mx-auto">
            <Mail size={22} />
          </div>
          <h4 className="font-bold text-gray-900 text-sm">Email Support</h4>
          <p className="text-xs text-gray-500">support@corekraft.in</p>
          <p className="text-[10px] text-gray-400">2 hour reply SLA</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#ECE7E8] text-center space-y-2">
          <div className="w-12 h-12 bg-[#F5F5F5] text-[#000000] rounded-2xl flex items-center justify-center mx-auto">
            <MapPin size={22} />
          </div>
          <h4 className="font-bold text-gray-900 text-sm">Head Office</h4>
          <p className="text-xs text-gray-500">Corekraft Business Tower, Cyber City, Gurugram / Mumbai</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#ECE7E8] shadow-sm max-w-2xl mx-auto">
        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 size={40} className="text-[#000000] mx-auto" />
            <h4 className="font-bold text-lg text-gray-900">Message Sent!</h4>
            <p className="text-xs text-gray-500">Our customer success team will reach out to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Send Us a Quick Message</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" required className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000]" />
              <input type="email" placeholder="Email Address" required className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000]" />
            </div>
            <textarea rows="4" placeholder="Your message..." required className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000]"></textarea>
            <button type="submit" className="w-full bg-[#000000] text-white font-bold py-3 rounded-full hover:bg-[#111111] transition">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

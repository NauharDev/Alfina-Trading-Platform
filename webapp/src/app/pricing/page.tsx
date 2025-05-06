'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createCheckoutSession } from './utils/checkout';

export default function PricingPage() {
  const handleCheckout = (priceId : any) => {
    createCheckoutSession(priceId); // Trigger Stripe Checkout session creation
  };

  return (
    <main className="h-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400 text-transparent bg-clip-text animate-gradient"
            >
              Choose Your Trading Plan
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-700 mb-8"
            >
              Select the perfect plan for your trading needs. Start with a free trial and upgrade anytime.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Basic Plan',
                price: '$29',
                period: '/month',
                features: [
                  'Access to basic algorithms',
                  'Up to 10 rule-based strategies',
                  'Email support',
                  'Basic backtesting'
                ],
                priceId: 'price_1R6YQxJuhN99qqEBlz0wxuOb', // Basic price ID
                cta: 'Choose Basic',
                highlighted: false
              },
              {
                title: 'Pro Plan',
                price: '$59',
                period: '/month',
                features: [
                  'Access to all algorithms',
                  'Unlimited rule-based strategies',
                  'Priority email support',
                  'Monthly performance reports',
                  'Advanced backtesting'
                ],
                priceId: 'price_1R6YRdJuhN99qqEBE3YWeWf0', // Pro price ID
                cta: 'Choose Pro',
                highlighted: true
              },
              {
                title: 'Enterprise Plan',
                price: 'Custom',
                period: '',
                features: [
                  'Custom algorithm development',
                  'Dedicated account manager',
                  '24/7 support',
                  'Advanced performance analytics',
                  'API access',
                  'White-label solutions'
                ],
                cta: 'Contact Us',
                link: '/contact',
                highlighted: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className={`rounded-2xl overflow-hidden shadow-xl ${
                  plan.highlighted 
                    ? 'border-2 border-indigo-500 relative' 
                    : 'border border-gray-200'
                } flex flex-col`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 inset-x-0 bg-indigo-500 text-white text-center text-sm py-1 font-medium">
                    MOST POPULAR
                  </div>
                )}
                <div className={`p-8 ${plan.highlighted ? 'pt-10' : ''} flex-1 flex flex-col`}>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.title}</h3>
                  <div className="flex items-baseline mb-8">
                    <span className="text-4xl font-bold text-indigo-600">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 mt-0.5">
                          ✓
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  {plan.link ? (
                    <Link href={plan.link}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all shadow-md mt-auto ${
                          plan.highlighted
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                            : 'bg-white text-indigo-600 border border-indigo-500 hover:bg-gray-50'
                        }`}
                      >
                        {plan.cta}
                      </motion.button>
                    </Link>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all shadow-md mt-auto ${
                        plan.highlighted
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                          : 'bg-white text-indigo-600 border border-indigo-500 hover:bg-gray-50'
                      }`}
                      onClick={() => handleCheckout(plan.priceId)} // Trigger checkout on button click
                    >
                      {plan.cta}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Compare Our Plans
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Find the right plan for your trading strategy needs
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto overflow-x-auto rounded-xl shadow-lg"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 text-left text-gray-700 font-semibold">Features</th>
                  <th className="py-4 px-6 text-center text-gray-700 font-semibold">Basic</th>
                  <th className="py-4 px-6 text-center text-indigo-600 font-semibold">Pro</th>
                  <th className="py-4 px-6 text-center text-gray-700 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Access to algorithms', basic: 'Basic', pro: 'All', enterprise: 'Custom' },
                  { feature: 'Rule-based strategies', basic: 'Up to 10', pro: 'Unlimited', enterprise: 'Unlimited' },
                  { feature: 'Email support', basic: 'Standard', pro: 'Priority', enterprise: '24/7' },
                  { feature: 'Performance reports', basic: 'Basic', pro: 'Monthly', enterprise: 'Advanced' },
                  { feature: 'Backtesting capabilities', basic: 'Limited', pro: 'Advanced', enterprise: 'Enterprise-grade' },
                  { feature: 'API access', basic: '✕', pro: '✓', enterprise: '✓' },
                  { feature: 'White-label solutions', basic: '✕', pro: '✕', enterprise: '✓' }
                ].map((row, index) => (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="py-4 px-6 text-left font-medium text-gray-800">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row.basic}</td>
                    <td className="py-4 px-6 text-center text-indigo-600 font-medium">{row.pro}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{row.enterprise}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-blue-50 py-20">
        <div className="container mx-auto px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
          >
            What Our Customers Say
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "The Basic Plan is perfect for my needs. The algorithms are easy to use and the support team is very responsive.",
                author: "John Doe",
                role: "Retail Trader"
              },
              {
                text: "The Pro Plan has helped me optimize my trading strategies. The performance reports are very insightful and have significantly improved my returns.",
                author: "Jane Smith",
                role: "Day Trader"
              },
              {
                text: "The Enterprise Plan is worth every penny. The custom algorithms and dedicated support have transformed my trading business.",
                author: "Michael Johnson",
                role: "Hedge Fund Manager"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="text-indigo-500 text-4xl mb-4">"</div>
                <p className="text-gray-700 mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-800">{testimonial.author}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Everything you need to know about our plans and pricing
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid gap-8">
            {[
              {
                question: "What is included in the Basic Plan?",
                answer: "The Basic Plan includes access to our core algorithms, up to 10 rule-based strategies, standard email support, and basic backtesting capabilities. It's perfect for beginners and traders with simple needs."
              },
              {
                question: "Can I upgrade my plan later?",
                answer: "Yes, you can upgrade your plan at any time. Your new plan will be effective immediately, and we'll prorate the charges for the remainder of your billing cycle."
              },
              {
                question: "Do you offer a free trial?",
                answer: "Yes, we offer a 14-day free trial for both our Basic and Pro plans. No credit card required to start. Experience the full capabilities before making a decision."
              },
              {
                question: "What happens if I exceed the rule-based strategy limit?",
                answer: "If you need more than 10 rule-based strategies on the Basic plan, you'll receive a notification suggesting an upgrade to the Pro plan. We won't automatically charge you for the upgrade."
              },
              {
                question: "How does the Pro plan differ from the Basic plan?",
                answer: "The Pro plan offers unlimited rule-based strategies, access to all our algorithms, priority email support, monthly performance reports, and advanced backtesting capabilities. It's designed for serious traders who need more power and flexibility."
              },
              {
                question: "What kind of support can I expect?",
                answer: "Basic plan users receive standard email support with a response time of 24-48 hours. Pro plan users get priority email support with response times under 12 hours. Enterprise customers receive 24/7 support via email, phone, and chat, plus a dedicated account manager."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-20">
        <div className="container mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Start Your 14-Day Free Trial
            </h2>
            <p className="text-xl text-white/90 mb-8">
              No credit card required. Experience the full power of our platform risk-free.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/signup" 
                className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
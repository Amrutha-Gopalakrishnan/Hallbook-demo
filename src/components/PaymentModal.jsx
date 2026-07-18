import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { CheckCircle2, Loader2, CreditCard, Banknote, Building2 } from 'lucide-react';
import { bookHall, bookRoom, getCurrentUser } from '../data/db';
import AuthModal from './AuthModal';

const PaymentModal = ({ isOpen, onClose, data, type }) => {
  const [step, setStep] = useState(1); // 1: summary, 2: processing, 3: success
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setProcessing(true);
    setStep(2);
    setTimeout(() => {
      if (type === 'hall') {
        bookHall(data);
      } else {
        bookRoom(data);
      }
      setStep(3);
      setProcessing(false);
    }, 2000);
  };

  const closeAndReset = () => {
    onClose();
    setTimeout(() => setStep(1), 300);
  };

  // Mock calculation
  let basePrice = 0;
  let addons = 0;

  if (type === 'hall') {
    basePrice = 150000;
    if (data.decoration) addons += 50000;
    if (data.catering) addons += 80000;
    if (data.rooms) addons += 20000;
  } else {
    basePrice = 3500 * (data.nights || 1);
  }

  const subtotal = basePrice + addons;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative"
          >
            {step === 1 && (
              <>
                <div className="bg-zinc-50 border-b border-zinc-100 p-6 flex justify-between items-center">
                  <h3 className="font-serif text-2xl text-zinc-900">Payment Summary</h3>
                  <button onClick={closeAndReset} className="text-zinc-400 hover:text-zinc-900 transition-colors">
                    <Icon icon="solar:close-circle-linear" className="text-2xl" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-zinc-600">
                      <span>{type === 'hall' ? 'Mandapam Base Booking' : 'Room Booking'}</span>
                      <span className="font-medium text-zinc-900">₹{basePrice.toLocaleString()}</span>
                    </div>
                    {type === 'hall' && data.decoration && (
                      <div className="flex justify-between text-zinc-600">
                        <span>Premium Decoration</span>
                        <span className="font-medium text-zinc-900">₹50,000</span>
                      </div>
                    )}
                    {type === 'hall' && data.catering && (
                      <div className="flex justify-between text-zinc-600">
                        <span>Standard Catering</span>
                        <span className="font-medium text-zinc-900">₹80,000</span>
                      </div>
                    )}
                    {type === 'hall' && data.rooms && (
                      <div className="flex justify-between text-zinc-600">
                        <span>Guest Accommodation (10 Rooms)</span>
                        <span className="font-medium text-zinc-900">₹20,000</span>
                      </div>
                    )}

                    <div className="border-t border-zinc-100 pt-3 flex justify-between text-zinc-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-zinc-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>GST (18%)</span>
                      <span className="font-medium text-zinc-900">₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-zinc-200 pt-4 flex justify-between items-center mt-2">
                      <span className="font-semibold text-lg text-zinc-900">Total Amount</span>
                      <span className="font-serif text-2xl text-amber-600">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">Select Payment Method</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSelectedMethod('upi')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${selectedMethod === 'upi' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-zinc-200 hover:border-amber-300 text-zinc-600'}`}
                      >
                        <Icon icon="solar:smartphone-rotate-2-linear" className="text-2xl mb-1" />
                        <span className="text-xs font-medium">UPI</span>
                      </button>
                      <button
                        onClick={() => setSelectedMethod('card')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${selectedMethod === 'card' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-zinc-200 hover:border-amber-300 text-zinc-600'}`}
                      >
                        <CreditCard className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">Card</span>
                      </button>
                      <button
                        onClick={() => setSelectedMethod('netbanking')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${selectedMethod === 'netbanking' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-zinc-200 hover:border-amber-300 text-zinc-600'}`}
                      >
                        <Building2 className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">Net Banking</span>
                      </button>
                      <button
                        onClick={() => setSelectedMethod('cash')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${selectedMethod === 'cash' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-zinc-200 hover:border-amber-300 text-zinc-600'}`}
                      >
                        <Banknote className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">Cash at Venue</span>
                      </button>
                    </div>
                  </div>

                  {data.bookingMode && data.bookingMode.includes("In-Person") ? (
                    <div className="space-y-6">
                      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-start gap-4">
                        <Icon icon="solar:info-circle-bold-duotone" className="text-amber-500 text-3xl shrink-0" />
                        <p className="text-amber-800 font-medium">You have selected In-Person booking. Please visit the venue within 24 hours to complete your payment and confirm your reservation.</p>
                      </div>
                      <button
                        disabled={processing}
                        onClick={handlePayment}
                        className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-zinc-900 transition-all flex items-center justify-center gap-2"
                      >
                        {processing ? <Icon icon="solar:spinner-bold" className="animate-spin text-xl" /> : 'Confirm Booking'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                        <label className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2 block">Card Information</label>
                        <input type="text" placeholder="Card Number" className="w-full bg-transparent border-b border-zinc-200 py-2 outline-none focus:border-amber-500 mb-4" />
                        <div className="flex gap-4">
                          <input type="text" placeholder="MM/YY" className="w-1/2 bg-transparent border-b border-zinc-200 py-2 outline-none focus:border-amber-500" />
                          <input type="text" placeholder="CVC" className="w-1/2 bg-transparent border-b border-zinc-200 py-2 outline-none focus:border-amber-500" />
                        </div>
                      </div>
                      <button
                        disabled={processing}
                        onClick={handlePayment}
                        className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-zinc-900 transition-all flex items-center justify-center gap-2"
                      >
                        {processing ? <Icon icon="solar:spinner-bold" className="animate-spin text-xl" /> : `Pay ₹${total.toLocaleString()}`}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-6" />
                <h3 className="font-serif text-2xl text-zinc-900 mb-2">Processing Payment</h3>
                <p className="text-zinc-500 text-center">Please do not close this window or press back.</p>
              </div>
            )}

            {step === 3 && (
              <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                </motion.div>
                <h3 className="font-serif text-3xl text-zinc-900 mb-2">Booking Confirmed!</h3>
                <p className="text-zinc-500 text-center mb-8">Your {type === 'hall' ? 'Mandapam' : 'Room'} booking has been successfully secured. A confirmation email has been sent.</p>
                <button
                  onClick={closeAndReset}
                  className="bg-zinc-100 text-zinc-900 px-8 py-3 rounded-xl font-medium hover:bg-zinc-200 transition-colors"
                >
                  Back to Website
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </AnimatePresence>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} onSuccess={() => { setAuthModalOpen(false); handlePayment(); }} />
    </>
  );
};

export default PaymentModal;

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  RefreshCcw, 
  ArrowLeft, 
  Info,
  DollarSign,
  Percent
} from 'lucide-react';

export default function VATCalculator() {
  const [amount, setAmount] = useState<string>('');
  const [isInclusive, setIsInclusive] = useState<boolean>(false);
  const [rate, setRate] = useState<string>('14');
  const [results, setResults] = useState<{
    vatAmount: number;
    amountBeforeVat: number;
    totalAmount: number;
  } | null>(null);

  const calculateVAT = () => {
    const numAmount = parseFloat(amount);
    const numRate = parseFloat(rate);

    if (isNaN(numAmount) || isNaN(numRate)) return;

    let vatAmount = 0;
    let amountBeforeVat = 0;
    let totalAmount = 0;

    if (!isInclusive) {
      vatAmount = numAmount * (numRate / 100);
      amountBeforeVat = numAmount;
      totalAmount = numAmount + vatAmount;
    } else {
      vatAmount = numAmount * (numRate / (100 + numRate));
      amountBeforeVat = numAmount - vatAmount;
      totalAmount = numAmount;
    }

    setResults({
      vatAmount,
      amountBeforeVat,
      totalAmount
    });
  };

  const reset = () => {
    setAmount('');
    setIsInclusive(false);
    setRate('14');
    setResults(null);
  };

  return (
    <section className="section-padding bg-secondary" id="vat-calculator">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">احسب ضريبة القيمة المضافة بسهولة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            استخدم هذه الحاسبة لمعرفة قيمة ضريبة القيمة المضافة في مصر بشكل فوري ودقيق.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Calculator Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 space-y-6"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary block">المبلغ (بالجنيه المصري)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="أدخل المبلغ هنا..."
                    className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                  />
                  <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsInclusive(false)}
                  className={`p-4 rounded-2xl font-bold text-sm transition-all border-2 ${!isInclusive ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-100 hover:border-primary/20'}`}
                >
                  السعر غير شامل الضريبة
                </button>
                <button 
                  onClick={() => setIsInclusive(true)}
                  className={`p-4 rounded-2xl font-bold text-sm transition-all border-2 ${isInclusive ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-100 hover:border-primary/20'}`}
                >
                  السعر شامل الضريبة
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary block">نسبة الضريبة (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                  />
                  <Percent className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <p className="text-[10px] text-gray-400">النسبة الافتراضية في مصر هي 14%</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={calculateVAT}
                className="flex-grow bg-accent text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                احسب الضريبة
              </button>
              <button 
                onClick={reset}
                className="p-4 bg-gray-100 text-gray-500 rounded-2xl hover:bg-gray-200 transition-all"
                title="إعادة تعيين"
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Results Display */}
          <div className="space-y-6">
            {results ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-xl font-bold mb-8 relative z-10">نتائج الحساب:</h3>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-gray-400">قيمة الضريبة:</span>
                    <span className="text-2xl font-bold text-accent">{results.vatAmount.toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ج.م</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-gray-400">المبلغ قبل الضريبة:</span>
                    <span className="text-xl font-bold">{results.amountBeforeVat.toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ج.م</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-400">المبلغ الإجمالي (بعد الضريبة):</span>
                    <span className="text-3xl font-black">{results.totalAmount.toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ج.م</span>
                  </div>
                </div>

                <div className="mt-8 flex items-start gap-2 text-[10px] text-gray-400 bg-black/20 p-3 rounded-xl">
                  <Info className="w-4 h-4 shrink-0" />
                  <p>هذه النتائج تقديرية بناءً على المدخلات، يرجى مراجعة محاسب متخصص للتأكد من الالتزامات الضريبية الدقيقة لشركتك.</p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[300px] bg-white/50 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center text-center p-8 text-gray-400">
                <Calculator className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-bold">أدخل البيانات واضغط على "احسب الضريبة" لرؤية النتائج هنا</p>
              </div>
            )}

            {/* CTA Card */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
              <h4 className="text-lg font-bold text-primary">هل تحتاج إلى إدارة الضرائب في شركتك باحتراف؟</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                فريقنا جاهز لمساعدتك في حساب وتقديم الضرائب بدقة، وضمان الامتثال الكامل للقوانين المصرية.
              </p>
              <Link 
                to="/contact"
                className="flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all"
              >
                اطلب الخدمة الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

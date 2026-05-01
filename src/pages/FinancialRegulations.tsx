import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, ExternalLink, Info } from 'lucide-react';

export default function FinancialRegulations() {
  const driveUrl = "https://drive.google.com/file/d/10wjqzf5JztVC6_lkrc1dv6hd-_i0RWW2/view?usp=drivesdk";
  const embedUrl = "https://drive.google.com/file/d/10wjqzf5JztVC6_lkrc1dv6hd-_i0RWW2/preview";

  return (
    <div className="pt-24 min-h-screen bg-secondary">
      {/* Header */}
      <section className="bg-primary py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">اللائحة المالية والموازنة للحسابات – إصدار أبريل 2021</h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Info Box */}
            <div className="bg-blue-50 border-r-4 border-blue-500 p-6 rounded-xl mb-8 flex gap-4 items-start">
              <Info className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-1">ملاحظة هامة</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  يمكنك تصفح الكتاب مباشرة هنا، أو تحميله للرجوع إليه في أي وقت عبر الرابط المباشر. هذه اللائحة تعتبر مرجعاً أساسياً لتنظيم العمليات المالية والموازنات.
                </p>
              </div>
            </div>

            {/* Iframe Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 relative group"
            >
              <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-600 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  عرض المستند
                </span>
                <div className="flex gap-2">
                  <a 
                    href={driveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white rounded-lg transition-colors text-primary"
                    title="فتح في نافذة جديدة"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a 
                    href={driveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-accent text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    تحميل
                  </a>
                </div>
              </div>
              
              <div className="aspect-[3/4] md:aspect-video w-full">
                <iframe 
                  src={embedUrl} 
                  width="100%" 
                  height="100%" 
                  className="border-none"
                  allow="autoplay"
                >
                  لا يمكن عرض الكتاب، يمكنك <a href={driveUrl} target="_blank" rel="noopener noreferrer">تحميله من هنا</a>.
                </iframe>
              </div>
            </motion.div>

            {/* Footer Note */}
            <div className="mt-12 text-center text-gray-500 text-sm">
              <p>© جميع الحقوق محفوظة - إيليجا للخدمات المالية والمحاسبية</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

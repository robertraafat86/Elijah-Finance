import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';
import { NAV_ITEMS, LOGO_URL } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="space-y-4">
              <img 
                src={LOGO_URL} 
                alt="شعار إيليجا" 
                className="h-24 w-auto object-contain brightness-200"
                referrerPolicy="no-referrer"
              />
              <span className="text-2xl font-bold block">إيليجا</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              نقدم حلولاً متكاملة لإدارة أعمالك المالية باحترافية. سواء كنت ترغب في تعلم المحاسبة أو تحتاج إلى خدمات محاسبية دقيقة، نحن هنا لدعمك في كل خطوة.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">أقسام الموقع</h4>
            <ul className="space-y-3">
              <li><Link to="/accounting-cycle" className="text-gray-300 hover:text-white transition-colors text-sm">الدورة المحاسبية</Link></li>
              <li><Link to="/financial-statements" className="text-gray-300 hover:text-white transition-colors text-sm">القوائم المالية</Link></li>
              <li><Link to="/accounting-standards" className="text-gray-300 hover:text-white transition-colors text-sm">المعايير الدولية</Link></li>
              <li><Link to="/egyptian-standards" className="text-gray-300 hover:text-white transition-colors text-sm">المعايير المصرية</Link></li>
              <li><Link to="/financial-regulations" className="text-gray-300 hover:text-white transition-colors text-sm">اللائحة المالية</Link></li>
              <li><Link to="/inventory" className="text-gray-300 hover:text-white transition-colors text-sm">طرق حساب المخزون</Link></li>
              <li><Link to="/bank-reconciliation" className="text-gray-300 hover:text-white transition-colors text-sm">مذكرة تسوية البنك</Link></li>
              <li><Link to="/internal-audit" className="text-gray-300 hover:text-white transition-colors text-sm">المراجعة الداخلية</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">بيانات التواصل</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-accent" />
                <a href="https://wa.me/201208538580" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  واتساب: +20 120 853 8580
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:robert.raafat.86@gmail.com" className="hover:text-accent transition-colors">
                  بريد إلكتروني: robert.raafat.86@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-accent" />
                <span>القاهرة، جمهورية مصر العربية</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} إيليجا للخدمات المالية والمحاسبية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}

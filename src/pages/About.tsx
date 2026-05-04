import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Shield, Target, Eye, Users, Award, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export default function About() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <div className={cn("pt-24", isRtl ? "text-right" : "text-left")}>
      {/* Header */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className={cn("max-w-3xl space-y-6", !isRtl && "ml-0")}>
            <h1 className="text-4xl md:text-5xl font-extrabold">{t('about.title')}</h1>
            <p className="text-xl text-gray-300">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className={cn("text-3xl font-bold text-primary border-blue-600", isRtl ? "border-r-4 pr-6" : "border-l-4 pl-6")}>
                {t('about.story_title')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.story_p1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.story_p2')}
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <p className="text-4xl font-extrabold text-accent">+10</p>
                  <p className="text-gray-500 font-bold">{t('home.years_exp')}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-extrabold text-accent">+200</p>
                  <p className="text-gray-500 font-bold">{t('home.clients')}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-secondary rounded-3xl border border-gray-100 flex items-center justify-center p-12">
                 <div className="text-center space-y-4">
                    <Shield className="w-16 h-16 text-primary mx-auto opacity-20" />
                    <p className="text-primary/40 font-bold">{t('about.trust_text')}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-3xl shadow-sm space-y-6"
            >
              <div className={cn("bg-primary/10 p-4 rounded-2xl w-fit text-primary", isRtl ? "" : "mx-0")}>
                <Eye className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-primary">{t('about.vision')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.vision_desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-3xl shadow-sm space-y-6"
            >
              <div className={cn("bg-accent/10 p-4 rounded-2xl w-fit text-accent", isRtl ? "" : "mx-0")}>
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-primary">{t('about.mission')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.mission_desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">{t('about.values_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: t('about.integrity'), desc: t('about.integrity_desc'), icon: <Shield className="w-8 h-8" /> },
              { title: t('common.professionalism'), desc: t('common.quality_text').split(' ').slice(0, 10).join(' ') + '...', icon: <Award className="w-8 h-8" /> },
              { title: t('about.commitment'), desc: t('about.commitment_desc'), icon: <Clock className="w-8 h-8" /> },
            ].map((value, i) => (
              <div key={i} className="space-y-4 p-8">
                <div className="bg-secondary text-primary p-6 rounded-full w-fit mx-auto">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-primary">{value.title}</h4>
                <p className="text-gray-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

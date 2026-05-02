import React from 'react';
import { motion } from 'motion/react';
import { Shield, Target, Eye, Users, Award, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold">من نحن</h1>
            <p className="text-xl text-gray-300">
              نحن فريق متخصص في الخدمات المالية والمحاسبية، نسعى لتقديم خدمات دقيقة تساعد الشركات على النمو واتخاذ قرارات صحيحة.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-primary">قصتنا وخبرتنا</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                تأسست إيليجا للخدمات المالية والمحاسبية برؤية واضحة تهدف إلى سد الفجوة بين التعقيد المحاسبي واحتياجات أصحاب الأعمال البسيطة والمتوسطة. نحن نؤمن بأن كل شركة، بغض النظر عن حجمها، تستحق الحصول على خدمات محاسبية عالية الجودة تساعدها على النمو والاستدامة.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                على مدار سنوات من العمل الدؤوب، استطعنا بناء سمعة طيبة قائمة على الثقة والشفافية والدقة المتناهية في العمل، مما جعلنا الشريك المفضل للعديد من المؤسسات في مختلف القطاعات.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <p className="text-4xl font-extrabold text-accent">+10</p>
                  <p className="text-gray-500 font-bold">سنوات خبرة</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-extrabold text-accent">+200</p>
                  <p className="text-gray-500 font-bold">عميل سعيد</p>
                </div>
              </div>
            </div>
            <div className="relative">
              {/* Image removed for a clean layout */}
              <div className="aspect-square bg-secondary rounded-3xl border border-gray-100 flex items-center justify-center p-12">
                 <div className="text-center space-y-4">
                    <Shield className="w-16 h-16 text-primary mx-auto opacity-20" />
                    <p className="text-primary/40 font-bold">بناء الثقة من خلال الدقة</p>
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
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-3xl shadow-sm space-y-6"
            >
              <div className="bg-primary/10 p-4 rounded-2xl w-fit text-primary">
                <Eye className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-primary">رؤيتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                أن نكون الخيار الأول والملهم في قطاع الخدمات المالية والمحاسبية على مستوى المنطقة، من خلال تقديم حلول مبتكرة تساهم في تحقيق الاستقرار المالي والنمو المستدام لعملائنا.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-3xl shadow-sm space-y-6"
            >
              <div className="bg-accent/10 p-4 rounded-2xl w-fit text-accent">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-primary">رسالتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                تمكين أصحاب الأعمال من خلال توفير خدمات مالية ومحاسبية دقيقة، وتثقيفهم مالياً، والالتزام بأعلى معايير المهنية والأخلاقية لضمان نجاحهم وتفوقهم في سوق العمل.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">قيمنا الجوهرية</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'النزاهة', desc: 'الصدق والشفافية هما أساس تعاملنا مع كل عميل.', icon: <Shield className="w-8 h-8" /> },
              { title: 'الاحترافية', desc: 'نطبق أعلى المعايير المهنية في جميع خدماتنا.', icon: <Award className="w-8 h-8" /> },
              { title: 'الالتزام', desc: 'نحترم المواعيد ونفي بوعودنا دائماً.', icon: <Clock className="w-8 h-8" /> },
            ].map((value, i) => (
              <div key={i} className="text-center space-y-4 p-8">
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

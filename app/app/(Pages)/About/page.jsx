import React from 'react'
import Image from 'next/image'
import { sheikhAlMinshawi } from '@/app/utils/Data'
import RandomGallery from '@/app/Components/RandomGallary';

export default function AboutPage() {
  const s = sheikhAlMinshawi;

  const galleryImages = [
    "/assets/sediq5jpg.jpg",
    "/assets/sediq1.jpg",
    "/assets/sediq2.jpg",
    "/assets/sediq3.jpg",
    "/assets/sediq4.jpg",
  ];

  return (
    <div className="min-h-screen text-[#F7F6F2]">

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <svg viewBox="0 0 1200 600" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#062e24" />
                <stop offset="1" stopColor="#0B3D2E" />
              </linearGradient>
            </defs>
            <rect width="1200" height="600" fill="url(#g1)" />
            <g transform="translate(80,40)" fill="none" stroke="#C8A64B" strokeOpacity="0.06">
              <circle cx="120" cy="120" r="240" />
              <circle cx="420" cy="80" r="160" />
              <circle cx="920" cy="200" r="280" />
            </g>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 text-right">
            <p className="text-[#C8A64B] font-semibold">سيرة وتراجم</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">{s.name}</h1>
            <p className="mt-4 text-[#D9C7A3] max-w-xl">
              قارئٌ من عِيارٍ فريد، جمع بين إحساسٍ وروحانيةٍ في التلاوة.
              هذه الصفحة تعرض حياته، مسيرته، وإرثه الصوتي.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:items-center">
              <a href="#bio" className="inline-block bg-[#C8A64B] text-[#1A1A1A] px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] transition">قراءة السيرة</a>
              <a href="#gallery" className="inline-block border border-[#C8A64B] px-6 py-3 rounded-2xl text-[#D9C7A3] hover:bg-[#C8A64B]/10 transition">معرض الصور</a>
            </div>
          </div>

          <div className="w-64 h-64 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#C8A64B]/20">
            <Image src="/assets/sediq2.jpg" alt={s.name} width={520} height={520} className="object-cover" />
          </div>
        </div>
      </header>

      {/* Content Layout */}
      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left section */}
        <section id="bio" className="lg:col-span-2">

          {/* Bio Card */}
          <article className="bg-[#121212] p-8 rounded-2xl shadow-lg border border-[#C8A64B]/10">
            <h2 className="text-2xl font-bold text-[#C8A64B]">نبذة مفصّلة</h2>

            <div className="mt-5 space-y-5 text-[#D9C7A3] leading-relaxed">
              <p>{s.summary.paragraph1}</p>
              <p>{s.summary.paragraph2}</p>
              <p>{s.summary.paragraph3}</p>
              <p>{s.summary.paragraph4}</p>
            </div>

            {/* Quick Facts */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0f1a18] border border-[#C8A64B]/8">
                <h4 className="text-sm text-[#C8A64B] font-semibold">الميلاد</h4>
                <p className="mt-1 text-[#D9C7A3]">{s.birth.date} — {s.birth.place}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f1a18] border border-[#C8A64B]/8">
                <h4 className="text-sm text-[#C8A64B] font-semibold">الوفاة</h4>
                <p className="mt-1 text-[#D9C7A3]">{s.death.date} — السبب: {s.death.cause}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f1a18] border border-[#C8A64B]/8">
                <h4 className="text-sm text-[#C8A64B] font-semibold">الأسرة</h4>
                <p className="mt-1 text-[#D9C7A3]">عدد الأولاد: {s.family.childrenCount} — أصل العائلة: المنشاة، صعيد مصر</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f1a18] border border-[#C8A64B]/8">
                <h4 className="text-sm text-[#C8A64B] font-semibold">اللقب</h4>
                <p className="mt-1 text-[#D9C7A3]">{s.titles.join(' • ')}</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-[#C8A64B]">أهم الإنجازات</h3>
              <ul className="mt-3 space-y-2 text-[#D9C7A3] list-inside list-disc">
                {s.career.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            {/* Quote */}
            <blockquote className="mt-8 border-l-4 border-[#C8A64B] pl-4 italic text-[#EAE7DF]">
              “{s.career.famousQuotes[0].quote}”
              — <span className="font-semibold">{s.career.famousQuotes[0].by}</span>
            </blockquote>
          </article>

          {/* Timeline */}
          <div className="mt-8 bg-[#0f1a18] p-6 rounded-2xl border border-[#C8A64B]/8">
            <h3 className="text-xl font-bold text-[#C8A64B]">محطات في حياته</h3>
            <ol className="mt-4 border-l border-[#C8A64B]/10 pl-6 space-y-6 text-[#D9C7A3]">
              <li>
                <span className="font-semibold">1920</span>
                <div className="text-sm mt-1">مولده في المنشاة بسوهاج ونشأته في بيتٍ قرآني.</div>
              </li>

              <li>
                <span className="font-semibold">الطفولة</span>
                <div className="text-sm mt-1">حفظ القرآن مبكراً وأبدع في التلاوة تحت إشراف أهل العلم.</div>
              </li>

              <li>
                <span className="font-semibold">بداياته المهنية</span>
                <div className="text-sm mt-1">انتقل للقاهرة وسجّل الإذاعة وذاع صيته.</div>
              </li>

              <li>
                <span className="font-semibold">1950s - 1960s</span>
                <div className="text-sm mt-1">سفرات وتسجيلات عالمية وتكريمات واسعة.</div>
              </li>

              <li>
                <span className="font-semibold">1969</span>
                <div className="text-sm mt-1">وفاته وتركه إرثًا خالداً.</div>
              </li>
            </ol>
          </div>


        </section>

        {/* Sidebar */}
        <aside className="space-y-6">

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#C8A64B]/8 shadow">
            <h4 className="text-[#C8A64B] font-bold">معلومات سريعة</h4>
            <dl className="mt-4 text-[#D9C7A3] space-y-3">
              <div>
                <dt className="text-sm text-[#C8A64B]">الاسم الكامل</dt>
                <dd className="mt-1">{s.fullName}</dd>
              </div>

              <div>
                <dt className="text-sm text-[#C8A64B]">حفظ القرآن</dt>
                <dd className="mt-1">{s.education.memorizedQuranAt}</dd>
              </div>

              <div>
                <dt className="text-sm text-[#C8A64B]">الوظيفة</dt>
                <dd className="mt-1">{s.career.occupation}</dd>
              </div>

              <div>
                <dt className="text-sm text-[#C8A64B]">البلدان</dt>
                <dd className="mt-1">{s.career.countriesVisited.join(', ')}</dd>
              </div>
            </dl>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#C8A64B]/8 shadow">
            <h4 className="text-[#C8A64B] font-bold">إرثه الصوتي</h4>
            <p className="mt-3 text-[#D9C7A3]">
              تسجيلات الشيخ متاحة في المكتبات الصوتية والإذاعات،
              وتُستخدم في التحفيظ والبحث العلمي.
            </p>

            <div className="mt-4 flex gap-3">
              <a href="https://www.youtube.com/results?search_query=%D9%85%D8%AD%D9%85%D8%AF+%D8%B5%D8%AF%D9%8A%D9%82+%D8%A7%D9%84%D9%85%D9%86%D8%B4%D8%A7%D9%88%D9%8A"
                 target="_blank" rel="noreferrer"
                 className="flex-1 text-center py-2 rounded-lg bg-[#4A7856] font-semibold">
                يوتيوب
              </a>

              <a href="https://archive.org/search.php?query=Al-Minshawi"
                 target="_blank" rel="noreferrer"
                 className="flex-1 text-center py-2 rounded-lg border border-[#C8A64B]">
                أرشيف
              </a>
            </div>
          </div>

          {/* Decorative Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-tr from-[#071e18] to-[#0B3D2E] border border-[#C8A64B]/6 shadow-lg">
            <svg viewBox="0 0 120 120" className="w-full h-40" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="gold" x1="0" x2="1">
                  <stop offset="0" stopColor="#C8A64B" />
                  <stop offset="1" stopColor="#D9C7A3" />
                </linearGradient>
              </defs>

              <rect x="6" y="6" width="108" height="108" rx="18"
                    fill="none" stroke="url(#gold)" strokeWidth="2" />

              <g transform="translate(20,18)" fill="none" stroke="url(#gold)" strokeWidth="1.4">
                <path d="M5 80 C 35 10, 70 10, 100 80" strokeLinecap="round" />
                <circle cx="24" cy="50" r="6" />
                <circle cx="60" cy="50" r="6" />
              </g>
            </svg>

            <p className="mt-3 text-[#D9C7A3] text-sm">
              تيباغرافي زخرفي يرمز إلى الروحانية والصوت.
            </p>
          </div>

        </aside>
      </main>
      {/*   RANDOM GALLERY INSERTED     */}
      {/* ----------------------------- */}
      <RandomGallery images={galleryImages} />
      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-[#C8A64B]/6">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-[#D9C7A3]">
          © {new Date().getFullYear()} حفظ وتقديم — محتوى السيرة مبني على مصادر موثوقة.
        </div>
      </footer>

    </div>
  );
}
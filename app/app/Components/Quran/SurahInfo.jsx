"use client"

export default function SurahInfo({ surahs, surahId }) {
  const surah = surahs.find((s) => s.id === surahId)
  if (!surah) return null

  return (
    <div className="text-center mb-6 p-4 rounded-xl bg-gray-800/70 border border-gray-700">
      {/* اسم السورة بخط كبير ولون مميز */}
      <h3 className="text-3xl font-bold text-yellow-300 mb-1" style={{ textShadow: '0 0 5px rgba(253, 230, 138, 0.4)' }}>
        {surah.name}
      </h3>
      {/* معلومات إضافية بخط أصغر وألوان متناسقة */}
      <p className="text-sm text-gray-400 mt-2">
        الجزء: **{surah.juz}** | سورة رقم: **{surah.id}** | عدد الآيات: **{surah.ayahs}**
      </p>
    </div>
  )
}
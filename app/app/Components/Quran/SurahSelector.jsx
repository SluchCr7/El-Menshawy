// "use client"

// export default function SurahSelector({ surahId, setSurahId, surahs }) {
//   return (
//     <div className="flex flex-col gap-3 items-center mb-8">
//       <select
//         value={surahId}
//         onChange={(e) => setSurahId(Number(e.target.value))}
//         // أنماط احترافية: خلفية داكنة، نص أبيض، تركيز بلون أخضر
//         className="p-3 w-full max-w-md rounded-xl bg-gray-800 text-white text-lg border border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition shadow-lg appearance-none cursor-pointer"
//         style={{ direction: 'rtl', textAlign: 'right' }} // لدعم اللغة العربية بشكل أفضل
//       >
//         {surahs.slice(0 , 5).map((surah) => (
//           <option key={surah.id} value={surah.id}>
//             {surah.id}. {surah.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }
"use client"

export default function SurahSelector({ surahId, setSurahId, surahs }) {
  return (
    <div className="flex flex-col gap-3 items-center mb-8">
      {/* عنوان صغير */}
      <p className="text-[#C8A64B] text-sm font-semibold mb-1">
        اختر السورة التي ترغب في الاستماع إليها
      </p>

      <div className="relative w-full max-w-md">
        {/* زخرفة خفيفة داخل الخلفية */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0B3D2E]/70 to-[#1A1A1A]/80 border border-[#C8A64B]/30 backdrop-blur-sm shadow-[0_0_10px_#C8A64B22]" />

        <select
          value={surahId}
          onChange={(e) => setSurahId(Number(e.target.value))}
          className="relative z-10 p-3 w-full rounded-xl bg-transparent text-[#F7F6F2] text-lg font-['Cairo'] 
          focus:ring-2 focus:ring-[#C8A64B] focus:border-[#C8A64B] border border-transparent 
          transition appearance-none cursor-pointer text-right"
          style={{ direction: 'rtl' }}
        >
          {surahs.slice(0, 5).map((surah) => (
            <option
              key={surah.id}
              value={surah.id}
              className="bg-[#0B3D2E] text-[#F7F6F2] hover:bg-[#4A7856] hover:text-white"
            >
              {surah.id}. {surah.name}
            </option>
          ))}
        </select>

        {/* سهم زخرفي (مثل هلال ذهبي صغير) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-[#C8A64B] pointer-events-none">
          ▼
        </div>
      </div>
    </div>
  )
}

// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { menshQuran, menshQuranMurattal } from "@/app/utils/Data";
// import { Play, Pause, Download, SkipForward, SkipBack } from "lucide-react";

// const Page = ({ params }) => {
//   const { id, type } = params;
//   const list = type === "murattal" ? menshQuranMurattal : menshQuran;
//   const surahId = parseInt(id);
//   const surah = list.find((s) => s.id === surahId);

//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const nextSurah = list.find((s) => s.id === surahId + 1);
//   const prevSurah = list.find((s) => s.id === surahId - 1);

//   // safety: if surah not found
//   if (!surah) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0B3D2E] text-[#F7F6F2] p-6">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold">السورة غير موجودة</h2>
//           <p className="mt-2 text-[#D9C7A3]">تأكد من رقم السورة أو رابط التشغيل.</p>
//         </div>
//       </div>
//     );
//   }

//   // تحويل الوقت لصفحة mm:ss
//   const formatTime = (sec) => {
//     if (!sec && sec !== 0) return "00:00";
//     const total = Math.max(0, Number(sec) || 0);
//     const m = Math.floor(total / 60);
//     const s = Math.floor(total % 60);
//     return `${m}:${s < 10 ? "0" + s : s}`;
//   };

//   // تشغيل/إيقاف (يتعامل مع promise)
//   const togglePlay = async () => {
//     const audio = audioRef.current;
//     if (!audio) return;
//     try {
//       if (isPlaying) {
//         audio.pause();
//         // state will be updated by 'pause' event listener
//       } else {
//         const playPromise = audio.play();
//         if (playPromise !== undefined) {
//           await playPromise.catch((err) => {
//             // اضاءة خطأ صغير إن لم يُسمح بالتشغيل التلقائي
//             console.warn("Play promise rejected:", err);
//           });
//         }
//         // state will be updated by 'play' event listener
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   // تغيير شريط التقدم
//   const handleSeek = (e) => {
//     const value = Number(e.target.value);
//     if (!isNaN(value) && audioRef.current) {
//       audioRef.current.currentTime = value;
//       setCurrentTime(value);
//     }
//   };

//   const goNext = () => {
//     if (nextSurah) window.location.href = `/Play/${surahId + 1}/type/${type}`;
//   };

//   const goPrev = () => {
//     if (prevSurah) window.location.href = `/Play/${surahId - 1}/type/${type}`;
//   };

//   // ربط أحداث الـ audio بطريقة موثوقة
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     // تأكد من أن المتصفح يحمل metadata (المدة)
//     audio.preload = "metadata";
//     // بعض الخوادم قد تتطلب crossOrigin للوصول للميتابيتا / waveform لاحقًا
//     audio.crossOrigin = "anonymous";

//     const handleLoadedMeta = () => {
//       setDuration(isFinite(audio.duration) ? audio.duration : 0);
//       // in case browser already has currentTime > 0
//       setCurrentTime(audio.currentTime || 0);
//     };

//     const handleTimeUpdate = () => {
//       setCurrentTime(audio.currentTime || 0);
//     };

//     const handlePlay = () => setIsPlaying(true);
//     const handlePause = () => setIsPlaying(false);
//     const handleEnded = () => {
//       setIsPlaying(false);
//       // auto go next if exists
//       if (nextSurah) {
//         // small delay to allow UI update
//         setTimeout(() => {
//           window.location.href = `/Play/${surahId + 1}/type/${type}`;
//         }, 400);
//       }
//     };

//     audio.addEventListener("loadedmetadata", handleLoadedMeta);
//     audio.addEventListener("timeupdate", handleTimeUpdate);
//     audio.addEventListener("play", handlePlay);
//     audio.addEventListener("pause", handlePause);
//     audio.addEventListener("ended", handleEnded);

//     // إذا كان الملف محملاً مسبقًا (edge cases)
//     if (audio.readyState >= 1) {
//       handleLoadedMeta();
//     }

//     return () => {
//       audio.removeEventListener("loadedmetadata", handleLoadedMeta);
//       audio.removeEventListener("timeupdate", handleTimeUpdate);
//       audio.removeEventListener("play", handlePlay);
//       audio.removeEventListener("pause", handlePause);
//       audio.removeEventListener("ended", handleEnded);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [surah.url, surahId, type, nextSurah]);

//   // إعادة تهيئة عند تغيير id (نوقف التشغيل وننقل الوقت)
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio) {
//       audio.pause();
//       audio.currentTime = 0;
//     }
//     setIsPlaying(false);
//     setCurrentTime(0);
//     setDuration(0);
//   }, [id]);

//   return (
//     <div className="min-h-screen w-full bg-[#0B3D2E] text-[#F7F6F2] p-6 flex flex-col items-center">
//       {/* ===== عنوان السورة ===== */}
//       <div className="text-center mt-8">
//         <p className="text-[#C8A64B] font-semibold text-xl">
//           تلاوة الشيخ محمد صديق المنشاوي - {type === "murattal" ? "مرتل" : "مجود"}
//         </p>
//         <h1 className="text-4xl mt-2 font-extrabold">{surah.name}</h1>
//       </div>

//       {/* ===== Player Card ===== */}
//       <div className="mt-10 w-full max-w-2xl bg-[#1A1A1A] p-6 rounded-2xl shadow-2xl border border-[#C8A64B]/40">
//         {/* ========== Audio ============= */}
//         <audio ref={audioRef} src={surah.url} preload="metadata" />

//         {/* Controls Row */}
//         <div className="flex items-center justify-center gap-6 my-4">
//           {/* السابق */}
//           <button
//             disabled={!prevSurah}
//             onClick={goPrev}
//             className={`p-3 rounded-full transition ${
//               prevSurah ? "bg-[#D9C7A3] text-[#1A1A1A] hover:scale-110" : "bg-gray-600 cursor-not-allowed"
//             }`}
//             aria-label="Previous Surah"
//           >
//             <SkipBack size={24} />
//           </button>

//           {/* Play / Pause */}
//           <button
//             onClick={togglePlay}
//             className="w-16 h-16 rounded-full bg-[#C8A64B] text-[#1A1A1A] flex items-center justify-center hover:scale-105 transition shadow-lg"
//             aria-label={isPlaying ? "Pause" : "Play"}
//           >
//             {isPlaying ? <Pause size={30} /> : <Play size={30} />}
//           </button>

//           {/* التالي */}
//           <button
//             disabled={!nextSurah}
//             onClick={goNext}
//             className={`p-3 rounded-full transition ${
//               nextSurah ? "bg-[#D9C7A3] text-[#1A1A1A] hover:scale-110" : "bg-gray-600 cursor-not-allowed"
//             }`}
//             aria-label="Next Surah"
//           >
//             <SkipForward size={24} />
//           </button>
//         </div>

//         {/* ======= شريط التقدم ======== */}
//         <div className="w-full mt-6">
//           <input
//             type="range"
//             min="0"
//             max={duration || 0}
//             step="0.1"
//             value={isFinite(currentTime) ? currentTime : 0}
//             onChange={handleSeek}
//             className="w-full accent-[#C8A64B]"
//             aria-label="Seek"
//           />

//           <div className="flex justify-between text-sm mt-2 text-[#D9C7A3]">
//             <span>{formatTime(currentTime)}</span>
//             <span>{formatTime(duration)}</span>
//           </div>
//         </div>

//         {/* ======= تحميل السورة ======== */}
//         <div className="w-full flex justify-center mt-6">
//           <a
//             href={surah.url}
//             download
//             className="flex items-center gap-2 bg-[#4A7856] px-6 py-3 rounded-xl text-[#F7F6F2] font-bold hover:bg-[#C8A64B] hover:text-[#1A1A1A] transition"
//           >
//             <Download size={20} />
//             تحميل السورة
//           </a>
//         </div>
//       </div>

//       {/* ===== معلومات السورة ===== */}
//       <div className="mt-10 text-center max-w-2xl text-lg text-[#D9C7A3] leading-relaxed">
//         <p>سورة {surah.name} بصوت الشيخ المنشاوي .</p>
//         <p className="mt-2">يمكنك الانتقال لباقي السور باستخدام أزرار التالي/السابق.</p>
//       </div>
//     </div>
//   );
// };

// export default Page;
"use client";
import React, { useEffect, useRef, useState } from "react";
import { menshQuran, menshQuranMurattal } from "@/app/utils/Data";
import { Play, Pause, Download, SkipForward, SkipBack } from "lucide-react";

// ⭐ New imports:
import { useSearchParams, useParams, useRouter } from "next/navigation";

const Page = ({ params }) => {
  // ====== ⭐ New (Hooks for query and navigation)
  const searchParams = useSearchParams();
  const router = useRouter();

  // ====== جلب ID من params (كما هو)
  const { id } = params;

  // ====== جلب type من Query (بشكل احترافي)
  const queryType = searchParams.get("type")?.toLowerCase();

  // ====== استخدم القيمة من query أو fallback للقيمة القديمة إن وُجدت
  const type = queryType === "murattal" ? "murattal" : "mojawwad";

  // ====== تحديد قائمة السور حسب النوع
  const list = type === "murattal" ? menshQuranMurattal : menshQuran;
  const surahId = parseInt(id);
  const surah = list.find((s) => s.id === surahId);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ====== التالي والسابق
  const nextSurah = list.find((s) => s.id === surahId + 1);
  const prevSurah = list.find((s) => s.id === surahId - 1);

  // ====== الحماية: السورة غير موجودة
  if (!surah) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B3D2E] text-[#F7F6F2] p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">السورة غير موجودة</h2>
          <p className="mt-2 text-[#D9C7A3]">
            تأكد من رقم السورة أو رابط التشغيل.
          </p>
        </div>
      </div>
    );
  }

  // تحويل الوقت لصفحة mm:ss
  const formatTime = (sec) => {
    if (!sec && sec !== 0) return "00:00";
    const total = Math.max(0, Number(sec) || 0);
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  // تشغيل/إيقاف (يتعامل مع promise)
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (isPlaying) {
        audio.pause();
      } else {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise.catch((err) => {
            console.warn("Play promise rejected:", err);
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // تغيير شريط التقدم
  const handleSeek = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  // ===== ⭐ New navigation methods using router.push instead of window.location.href
  const goNext = () => {
    if (nextSurah)
      router.push(`/Play/${surahId + 1}?type=${type}`);
  };

  const goPrev = () => {
    if (prevSurah)
      router.push(`/Play/${surahId - 1}?type=${type}`);
  };

  // ===== Events =====
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.preload = "metadata";
    audio.crossOrigin = "anonymous";

    const handleLoadedMeta = () => {
      setDuration(isFinite(audio.duration) ? audio.duration : 0);
      setCurrentTime(audio.currentTime || 0);
    };

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      if (nextSurah) {
        setTimeout(() => {
          router.push(`/Play/${surahId + 1}?type=${type}`);
        }, 400);
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMeta);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    if (audio.readyState >= 1) handleLoadedMeta();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMeta);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [surah.url, surahId, type, nextSurah]);

  // ===== reset عند تغيير id
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [id]);

  // ====== UI
  return (
    <div className="min-h-screen w-full bg-[#0B3D2E] text-[#F7F6F2] p-6 flex flex-col items-center">
      {/* ===== عنوان السورة ===== */}
      <div className="text-center mt-8">
        <p className="text-[#C8A64B] font-semibold text-xl">
          تلاوة الشيخ محمد صديق المنشاوي -{" "}
          {type === "murattal" ? "مرتل" : "مجود"}
        </p>
        <h1 className="text-4xl mt-2 font-extrabold">{surah.name}</h1>
      </div>

      {/* ===== Player Card ===== */}
      <div className="mt-10 w-full max-w-2xl bg-[#1A1A1A] p-6 rounded-2xl shadow-2xl border border-[#C8A64B]/40">
        <audio ref={audioRef} src={surah.url} preload="metadata" />

        {/* Controls Row */}
        <div className="flex items-center justify-center gap-6 my-4">
          <button
            disabled={!prevSurah}
            onClick={goPrev}
            className={`p-3 rounded-full transition ${
              prevSurah
                ? "bg-[#D9C7A3] text-[#1A1A1A] hover:scale-110"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            <SkipBack size={24} />
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-[#C8A64B] text-[#1A1A1A] flex items-center justify-center hover:scale-105 transition shadow-lg"
          >
            {isPlaying ? <Pause size={30} /> : <Play size={30} />}
          </button>

          <button
            disabled={!nextSurah}
            onClick={goNext}
            className={`p-3 rounded-full transition ${
              nextSurah
                ? "bg-[#D9C7A3] text-[#1A1A1A] hover:scale-110"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            <SkipForward size={24} />
          </button>
        </div>

        {/* شريط التقدم */}
        <div className="w-full mt-6">
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={isFinite(currentTime) ? currentTime : 0}
            onChange={handleSeek}
            className="w-full accent-[#C8A64B]"
          />
          <div className="flex justify-between text-sm mt-2 text-[#D9C7A3]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* تحميل السورة */}
        <div className="w-full flex justify-center mt-6">
          <a
            href={surah.url}
            download
            className="flex items-center gap-2 bg-[#4A7856] px-6 py-3 rounded-xl text-[#F7F6F2] font-bold hover:bg-[#C8A64B] hover:text-[#1A1A1A] transition"
          >
            <Download size={20} />
            تحميل السورة
          </a>
        </div>
      </div>

      {/* ===== معلومات السورة ===== */}
      <div className="mt-10 text-center max-w-2xl text-lg text-[#D9C7A3] leading-relaxed">
        <p>سورة {surah.name} بصوت الشيخ المنشاوي .</p>
        <p className="mt-2">يمكنك الانتقال لباقي السور باستخدام أزرار التالي/السابق.</p>
      </div>
    </div>
  );
};

export default Page;

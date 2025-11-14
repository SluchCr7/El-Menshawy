"use client"
// استخدام أيقونة أكثر رمزية أو فنية، مثل الهلال والنجمة أو زخرفة إسلامية
import { Star, Zap } from "lucide-react" 
// يمكن استبدالها بأيقونة مخصصة SVG لزخرفة إسلامية

export default function PlayerHeader() {
  return (
    <div className="flex flex-col items-center mb-8 border-b border-gray-700/50 pb-6">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-800/50 mb-4 shadow-inner">
        {/* أيقونة ذهبية أو متوهجة */}
        <Star className="w-8 h-8 text-yellow-400" fill="currentColor" /> 
      </div>
      <h2 className="text-3xl font-extrabold text-white tracking-wider">المنشاوي المرتل</h2>
      <p className="text-md text-green-400 mt-1 font-medium">القرآن الكريم برواية حفص عن عاصم</p>
    </div>
  )
}
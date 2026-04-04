import Image from "next/image";

interface MedicalCardProps {
  name: string;
  specialty: string;
  matriculet: string;
  imageUrl: string;
}

export const MedicalCard = ({
  name,
  specialty,
  matriculet,
  imageUrl,
}: MedicalCardProps) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 group max-w-sm mx-auto w-full">
      <div className="relative w-full h-48 sm:h-56 bg-slate-100 overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Fotografía de ${name}, ${specialty}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Soft gradient from bottom to blend image into card body */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      <div className="px-5 pb-5 pt-2 relative bg-white flex flex-col items-center text-center">
        {/* Logo validation badge */}
        <div className="absolute -top-10 bg-white rounded-full shadow-sm flex items-center justify-center p-1.5 border border-slate-50">
          <span className="text-[#004A99] font-extrabold text-[8px] leading-tight text-center tracking-tighter">
            MED
            <br />
            CARE
          </span>
        </div>

        <div className="inline-block px-2.5 py-1 bg-[#004A99]/5 text-[#004A99] text-[10px] font-bold rounded-full mb-2 mt-2 tracking-wider">
          {specialty}
        </div>

        <h3 className="text-base font-extrabold text-slate-800 mb-1">{name}</h3>

        <p className="text-slate-500 text-xs font-medium">{matriculet}</p>
      </div>
    </div>
  );
};

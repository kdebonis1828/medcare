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
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-shadow duration-300 group">
      <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Fotografía de ${name}, ${specialty}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Soft gradient from bottom to blend image into card body */}
        <div className="absolute inset-0 bg-linear-to-t from-white/60 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="p-6 relative bg-white">
        {/* Logo validation badge */}
        <div className="absolute -top-7 right-6 w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center p-2 border border-slate-50">
          <span className="text-teal-600 font-extrabold text-[10px] leading-tight text-center tracking-tighter">
            MED
            <br />
            CARE
          </span>
        </div>

        <div className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
          {specialty}
        </div>

        <h3 className="text-xl font-extrabold text-[#004A99] mb-1">{name}</h3>

        <p className="text-slate-500 text-sm font-medium">{matriculet}</p>
      </div>
    </div>
  );
};

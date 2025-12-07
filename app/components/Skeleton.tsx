export default function Skeleton() {
  return (
    <div className="animate-pulse bg-gray-200 w-full h-full min-h-[300px] relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>
  );
}


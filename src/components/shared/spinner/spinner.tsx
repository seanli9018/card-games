export default function Spinner() {
  return (
    <div className="flex justify-center items-center relative top-0 left-0 w-full h-full">
      <div className="flex flex-row gap-1">
        <span className="relative flex h-3 w-3 animate-bounce">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-200"></span>
        </span>
        <span className="relative flex h-3 w-3 animate-bounce animate-delay-200">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-400"></span>
        </span>
        <span className="relative flex h-3 w-3 animate-bounce animate-delay-500">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-600"></span>
        </span>
      </div>
    </div>
  );
}

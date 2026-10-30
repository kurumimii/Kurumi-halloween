interface Props {
  message: string;
  show: boolean;
}

export default function Toast({ message, show }: Props) {
  return (
    <div
      className={`fixed bottom-7 left-1/2 z-[999] flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-[14px] border border-white/10 bg-[#1e1326] px-5 py-2.5 text-xs font-bold text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 ${
        show ? "toast-enter opacity-100" : "pointer-events-none translate-y-20 opacity-0"
      }`}
    >
      <span className="pulse-dot h-2 w-2 flex-shrink-0 rounded-full bg-orange-400" />
      <span>{message}</span>
    </div>
  );
}

import sonicGothic from "../../assets/sonic.gif";

export function SonicDark({ alt = "Sonic", glow = true, src = sonicGothic }) {
  return (
    <div className="relative mx-auto flex w-full items-center justify-center">
      <div className="relative flex max-h-[220px] items-center justify-center">
        {glow && (
          <>
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl" />
            <div className="absolute inset-4 rounded-full bg-pink-600/20 blur-xl" />
          </>
        )}

        <img
          src={src}
          alt={alt}
          className={`relative z-10 mx-auto max-h-[200px] w-auto select-none object-contain ${
            glow ? "drop-shadow-[0_0_18px_rgba(0,246,255,.45)]" : ""
          }`}
          draggable="false"
        />
      </div>
    </div>
  );
}

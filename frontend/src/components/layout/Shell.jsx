import { motion } from "framer-motion";
import { Particles } from "./Particles";

export function Shell({ children, glitch, theme = "normal", topLabel = "Pense Bem®" }) {
  const darkTheme = theme === "dark";

  return (
    <main className={`relative min-h-screen overflow-hidden px-4 py-6 font-mono text-cyan-50 ${darkTheme ? "bg-[#030205]" : "bg-[#07070d]"}`}>
      <div className={`pointer-events-none fixed inset-0 ${
        darkTheme
          ? "bg-[radial-gradient(circle_at_20%_10%,rgba(255,0,80,.22),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(80,0,120,.28),transparent_28%),radial-gradient(circle_at_50%_90%,rgba(0,0,0,.55),transparent_34%)]"
          : "bg-[radial-gradient(circle_at_20%_10%,rgba(0,246,255,.16),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,0,122,.18),transparent_24%),radial-gradient(circle_at_50%_90%,rgba(255,184,0,.12),transparent_28%)]"
      }`} />
      {darkTheme && <div className="pointer-events-none fixed inset-0 bg-black/35" />}
      <div className="pointer-events-none fixed inset-0 opacity-[.08] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:22px_22px]" />

      <Particles />

      <motion.section
        animate={
          glitch
            ? {
                x: [0, -8, 8, -6, 6, 0],
                filter: [
                  "hue-rotate(0deg)",
                  "hue-rotate(70deg)",
                  "hue-rotate(-70deg)",
                  "hue-rotate(0deg)",
                ],
              }
            : { x: 0, filter: "hue-rotate(0deg)" }
        }
        className={`relative mx-auto w-full max-w-md rounded-[2rem] border p-3 sm:max-w-lg sm:p-5 ${
          darkTheme
            ? "border-pink-900/60 bg-[#08040d]/95 shadow-[0_0_60px_rgba(255,0,80,.12),inset_0_0_54px_rgba(0,0,0,.9)]"
            : "border-cyan-300/20 bg-[#10101b]/90 shadow-[0_0_50px_rgba(0,246,255,.12),inset_0_0_40px_rgba(0,0,0,.7)]"
        }`}
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_18px_#00f6ff]" />
        <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-pink-600 to-transparent shadow-[0_0_18px_#ff007a]" />

        <div className="mb-3 flex items-center justify-between px-1 text-[9px] uppercase tracking-[.5em] text-slate-500">
          <span className="flex gap-1">
            <i className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f6ff]" />
            <i className="h-1.5 w-1.5 rounded-full bg-pink-600 shadow-[0_0_8px_#ff007a]" />
            <i className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#ffb800]" />
          </span>

          <span>{topLabel}</span>

          <span className="flex gap-1">
            <i className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <i className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <i className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
        </div>

        <div className="relative rounded-[1.5rem] bg-[#070711]/95 p-4 shadow-[inset_0_0_50px_rgba(0,0,0,.95)] sm:p-6">
          <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-[linear-gradient(transparent_50%,rgba(255,255,255,.035)_50%)] bg-[length:100%_4px]" />
          <div className="relative z-10">{children}</div>
        </div>
      </motion.section>
    </main>
  );
}

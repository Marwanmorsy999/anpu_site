export function HorusEye({ className = "" }: { className?: string }) {
  return (
    <div className={`anpu-horus-eye ${className}`} aria-label="Eye of Horus monitor" role="img">
      <div className="anpu-horus-eye-glow" />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Eye_of_Horus_2.svg"
        alt=""
        loading="eager"
        decoding="async"
      />
      <span className="anpu-horus-scan" />
      <span className="anpu-horus-crosshair" />
      <div className="anpu-horus-readout">HORUS / WATCHING</div>
    </div>
  );
}

export default HorusEye;

const COLUMNS = [
  "01010110 01100001 01110101 01101100",
  "3A 7F 19 C2 00 4E 91 6B",
  "1011 0010 1100 0111 0101",
  "0x7C 0xFF 0x4F 0xA1 0x2D",
  "DNS TLS HSTS CSP COOKIE",
  "01100001 01101110 01110000 01110101",
  "9F 2A 7D 10 B8 44 03 E1",
  "1100 1010 0111 0001 1110",
  "SURFACE / SIGNAL / GUARD",
  "01 11 00 10 10 01 11 01",
  "A4 8C 2E D1 6F 00 73 B9",
  "1001 0011 1010 0110 1101",
  "SCAN READY REPORT SECURE",
  "0xAE 0x39 0x71 0xD0 0x4F",
  "0011 1101 0101 0001 1010",
  "C7 42 19 8A 5D 20 F1 6B",
  "ANPU GO CORE / OPEN SOURCE",
  "1010 1011 1100 0001 0111",
  "8E 04 BA 31 72 90 0D 55",
  "TLS // DNS // HTTP // SSH",
  "0110 0110 1001 0010 1111",
  "D4 3A 80 21 6E B7 00 CA",
  "0101 1010 1110 0100 1101",
  "AUTH / AUDIT / EXPOSE",
] as const;

export function TerminalRain() {
  return (
    <div className="anpu-terminal-rain" aria-hidden="true">
      {COLUMNS.map((text, index) => (
        <span
          className="anpu-terminal-rain-column"
          key={`${index}-${text}`}
          style={{
            left: `${index * 4.55 - 1}%`,
            animationDelay: `${(index % 7) * -1.7}s`,
            animationDuration: `${15 + (index % 5) * 2.5}s`,
          }}
        >
          {text}
          <br />
          {text}
          <br />
          {text}
          <br />
          {text}
        </span>
      ))}
    </div>
  );
}

export default TerminalRain;

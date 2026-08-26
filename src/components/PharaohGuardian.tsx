import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PharaohGuardianProps {
  className?: string;
  size?: number;
  state?: 'dormant' | 'active' | 'scanning' | 'analyzing' | 'alert' | 'stable' | 'awake';
  pulse?: boolean;
}

export function PharaohGuardian({
  className,
  size = 200,
  state = 'dormant',
  pulse = false,
}: PharaohGuardianProps) {
  const width = size;
  const height = size * 1.2;
  
  // State-based animations
  const [eyePulse, setEyePulse] = useState(false);

  useEffect(() => {
    // Pulse eyes based on state
    if (state === 'scanning' || state === 'analyzing' || state === 'active') {
      const interval = setInterval(() => {
        setEyePulse(prev => !prev);
      }, 800);
      return () => clearInterval(interval);
    } else {
      setEyePulse(false);
    }
  }, [state]);



  // Color schemes based on state
  const getColors = () => {
    switch (state) {
      case 'scanning':
      case 'analyzing':
        return {
          primary: '#FFB000',
          secondary: '#D88900',
          accent: '#FFD200',
          circuit: '#FF8C00',
          eye: '#FFB000',
          stone: '#1A1A1A',
          gold: '#C89B3C',
          status: 'ACTIVE',
          statusColor: '#FFB000',
        };
      case 'alert':
        return {
          primary: '#FF2A2A',
          secondary: '#CC0000',
          accent: '#FF5555',
          circuit: '#FF2A2A',
          eye: '#FF2A2A',
          stone: '#1A1A1A',
          gold: '#C89B3C',
          status: 'ALERT',
          statusColor: '#FF2A2A',
        };
      case 'stable':
        return {
          primary: '#7CFF4F',
          secondary: '#49D84A',
          accent: '#35B83A',
          circuit: '#2A9A2A',
          eye: '#7CFF4F',
          stone: '#1A1A1A',
          gold: '#C89B3C',
          status: 'STABLE',
          statusColor: '#7CFF4F',
        };
      case 'awake':
        return {
          primary: '#C89B3C',
          secondary: '#D6AE54',
          accent: '#B88632',
          circuit: '#A86600',
          eye: '#FFB000',
          stone: '#1A1A1A',
          gold: '#C89B3C',
          status: 'AWAKE',
          statusColor: '#C89B3C',
        };
      default: // dormant
        return {
          primary: '#6A6A6A',
          secondary: '#5A5A5A',
          accent: '#4A4A4A',
          circuit: '#3A3A3A',
          eye: '#3A3A3A',
          stone: '#1A1A1A',
          gold: '#4A4A4A',
          status: 'DORMANT',
          statusColor: '#6A6A6A',
        };
    }
  };

  const colors = getColors();

  // Eye glow intensity based on state
  const eyeGlow = state === 'dormant' ? 0.3 : state === 'alert' ? 1.0 : 0.8;

  return (
    <div 
      className={cn(
        "relative flex flex-col items-center justify-center pharaoh-guardian",
        className,
        state === 'scanning' && "pharaoh-scanning",
        state === 'analyzing' && "pharaoh-analyzing",
        state === 'alert' && "pharaoh-alert",
        pulse && "pharaoh-pulse"
      )}
      style={{ width, height }}
    >
      {/* Scan progress indicator (for scanning/analyzing states) */}
      {state === 'scanning' || state === 'analyzing' ? (
        <div 
          className="absolute inset-0 rounded-full border-2 border-current opacity-20"
          style={{
            borderColor: colors.primary,
            borderTopColor: 'transparent',
            animation: 'spin 2s linear infinite',
          }}
        />
      ) : null}

      {/* Main Pharaoh/Anubis Guardian SVG */}
      <svg
        viewBox="0 0 400 480"
        className="relative z-10 pharaoh-svg"
        style={{ 
          width: width * 0.8, 
          height: height * 0.8,
          filter: state === 'dormant' ? 'brightness(0.7)' : 'none',
        }}
        aria-label={`ANPU Guardian - ${state.toUpperCase()}`}
      >
        {/* ======================================== */}
        {/* PHARAOH HEAD & HEADDRESS */}
        {/* ======================================== */}
        
        {/* Headdress base - Nemes headdress */}
        <path
          d="M120 80 Q200 40 280 80 L280 140 L120 140 Z"
          fill={colors.gold}
          stroke={colors.secondary}
          strokeWidth="2"
          opacity="0.9"
        />
        
        {/* Headdress stripes */}
        <path
          d="M130 90 Q200 60 270 90 L270 110 L130 110 Z"
          fill={colors.accent}
          stroke={colors.secondary}
          strokeWidth="1"
        />
        <path
          d="M140 100 Q200 70 260 100 L260 120 L140 120 Z"
          fill={colors.primary}
          stroke={colors.secondary}
          strokeWidth="1"
        />
        
        {/* Uraeus (cobra) on forehead */}
        <path
          d="M195 85 Q200 75 205 85 L205 95 Q200 85 195 95 Z"
          fill={colors.primary}
          stroke={colors.secondary}
          strokeWidth="0.5"
        />
        <circle cx="200" cy="80" r="2" fill={colors.accent} />
        
        {/* ======================================== */}
        {/* FACE */}
        {/* ======================================== */}
        
        {/* Face outline - dark stone */}
        <path
          d="M140 140 Q140 180 160 200 Q180 220 200 220 Q220 220 240 200 Q260 180 260 140 L140 140 Z"
          fill={colors.stone}
          stroke={colors.circuit}
          strokeWidth="1.5"
        />
        
        {/* Cheekbones */}
        <path
          d="M160 180 Q170 185 180 180 L180 195 Q170 200 160 195 Z"
          fill={colors.stone}
          stroke={colors.circuit}
          strokeWidth="0.5"
          opacity="0.8"
        />
        <path
          d="M220 180 Q230 185 240 180 L240 195 Q230 200 220 195 Z"
          fill={colors.stone}
          stroke={colors.circuit}
          strokeWidth="0.5"
          opacity="0.8"
        />
        
        {/* Nose */}
        <path
          d="M200 140 L200 180 L195 185 L200 180"
          fill={colors.stone}
          stroke={colors.circuit}
          strokeWidth="0.5"
        />
        
        {/* Mouth - subtle */}
        <path
          d="M200 190 Q205 195 210 190"
          fill="none"
          stroke={colors.circuit}
          strokeWidth="1"
          strokeLinecap="round"
        />
        
        {/* ======================================== */}
        {/* EYES - The most important part */}
        {/* ======================================== */}
        
        {/* Left eye socket */}
        <ellipse cx="175" cy="160" rx="22" ry="18" fill={colors.stone} stroke={colors.circuit} strokeWidth="1" />
        
        {/* Right eye socket */}
        <ellipse cx="225" cy="160" rx="22" ry="18" fill={colors.stone} stroke={colors.circuit} strokeWidth="1" />
        
        {/* Left eye - glowing */}
        <ellipse 
          cx="175" 
          cy="160" 
          rx="14" 
          ry="12"
          fill={colors.eye}
          style={{
            filter: `drop-shadow(0 0 8px ${colors.eye}) drop-shadow(0 0 16px ${colors.eye})`,
            opacity: eyePulse ? 1 : eyeGlow,
            transition: 'opacity 0.3s ease'
          }}
        />
        
        {/* Right eye - glowing */}
        <ellipse 
          cx="225" 
          cy="160" 
          rx="14" 
          ry="12"
          fill={colors.eye}
          style={{
            filter: `drop-shadow(0 0 8px ${colors.eye}) drop-shadow(0 0 16px ${colors.eye})`,
            opacity: eyePulse ? 1 : eyeGlow,
            transition: 'opacity 0.3s ease'
          }}
        />
        
        {/* Eye pupils */}
        <ellipse cx="175" cy="160" rx="6" ry="8" fill={colors.stone} />
        <ellipse cx="225" cy="160" rx="6" ry="8" fill={colors.stone} />
        
        {/* Eye highlights */}
        <circle cx="173" cy="157" r="2" fill="white" opacity="0.8" />
        <circle cx="223" cy="157" r="2" fill="white" opacity="0.8" />
        
        {/* ======================================== */}
        {/* EARS - Jackal ears for Anubis */}
        {/* ======================================== */}
        
        {/* Left ear */}
        <path d="M140 140 L120 120 L125 100 L145 115 Z" fill={colors.stone} stroke={colors.circuit} strokeWidth="0.5"/>
        
        {/* Right ear */}
        <path d="M260 140 L280 120 L275 100 L255 115 Z" fill={colors.stone} stroke={colors.circuit} strokeWidth="0.5"/>
        
        {/* ======================================== */}
        {/* NECK & COLLAR */}
        {/* ======================================== */}
        
        {/* Neck */}
        <path d="M160 220 Q200 240 240 220 L240 260 Q200 280 160 260 Z" fill={colors.stone} stroke={colors.circuit} strokeWidth="0.5"/>
        
        {/* Usekh collar (broad collar) */}
        <path
          d="M160 220 Q170 230 180 225 Q190 235 200 225 Q210 235 220 225 Q230 230 240 220 L240 240 Q230 245 220 240 Q210 245 200 240 Q190 245 180 240 Q170 245 160 240 Z"
          fill={colors.gold}
          stroke={colors.secondary}
          strokeWidth="1"
          opacity="0.8"
        />
        
        {/* ======================================== */}
        {/* CIRCUIT TRACES - Cybernetic elements */}
        {/* ======================================== */}
        
        {/* Circuit lines on face */}
        <path d="M170 150 L170 140 L180 140 L180 155" fill="none" stroke={colors.circuit} strokeWidth="1" strokeLinecap="round"/>
        <path d="M210 150 L210 140 L220 140 L220 155" fill="none" stroke={colors.circuit} strokeWidth="1" strokeLinecap="round"/>
        
        {/* Circuit lines on headdress */}
        <path d="M150 90 L150 100 L200 100 L200 90" fill="none" stroke={colors.circuit} strokeWidth="0.5" strokeLinecap="round" opacity="0.7"/>
        <path d="M250 90 L250 100 L200 100 L200 90" fill="none" stroke={colors.circuit} strokeWidth="0.5" strokeLinecap="round" opacity="0.7"/>
        
        {/* Circuit nodes */}
        <circle cx="150" cy="95" r="1.5" fill={colors.circuit} />
        <circle cx="200" cy="95" r="1.5" fill={colors.circuit} />
        <circle cx="250" cy="95" r="1.5" fill={colors.circuit} />
        <circle cx="170" cy="145" r="1" fill={colors.circuit} />
        <circle cx="230" cy="145" r="1" fill={colors.circuit} />
        
        {/* Scan progress indicator on face */}
        {state === 'scanning' || state === 'analyzing' ? (
          <path
            d="M180 170 Q200 175 220 170"
            fill="none"
            stroke={colors.primary}
            strokeWidth="1"
            strokeLinecap="round"
            opacity={0.7}
          >
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite" />
          </path>
        ) : null}
        
        {/* ======================================== */}
        {/* HIEROGLYPHIC MARKINGS */}
        {/* ======================================== */}
        
        {/* Eye of Horus on forehead */}
        <path d="M195 105 L205 105 L205 115 L195 115 Z" fill={colors.primary} stroke={colors.secondary} strokeWidth="0.5"/>
        <path d="M198 108 L202 108 L202 112 L198 112 Z" fill={colors.accent}/>
        
        {/* Ankh symbol on chin */}
        <path d="M200 230 L200 250" fill="none" stroke={colors.gold} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="200" cy="250" r="4" fill={colors.gold} />
        <path d="M196 254 L204 254" fill="none" stroke={colors.gold} strokeWidth="2" strokeLinecap="round"/>
        
        {/* ======================================== */}
        {/* DIGITAL ELEMENTS */}
        {/* ======================================== */}
        
        {/* Pixel grid effect on cheeks */}
        <rect x="165" y="185" width="2" height="2" fill={colors.circuit} opacity="0.6" />
        <rect x="168" y="185" width="2" height="2" fill={colors.circuit} opacity="0.6" />
        <rect x="171" y="185" width="2" height="2" fill={colors.circuit} opacity="0.6" />
        <rect x="227" y="185" width="2" height="2" fill={colors.circuit} opacity="0.6" />
        <rect x="230" y="185" width="2" height="2" fill={colors.circuit} opacity="0.6" />
        <rect x="233" y="185" width="2" height="2" fill={colors.circuit} opacity="0.6" />
        
        {/* Scanline effect on face */}
        <line x1="140" y1="150" x2="260" y2="150" stroke={colors.circuit} strokeWidth="0.3" opacity="0.3"/>
        <line x1="140" y1="170" x2="260" y2="170" stroke={colors.circuit} strokeWidth="0.3" opacity="0.3"/>
        <line x1="140" y1="190" x2="260" y2="190" stroke={colors.circuit} strokeWidth="0.3" opacity="0.3"/>
      </svg>
      
      {/* Status label */}
      <div 
        className="absolute bottom-2 text-xs font-mono tracking-widest"
        style={{ color: colors.statusColor }}
      >
        GUARDIAN: {colors.status}
      </div>
    </div>
  );
}

export default PharaohGuardian;

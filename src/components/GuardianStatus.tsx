import { PharaohGuardian } from "./PharaohGuardian";

interface GuardianStatusProps {
  status: 'dormant' | 'active' | 'scanning' | 'analyzing' | 'alert' | 'stable' | 'awake';
  size?: number;
  showLabel?: boolean;
  className?: string;
}

const statusConfig = {
  dormant: {
    label: "DORMANT",
    color: "text-[#6A6A6A]",
    desc: "Standing by",
  },
  awaiting: {
    label: "AWAITING INPUT",
    color: "text-[#FFD200]",
    desc: "Waiting for command",
  },
  active: {
    label: "ACTIVE",
    color: "text-[#7CFF4F]",
    desc: "Processing",
  },
  scanning: {
    label: "SCANNING",
    color: "text-[#FFB000]",
    desc: "Reconnaissance in progress",
  },
  analyzing: {
    label: "ANALYZING",
    color: "text-[#FFB000]",
    desc: "Security analysis in progress",
  },
  alert: {
    label: "ALERT",
    color: "text-[#FF2A2A]",
    desc: "Security issues detected",
  },
  stable: {
    label: "STABLE",
    color: "text-[#7CFF4F]",
    desc: "System secure",
  },
  awake: {
    label: "AWAKE",
    color: "text-[#C89B3C]",
    desc: "System ready",
  },
};

export function GuardianStatus({ 
  status, 
  size = 48, 
  showLabel = true,
  className 
}: GuardianStatusProps) {
  const config = statusConfig[status] || statusConfig.dormant;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <PharaohGuardian size={size} state={status} />
      {showLabel && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            GUARDIAN STATUS
          </p>
          <p className={`text-sm font-bold ${config.color}`}>
            {config.label}
          </p>
          <p className="text-xs text-muted-foreground/70">
            {config.desc}
          </p>
        </div>
      )}
    </div>
  );
}

export default GuardianStatus;

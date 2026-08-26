import { Card } from "@/components/ui/card";
import { PharaohGuardian } from "@/components/PharaohGuardian";

interface ThreatIndexProps {
  score: number;
  grade: string;
  guardianStatus?: 'dormant' | 'active' | 'scanning' | 'analyzing' | 'alert' | 'stable' | 'awake';
  size?: 'sm' | 'md' | 'lg';
}

export function ThreatIndex({ score, grade, guardianStatus = 'stable', size = 'md' }: ThreatIndexProps) {
  // Determine bar color based on score
  const getBarColor = () => {
    if (score >= 9) return 'bg-[#7CFF4F]';
    if (score >= 8) return 'bg-[#A8E66C]';
    if (score >= 6) return 'bg-[#FFD200]';
    if (score >= 4) return 'bg-[#FF8C00]';
    if (score >= 2) return 'bg-[#FF5555]';
    return 'bg-[#FF2A2A]';
  };

  // Determine text color based on score
  const getTextColor = () => {
    if (score >= 8) return 'text-[#7CFF4F]';
    if (score >= 6) return 'text-[#FFD200]';
    if (score >= 4) return 'text-[#FF8C00]';
    return 'text-[#FF2A2A]';
  };

  // Determine guardian state based on score
  const guardianState = guardianStatus || (score >= 8 ? 'stable' : score >= 6 ? 'awake' : score >= 4 ? 'analyzing' : 'alert');

  // Size configurations
  const sizes = {
    sm: {
      container: 'p-4',
      scoreText: 'text-2xl',
      gradeText: 'text-xl',
      barHeight: 'h-2',
      barWidth: 'w-32',
      guardianSize: 24,
      labelSize: 'text-xs',
    },
    md: {
      container: 'p-6',
      scoreText: 'text-4xl',
      gradeText: 'text-3xl',
      barHeight: 'h-3',
      barWidth: 'w-48',
      guardianSize: 32,
      labelSize: 'text-sm',
    },
    lg: {
      container: 'p-8',
      scoreText: 'text-5xl',
      gradeText: 'text-4xl',
      barHeight: 'h-4',
      barWidth: 'w-64',
      guardianSize: 40,
      labelSize: 'text-base',
    },
  };

  const sizeConfig = sizes[size];

  // Calculate bar fill percentage
  const barFill = Math.min(Math.max(score, 0), 10);
  const barWidth = (barFill / 10) * 100;

  // Grade configuration
  const gradeConfig = {
    'A+': { label: 'EXCELLENT', color: 'text-[#7CFF4F]' },
    'A': { label: 'EXCELLENT', color: 'text-[#7CFF4F]' },
    'B': { label: 'GOOD', color: 'text-[#FFD200]' },
    'C': { label: 'ATTENTION', color: 'text-[#FF8C00]' },
    'D': { label: 'POOR', color: 'text-[#FF5555]' },
    'F': { label: 'CRITICAL', color: 'text-[#FF2A2A]' },
  };

  const gradeInfo = gradeConfig[grade as keyof typeof gradeConfig] || gradeConfig.C;

  return (
    <Card className={`border-border ${sizeConfig.container}`}>
      <div className="text-center">
        {/* Header */}
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
          ANPU THREAT INDEX
        </p>

        {/* Score */}
        <div className="mb-4">
          <span className={`font-bold ${getTextColor()} ${sizeConfig.scoreText}`}>
            {score.toFixed(1)}
          </span>
          <span className="text-muted-foreground text-lg"> / 10</span>
        </div>

        {/* Grade */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            GUARDIAN GRADE
          </p>
          <p className={`font-bold ${gradeInfo.color} ${sizeConfig.gradeText}`}>
            {grade}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            {gradeInfo.label}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2 px-2">
            <span>00</span>
            <span>02</span>
            <span>04</span>
            <span>06</span>
            <span>08</span>
            <span>10</span>
          </div>
          <div className={`bg-muted rounded-full overflow-hidden ${sizeConfig.barHeight} mx-auto ${sizeConfig.barWidth}`}>
            <div 
              className={`h-full ${getBarColor()} transition-all duration-500`}
              style={{ width: `${barWidth}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2 px-2">
            <span>CRITICAL</span>
            <span>HIGH RISK</span>
            <span>ATTENTION</span>
            <span>GOOD</span>
            <span>EXCELLENT</span>
          </div>
        </div>

        {/* Guardian */}
        <div className="flex items-center justify-center gap-3">
          <PharaohGuardian size={sizeConfig.guardianSize} state={guardianState} />
          <div className="text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              STATUS
            </p>
            <p className={`font-semibold ${getTextColor()} ${sizeConfig.labelSize}`}>
              {guardianState.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ThreatIndex;

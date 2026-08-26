interface AnpuMarkProps {
  className?: string;
}

export function AnpuMark({ className }: AnpuMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Abstract guardian silhouette - geometric Anubis-inspired mark */}
      {/* Head/ears */}
      <path
        d="M16 3 L11 11 L11 14 L21 14 L21 11 Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Inner ear accent */}
      <path
        d="M16 5 L13.5 10.5 L13.5 13 L18.5 13 L18.5 10.5 Z"
        fill="currentColor"
        opacity="0.4"
      />
      {/* Snout */}
      <path
        d="M13 14 L13 17 L19 17 L19 14 Z"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Body/shoulders */}
      <path
        d="M8 18 L12 17 L20 17 L24 18 L24 28 L8 28 Z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* Chest accent */}
      <path
        d="M14 18 L14 28 L18 28 L18 18 Z"
        fill="currentColor"
        opacity="0.3"
      />
      {/* Eye dots */}
      <circle cx="13.5" cy="12" r="0.8" fill="var(--background)" />
      <circle cx="18.5" cy="12" r="0.8" fill="var(--background)" />
    </svg>
  );
}

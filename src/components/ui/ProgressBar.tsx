interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-[280px] md:w-[400px] flex gap-[8px] h-[6px]">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        
        return (
          <div
            key={stepNumber}
            className={`flex-1 rounded-full h-full transition-colors duration-300 ${
              isCompleted || isCurrent
                ? "bg-[#3b82f6]"
                : "bg-[#cbd5e1]"
            }`}
          />
        );
      })}
    </div>
  );
}



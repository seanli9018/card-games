"use client";

import { useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Button } from "@/components";
import { StepProgressProps } from "./stepProgress.type";
import clsx from "clsx";

export default function StepProgress({
  steps,
  direction = "horizontal",
  size = "regular",
  onForward,
  ...restProps
}: StepProgressProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const prevStep = useRef(currentStep - 1);
  const stepItemsLength = steps.length;

  const stepProgressContainerStyle = clsx(
    "w-full flex flex-col items-center justify-between",
    restProps.className
  );

  const stepProgressTabsContainerStyle = clsx(
    `relative flex w-full overflow-hidden overflow-x-auto`,
    {
      "rounded-full": direction === "horizontal",
      "rounded-lg": direction === "vertical",
    }
  );

  const stepProgressTabsStyle = clsx(`grid w-full`, {
    [`grid-cols-${stepItemsLength}`]: direction === "horizontal",
    [`grid-rows-${stepItemsLength}`]: direction === "vertical",
  });

  const handleForwardStep = () => {
    if (!onForward) return;
    const forwardValidated = onForward(currentStep);

    if (forwardValidated) {
      setCurrentStep((prev) => Math.min(prev + 1, stepItemsLength));
    }
  };

  const { width: progressBarWidth, height: progressBarHeight } = useSpring({
    width: `${(currentStep / stepItemsLength) * 100}%`, // horizontal: dynamic width based on the progress value
    height: `${(currentStep / stepItemsLength) * 100}%`, // vertical: dynamic height based on the progress value
    from: {
      width: `${
        (prevStep.current > 0
          ? prevStep.current / stepItemsLength
          : 1 / stepItemsLength) * 100
      }%`,
      height: `${
        (prevStep.current > 0
          ? prevStep.current / stepItemsLength
          : 1 / stepItemsLength) * 100
      }%`,
    },
    config: { tension: 100, friction: 20 }, // Adjust animation feel
  });

  return (
    <div {...restProps} className={stepProgressContainerStyle}>
      <div className={stepProgressTabsContainerStyle}>
        <animated.div
          className="h-full bg-slate-100 dark:bg-slate-800 border-b-4 border-sky-600 absolute z-0"
          style={{
            width: direction === "horizontal" ? progressBarWidth : "100%",
            height: direction === "vertical" ? progressBarHeight : "100%",
          }}
        ></animated.div>
        <div className={stepProgressTabsStyle}>
          {steps.map((step, index) => {
            const stepProgressInnerStyles = clsx(
              "flex justify-stretch w-full overflow-hidden z-10",
              {
                "bg-transparent dark:text-slate-200": index + 1 <= currentStep,
                "bg-slate-200 dark:bg-slate-700 text-slate-200 dark:text-slate-400":
                  index + 1 > currentStep,
              },
              {
                "text-md": size === "large",
                "text-sm": size === "regular",
                "text-xs": size === "small",
              }
            );

            return (
              <button
                key={index}
                className={stepProgressInnerStyles}
                onClick={() => setCurrentStep(index + 1)}
              >
                <span className="flex flex-col p-2 items-center w-full text-nowrap">
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {steps[currentStep - 1].children ? steps[currentStep - 1].children : null}
      <div className="flex gap-4 mt-6 w-full">
        <Button
          size={size}
          widthType="layout"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <Button
          size={size}
          widthType="layout"
          disabled={currentStep === stepItemsLength}
          onClick={handleForwardStep}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

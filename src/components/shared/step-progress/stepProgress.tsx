'use client';

import { useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Button } from '@/components';
import { StepProgressProps } from './stepProgress.type';
import clsx from 'clsx';

export default function StepProgress({
  steps,
  backwardBtnLabel = 'Previous',
  forwardBtnLabel = 'Next',
  finalStepBtnLabel = 'Proceed',
  direction = 'horizontal',
  size = 'regular',
  onForward,
  onFinalStep,
  ...restProps
}: StepProgressProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const prevStep = useRef(currentStep - 1);
  const stepItemsLength = steps.length;

  const stepProgressContainerStyle = clsx(
    'w-full flex flex-col items-center justify-between',
    restProps.className
  );

  const stepProgressTabsContainerStyle = clsx(
    `relative flex w-full overflow-hidden overflow-x-auto bg-slate-200 dark:bg-slate-700 `,
    {
      'rounded-full': direction === 'horizontal',
      'rounded-lg': direction === 'vertical',
    }
  );

  const stepProgressTabsStyle = clsx(`flex w-full`, {
    'flex-row': direction === 'horizontal',
    'flex-col': direction === 'vertical',
  });

  const handleForwardStep = () => {
    if (!onForward) return;
    const forwardValidated = onForward(currentStep);

    if (forwardValidated) {
      // handle final step moving out of step progress.
      if (onFinalStep && currentStep === stepItemsLength) {
        onFinalStep();
        return;
      }
      // handle move forward.
      setCurrentStep((prev) => Math.min(prev + 1, stepItemsLength));
    }
  };

  const handleTabClick = (clickedStep: number) => {
    if (!onForward) return;

    // if the clicked step is first step, no validation is needed.
    if (clickedStep === 1) {
      setCurrentStep(1);
    }
    // check if the previous step of the clicked step is completed and validated.
    const forwardValidated = onForward(clickedStep - 1);

    if (forwardValidated) {
      setCurrentStep(clickedStep);
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
          className="bg-slate-100 dark:bg-slate-800 border-b-4 border-sky-600 absolute z-0"
          style={{
            width: direction === 'horizontal' ? progressBarWidth : '100%',
            height: direction === 'vertical' ? progressBarHeight : '100%',
          }}
        ></animated.div>
        <div className={stepProgressTabsStyle}>
          {steps.map((step, index) => {
            const stepProgressInnerStyles = clsx(
              'flex justify-stretch w-full overflow-hidden z-10',
              {
                'dark:text-slate-200': index + 1 <= currentStep,
                'text-slate-600 dark:text-slate-400': index + 1 > currentStep,
              },
              {
                'text-md': size === 'large',
                'text-sm': size === 'regular',
                'text-xs': size === 'small',
              }
            );

            return (
              <button
                key={index}
                className={stepProgressInnerStyles}
                onClick={() => handleTabClick(index + 1)}
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
          variant="secondary"
          widthType="layout"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
        >
          {backwardBtnLabel}
        </Button>
        <Button
          size={size}
          widthType="layout"
          disabled={!onFinalStep ? currentStep === stepItemsLength : false}
          onClick={handleForwardStep}
        >
          {currentStep === stepItemsLength
            ? finalStepBtnLabel
            : forwardBtnLabel}
        </Button>
      </div>
    </div>
  );
}

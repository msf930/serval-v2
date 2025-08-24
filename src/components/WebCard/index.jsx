"use client";

import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";




import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "motion/react";



import { games } from "../../../api/cards.api";
import { useGameContext } from "../../../store/gameContext";










const GameCard = ({
  id,
  data,
  setCardDrivenProps,
  setIsDragging,
  isDragging,
  isLast,
  setIsDragOffBoundary,
  setDirection
}) => {
  
  

  

  const [imgLoadingComplete, setImgLoadingComplete] = useState(false);
  

  const { affirmation, illustration } = data;
  const x = useMotionValue(0);

  

  const scoreVariants = {
    initial: {
      y: 0,
    },
    pop: {
      y: [0, -15, -20, -15, 0],
    },
  };

  const offsetBoundary = 150;

  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-200, 0, 200];
  const outputY = [50, 0, 50];
  const outputRotate = [-40, 0, 40];
  const outputActionScaleBadAnswer = [3, 1, 0.3];
  const outputActionScaleRightAnswer = [0.3, 1, 3];
 

  let drivenX = useTransform(x, inputX, outputX);
  let drivenY = useTransform(x, inputX, outputY);
  let drivenRotation = useTransform(x, inputX, outputRotate);
  let drivenActionLeftScale = useTransform(
    x,
    inputX,
    outputActionScaleBadAnswer
  );
  let drivenActionRightScale = useTransform(
    x,
    inputX,
    outputActionScaleRightAnswer
  );
  // let drivenBg = useTransform(x, inputX, outputMainBgColor);
  // let drivenBg = useTransform(x, [-20, 0, 20],  );

  useMotionValueEvent(x, "change", (latest) => {
    //@ts-ignore
    setCardDrivenProps((state) => ({
      ...state,
      cardWrapperX: latest,
      buttonScaleBadAnswer: drivenActionLeftScale,
      buttonScaleGoodAnswer: drivenActionRightScale,
      mainBgColor: "white",
    }));
  });

  return (
    <>
      <motion.div
        id={`cardDrivenWrapper-${id}`}
        className="absolute  bg-white p-8 rounded-lg text-center w-[80%] h-[60dvh] aspect-[100/150] pointer-events-none text-black origin-bottom shadow-card select-none"
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        
        <div
          id="illustration"
          className="w-[100%] h-[50%] mx-auto relative"
          style={{
            borderRadius: "10px",
          }}
        >
          <div
            id="imgPlaceholder"
            className="bg-gameSwipe-neutral absolute object-cover w-full h-full"
            style={{
              
            }}
          ></div>
          <Image
            priority
            className={` object-cover object-center ${
              imgLoadingComplete ? "opacity-100" : "opacity-0"
            } duration-500 ease-out`}
            src={`/${illustration}`}
            fill
            // sizes={`(max-width: 100%) 100vw, 300px`}
            alt="car"
            style={{
                borderRadius: "10px",
            }}
            onLoad={(img) => setImgLoadingComplete(true)}
          />
        </div>
        <p id="affirmation" className="mt-2 text-[20px] leading-tight">
          {affirmation}
        </p>
      </motion.div>

      <motion.div
        id={`cardDriverWrapper-${id}`}
        className={`absolute w-full aspect-[100/150] ${
          !isDragging ? "hover:cursor-grab" : ""
        }`}
        drag="x"
        dragSnapToOrigin
        dragElastic={0.2}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_, info) => {
          const offset = info.offset.x;

          if (offset < 0 && offset < offsetBoundary * -1) {
            setIsDragOffBoundary("left");
          } else if (offset > 0 && offset > offsetBoundary) {
            setIsDragOffBoundary("right");
          } else {
            setIsDragOffBoundary(null);
          }
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          setIsDragOffBoundary(null);
          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
          const direction = info.offset.x > 0 ? "right" : "left";

          if (isOffBoundary) {
            setDirection(direction);
          }
        }}
        style={{ x }}
      ></motion.div>
    </>
  );
};

export default GameCard;
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { motion, AnimatePresence } from "motion/react";





import { games } from "../../../api/cards.api";


import { easeOutExpo } from "../../../lib/easing.data";
import GameActionBtn from "../GameActionBtn";
import GameCard from "../WebCard";


const initialDrivenProps = {
  cardWrapperX: 0,
  buttonScaleBadAnswer: 1,
  buttonScaleGoodAnswer: 1,
  mainBgColor: "grey",
};

const GameCards = () => {
  
  const [game, setGame] = useState(games);

  useEffect(() => {
    setGame(games);
  }, []);

 const filler = {
    affirmation: "More than 40% of car journeys are less than 3mi.",
  answer: "right",
  revised:
    "It's true, 40% of car journeys are LESS than 3mi, which could be done on foot or by bike.",
  illustration: "arapahoe.png",
}
  
  
  // const { cards } = game;
  // console.log(cards);

  const [direction, setDirection] = useState("");
  const [isDragOffBoundary, setIsDragOffBoundary] =
    useState(null);
  const [cardDrivenProps, setCardDrivenProps] = useState(initialDrivenProps);
  const [isDragging, setIsDragging] = useState(false);

  const handleActionBtnOnClick = (btn) => {
    setDirection(btn);
  };

  useEffect(() => {
    if (["left", "right"].includes(direction)) {
      // Remove the last item and add it to the beginning
      const lastItem = game[game.length - 1];
      let remainingItems = game.slice(0, -1);
      remainingItems[0] = lastItem;
      const bufferArr = [...remainingItems]
      setGame(bufferArr);
      setTimeout(() => {
        
        setGame([filler, ...bufferArr]);
      }, 310);
    }

    setDirection("");
  }, [direction, game]);

  const cardVariants = {
    current: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
    upcoming: {
      opacity: 0.5,
      y: 80,
      scale: 0.9,
      transition: { duration: 0.3, ease: easeOutExpo, delay: 0 },
    },
    remainings: {
      opacity: 0.0,
      y: 50,
      scale: 0.9,
    },
    exit: {
      opacity: 0,
      x: direction === "left" ? -300 : 300,
      y: 40,
      rotate: direction === "left" ? -20 : 20,
      transition: { duration: 0.3, ease: easeOutExpo },
    },
  };

  return (
    <motion.div
      className={`flex  min-h-screen h-[100dvh] w-full flex-col justify-center items-center overflow-hidden bg-red-500 ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      
    >
      

      <div
        id="gameUIWrapper"
        className="flex flex-col gap-6 w-full h-[100dvh] mt-[100dvh] items-center justify-center relative  bg-red-500"
        
      >
        <div
          id="cardsWrapper"
          className="w-[100vw]  h-[100dvh] max-w-xs relative"
        >
          <AnimatePresence>
            {game.map((card, i) => {
              const isLast = i === 9;
              const isUpcoming = i === 8;
              return (
                <motion.div
                  key={`card-${i}`}
                  id={`card-${card.id}`}
                  className={`relative w-[100vw]    flex justify-center items-center`}
                  variants={cardVariants}
                  initial="remainings"
                  animate={
                    isLast ? "current" : isUpcoming ? "upcoming" : "remainings"
                  }
                  exit="exit"
                >
                  <GameCard
                    data={card}
                    id={card.id}
                    setCardDrivenProps={setCardDrivenProps}
                    setIsDragging={setIsDragging}
                    isDragging={isDragging}
                    isLast={isLast}
                    setIsDragOffBoundary={setIsDragOffBoundary}
                    setDirection={setDirection}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
      </div>
    </motion.div>
  );
};

export default GameCards;
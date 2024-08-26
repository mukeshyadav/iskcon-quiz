import React from "react";
import { motion } from "framer-motion";
import balloonImage from "../../sounds/ballon.png"; // Path to your balloon image
import "./animate-bg.css";

const balloonVariants = {
  initial: {
    y: "100vh", // Start from below the viewport
    opacity: 0,
  },
  animate: {
    y: "-100vh", // Move to above the viewport
    opacity: 1,
    transition: {
      duration: 6, // Slow duration for smooth animation
      ease: "easeOut",
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 1.5,
      ease: "easeIn",
    },
  },
};

const AnswerAnimation = ({ isCorrect }) => {
  // Generate a few balloons with random horizontal positions and staggered delays
  const balloons = Array.from({ length: 5 }).map((_, index) => (
    <motion.img
      key={index}
      src={balloonImage}
      alt="Balloon"
      variants={balloonVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="balloon"
      style={{
        left: `${Math.random() * 100}vw`, // Random horizontal position
        position: "absolute",
        bottom: 0, // Start at the bottom of the viewport
      }}
      transition={{
        delay: index * 0.8, // Stagger the start times
        duration: 6, // Slow down the duration for each balloon
        ease: "easeOut",
      }}
    />
  ));

  return <>{isCorrect && balloons}</>;
};

export default AnswerAnimation;

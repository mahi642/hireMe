import React, { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // For responsive confetti size

const CongratulationBlast = ({ show }) => {
  const { width, height } = useWindowSize();

  return (
    <>
      {show && <Confetti width={width} height={height} />}
      {show && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h1>Congratulations! 🎉</h1>
          <p>You have successfully applied for the job!</p>
        </div>
      )}
    </>
  );
};

export default CongratulationBlast;


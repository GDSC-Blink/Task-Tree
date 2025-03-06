"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LinearProgress from "@mui/material/LinearProgress";
import Widget from "./widget";

const StatsComponent = () => {
  return (
    <Widget title="Statistics">
      <div className="flex items-center">
        {/* Circular progress bar on the left */}
        <div className="w-[10vw] h-[10vh] mt-10 ml-20">
          <CircularProgressbar
            value={45}
            circleRatio={0.7}
            text="XP"
            styles={buildStyles({
              rotation: 0.65,
              pathColor: "#808080",
            })}
          />
        </div>
        {/* Horizontal progress bars on the right */}
        <div className="ml-16 mt-16 flex flex-col gap-2 justify-center" style={{ width: "40%" }}>
          <LinearProgress
            variant="determinate"
            value={20}
            sx={{
            height: 10,
            backgroundColor: "#e0e0e0", // track color
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#808080",
              },
            }}
          />
          <LinearProgress
            variant="determinate"
            value={40}
            sx={{
            height: 10,
            backgroundColor: "#e0e0e0", // track color
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#808080",
              },
            }}
          />
          <LinearProgress
            variant="determinate"
            value={60}
            sx={{
            height: 10,
            backgroundColor: "#e0e0e0", // track color
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#808080",
              },
            }}
          />
          <LinearProgress
            variant="determinate"
            value={80}
            sx={{
            height: 10,
            backgroundColor: "#e0e0e0", // track color
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#808080",
              },
            }}
          />
        </div>
      </div>
    </Widget>
  );
};

export default StatsComponent;
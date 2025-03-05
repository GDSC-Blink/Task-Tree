"use client";
// components/StatsComponent.tsx
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Widget from "./widget";

const StatsComponent = () => {
  return (
        <Widget title="Statistics">
            <div className='w-[10vw] h-[10vh] mt-10'>
              <CircularProgressbar
                  value={45} circleRatio={0.7}
                  styles={buildStyles({
                        rotation: 0.65,
                        pathColor:"#808080"
                  })}
              />
            </div>
            
        </Widget>
  );
};

export default StatsComponent;
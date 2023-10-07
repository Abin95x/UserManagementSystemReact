import React from 'react';
import { useSelector } from "react-redux";
import { Carousel, Typography } from "@material-tailwind/react";


const Banner = () => {
const { name } = useSelector((state) => state.user);

  return (
    
    <Carousel className="rounded-xl">
    <div className="banner" style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <img src="/spidy.png" alt="Banner" style={{ width: "100%", height: "100%" }} />
  
      {name && (
        <div
          className="text-white text-3xl md:text-4xl lg:text-5xl absolute top-0 left-0 w-full h-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <Typography variant="h1" className="mb-4">
            welcome {name}
          </Typography>
        </div>
      )}
    </div>
  </Carousel>
  

  );
};

export default Banner;

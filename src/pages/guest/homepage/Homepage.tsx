import { Title } from "@mantine/core";
import Carousel from "../../../components/carousel/HomeCarousel";
import HeroContent from "../../../components/hero/HeroContent";
import { useEffect } from "react";
import { getAuthCredentials } from "../../../utils/loader/auth/auth";

const Homepage = () => {
  useEffect(() => {
    if(getAuthCredentials()){
      window.location.href = "/home";
    }
  },[]);
  return (
    <div className="overflow-x-hidden">
      <HeroContent />
      <div className="p-10 mx-auto">
        <Title className="text-center text-4xl" >Why u should use QuizToast</Title> 
      </div>
      <Carousel />
    </div>
  );
};

export default Homepage;

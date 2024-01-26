import { Title } from "@mantine/core";
import Carousel from "../../components/carousel/Carousel";
import HeroContent from "../../components/hero/HeroContent";

const Homepage = () => {
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

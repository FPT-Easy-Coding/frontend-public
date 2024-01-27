import { Carousel } from "@mantine/carousel";

export default function () {
  return (
    <Carousel
      slideSize="70%"
      height={"50vh"}
      slideGap="md"
      controlsOffset="xs"
      controlSize={30}
      loop
      dragFree
      withIndicators
    >
      <Carousel.Slide bg={"red"}>1</Carousel.Slide>
      <Carousel.Slide bg={"blue"}>2</Carousel.Slide>
      <Carousel.Slide bg={"green"}>3</Carousel.Slide>
      <Carousel.Slide bg={"yellow"}>4</Carousel.Slide>
      <Carousel.Slide bg={"orange"}>5</Carousel.Slide>
    </Carousel>
  );
}

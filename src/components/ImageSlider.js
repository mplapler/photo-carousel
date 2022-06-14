import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import { fetchData } from "./ApiService";

const OPTIONS = ["food", "music", "sport"];

const NUMBER_OF_IMAGES = [3, 4, 5, 6, 7, 8, 9, 10];

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [option, setOption] = useState(OPTIONS[0]);
  const [numberOfImages, setNumberOfImages] = useState(7);

  const finalImages = images.slice(0, numberOfImages);

  useEffect(() => {
    async function helper() {
      const response = await fetchData(option);

      setImages(response.hits);
    }

    helper();
  }, [option]);

  const nextSlide = () => {
    setCurrent(current === finalImages.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? finalImages.length - 1 : current - 1);
  };

  return (
    <section className="slider">
      <div className="drop-down">
        <p>images displayed:</p>
        <select className="select"
          value={numberOfImages}
          onChange={(event) => {
            setNumberOfImages(event.target.value);
          }}
        >
          {NUMBER_OF_IMAGES.map((item) => {
            return (
              <option  key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>

      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />

      <div className="filter-buttons">
        <button
          className="food-btn"
          onClick={() => {
            setOption("food");
          }}
        >
          Food
        </button>
        <button
          className="music-btn"
          onClick={() => {
            setOption("music");
          }}
        >
          Music
        </button>
        <button
          className="sport-btn"
          onClick={() => {
            setOption("sport");
          }}
        >
          Sport
        </button>
      </div>

      {images.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img
                src={slide.webformatURL}
                alt={slide.tags}
                className="image"
              />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;

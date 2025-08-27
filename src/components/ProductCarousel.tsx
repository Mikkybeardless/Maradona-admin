import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import DefaultImage from "../assets/no-image.png";

export default function ProductCarousel({ images }: { images: string[] }) {
  const isEmpty = images.length < 1;
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    if (isEmpty) return;
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    if (isEmpty) return;
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (isEmpty) {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center h-64">
        <img
          src={DefaultImage}
          alt={`Default image`}
          className="w-full h-full rounded-lg object-contain"
        />
        <p className="text-gray-500">No images available for this product</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-2">
      <div className="relative">
        {/* Main image with navigation controls positioned outside */}
        <div className="flex items-center">
          {/* Left Chevron - now outside the image */}
          <div className="mr-3">
            <button
              onClick={goToPrevious}
              className="bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-all"
              aria-label="Previous image"
            >
              <BiChevronLeft size={20} className="text-gray-800" />
            </button>
          </div>

          {/* Main image container */}
          <div className="flex-grow w-40 md:w-[486px] h-fit max-h-96 rounded-3xl overflow-hidden mb-4">
            <img
              src={images[currentIndex]}
              alt={`Product image ${currentIndex + 1}`}
              className="w-full h-full rounded-lg object-contain"
            />
          </div>

          {/* Right Chevron - now outside the image */}
          <div className="ml-3">
            <button
              onClick={goToNext}
              className="bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-all"
              aria-label="Next image"
            >
              <BiChevronRight size={20} className="text-gray-800" />
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex space-x-2 justify-center overflow-x-auto py-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-20 h-20  rounded-md overflow-hidden transition-all ${
                index === currentIndex
                  ? "border-[3px] border-white opacity-100"
                  : "border border-gray-300 opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full rounded-md object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Optional: Image counter */}
      <div className="text-center text-sm text-gray-500 mt-2">
        Image {currentIndex + 1} of {images.length}
      </div>
    </div>
  );
}

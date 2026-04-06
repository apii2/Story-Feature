import {
  ArrowLeftCircle,
  ArrowRightCircle,
  Image,
  X,
  Clock,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import ImageAddModal from "./components/ImageAddModal";
import ImageSwiper from "./components/ImageSwiper";

export interface Image {
  id: number;
  url: string;
  datetime: string;
}

function App() {
  const [openImageAddModal, setOpenImageAddModal] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isProgressActive, setIsProgressActive] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    setImages(JSON.parse(localStorage.getItem("storyImages") || "[]"));

    const interval = setInterval(() => {
      setImages((prev) => {
        const now = new Date().getTime();

        const validImages = prev.filter((img) => {
          const imageTime = new Date(img.datetime).getTime();
          return now - imageTime < 24 * 60 * 60 * 1000;
        });

        localStorage.setItem("storyImages", JSON.stringify(validImages));
        return validImages;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      setIsProgressActive(true);
      setProgressPercentage(0);
      const duration = 5000;
      const intervalTime = 50;

      const step = 100 / (duration / intervalTime);

      const progressInterval = setInterval(() => {
        setProgressPercentage((prev) => {
          if (prev >= 100) {
            setIsProgressActive(false);
            clearInterval(progressInterval);
            handleAutoImageChange();
            return 100;
          }
          return prev + step;
        });
      }, intervalTime);

      return () => {
        clearInterval(progressInterval);
      };
    } else {
      setIsProgressActive(false);
      setProgressPercentage(0);
    }
  }, [selectedImage]);

  const handleAutoImageChange = (flow?: "next" | "prev") => {
    if (images.length > 0) {
      const currentIndex = images.findIndex((img) => img.url === selectedImage);
      const nextIndex = flow === "prev" ? currentIndex - 1 : currentIndex + 1;
      if (nextIndex < images.length) {
        setSelectedImage(images[nextIndex].url);
        return;
      }
      setSelectedImage("");
    }
  };

  const handleImageAdd = (imageSrc: string) => {
    setImages((prev) => {
      const updatedImages = [
        ...prev,
        {
          id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
          url: imageSrc,
          datetime: new Date().toISOString(),
        },
      ];
      localStorage.setItem("storyImages", JSON.stringify(updatedImages));
      return updatedImages;
    });
  };

  const handleCloseModal = () => {
    setOpenImageAddModal(false);
  };

  const handleCloseStory = () => {
    setSelectedImage("");
    setIsProgressActive(false);
    setProgressPercentage(0);
  };

  const getCurrentImageInfo = () => {
    const currentImage = images.find((img) => img.url === selectedImage);
    if (!currentImage) return null;

    const currentIndex = images.findIndex((img) => img.url === selectedImage);
    const uploadTime = new Date(currentImage.datetime);
    const timeAgo = Math.floor(
      (new Date().getTime() - uploadTime.getTime()) / (1000 * 60 * 60),
    );

    return {
      index: currentIndex + 1,
      total: images.length,
      timeAgo: timeAgo < 1 ? "Just now" : `${timeAgo}h ago`,
      uploadTime: uploadTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  return (
    <>
      <div className="w-full lg:max-w-[50%] md:max-w-[60%] max-w-[90%] min-w-75 min-h-screen py-8 xl:py-6 mx-auto box-border">
        {/* Story Images Swiper */}
        <ImageSwiper
          images={images}
          setOpenImageAddModal={setOpenImageAddModal}
          setSelectedImage={setSelectedImage}
        />

        {/* Display Image */}
        <div className="min-h-[calc(100dvh-11rem)] bg-gray-300 flex items-center justify-center p-7 rounded-xl shadow-lg text-center dark:bg-gray-800 relative">
          {selectedImage ? (
            <div className="relative w-full h-full">
              <div className="absolute top-2 left-0 z-20 w-full flex items-center justify-between px-1.5">
                {/* Story Info Header */}
                <div className="text-white bg-gray-600/50 rounded-lg px-3 py-1.5 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>
                      {getCurrentImageInfo()?.index} of{" "}
                      {getCurrentImageInfo()?.total}
                    </span>
                  </div>
                </div>

                {/* Time Display */}
                <div className="text-white bg-gray-600/50 rounded-md px-2 py-1 text-xs">
                  {getCurrentImageInfo()?.timeAgo}
                </div>

                {/* Close Button */}
                <button
                  onClick={handleCloseStory}
                  className="text-white bg-gray-600/50 hover:bg-gray-600/70 rounded-full p-2 transition-all duration-200 hover:scale-110"
                  title="Close story"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar Container */}
              {isProgressActive && (
                <div className="absolute top-14 left-2 right-2 z-20">
                  <div className="rounded-full w-full h-1.5 bg-white/30 shadow-lg backdrop-blur-sm">
                    <div
                      className="bg-white h-1.5 transition-all duration-100 ease-linear rounded-full shadow-sm"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Main Image */}
              <img
                src={selectedImage}
                alt="Selected Story"
                className="w-full h-full rounded-lg shadow-2xl object-contain"
              />

              {/* Image Info Footer */}
              <div className="absolute bottom-2 left-2 right-2 z-20 text-white bg-gray-600/50 rounded-lg px-3 py-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Uploaded at {getCurrentImageInfo()?.uploadTime}
                  </span>
                  <span className="text-xs opacity-75">
                    Expires in{" "}
                    {24 -
                      Math.floor(
                        (new Date().getTime() -
                          new Date(
                            images.find((img) => img.url === selectedImage)
                              ?.datetime || "",
                          ).getTime()) /
                          (1000 * 60 * 60),
                      )}
                    h
                  </span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                disabled={
                  images.findIndex((img) => img.url === selectedImage) ===
                  images.length - 1
                }
                onClick={() => handleAutoImageChange("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-600/50 hover:bg-gray-600/70 disabled:bg-gray-600/30 disabled:cursor-not-allowed rounded-full p-3 transition-all duration-200 hover:scale-110 disabled:hover:scale-100 shadow-lg"
                title="Next story"
              >
                <ArrowRightCircle className="w-6 h-6" />
              </button>
              <button
                disabled={
                  images.findIndex((img) => img.url === selectedImage) === 0
                }
                onClick={() => handleAutoImageChange("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-600/50 hover:bg-gray-600/70 disabled:bg-gray-600/30 disabled:cursor-not-allowed rounded-full p-3 transition-all duration-200 hover:scale-110 disabled:hover:scale-100 shadow-lg"
                title="Previous story"
              >
                <ArrowLeftCircle className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500">
                <Image className="w-full h-full" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  No Story Selected
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Click an image above to preview it here, or use the
                  <span className="font-medium text-gray-700 dark:text-gray-200 mx-1">
                    "+"
                  </span>
                  button to upload new stories.
                </p>
              </div>
              {images.length > 0 && (
                <div className="mt-6 text-sm text-gray-400 dark:text-gray-500">
                  {images.length} {images.length === 1 ? "story" : "stories"}{" "}
                  available
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Image Add Modal */}
      {openImageAddModal && (
        <ImageAddModal onClose={handleCloseModal} onImageAdd={handleImageAdd} />
      )}
    </>
  );
}

export default App;

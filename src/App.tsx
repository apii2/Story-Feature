import { Image } from "lucide-react";
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
      const duration = 3000;
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

  const handleAutoImageChange = () => {
    if (images.length > 0) {
      const currentIndex = images.findIndex((img) => img.url === selectedImage);
      const nextIndex = (currentIndex + 1) % images.length;
      if (nextIndex < images.length && nextIndex !== 0) {
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
        <div className="min-h-[calc(100dvh-11rem)] bg-gray-50 p-7 rounded-xl shadow-lg text-center dark:bg-gray-800">
          {selectedImage ? (
            <div className="relative">
              {/* Progress Bar */}
              {isProgressActive && (
                <div className="absolute top-2 left-0 right-0 mx-auto rounded-full w-[96%] h-1.5 bg-gray-100 shadow-lg">
                  <div
                    className="bg-gray-800 h-1.5 transition-all duration-100 ease-linear rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              )}

              <img
                src={selectedImage}
                alt="Selected Story"
                className="mx-auto w-full h-full rounded-lg"
              />
            </div>
          ) : (
            <>
              <p className="text-center text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                Click an image above to preview it here, or use the
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {" "}
                  "+"{" "}
                </span>
                button to upload new ones.
              </p>
            </>
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

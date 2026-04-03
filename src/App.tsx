import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import ImageAddModal from "./components/ImageAddModal";
import ImageSwiper from "./components/ImageSwiper";

export interface Image {
  id: number;
  url: string;
  datetime: Date;
}

function App() {
  const [openImageAddModal, setOpenImageAddModal] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    setImages(JSON.parse(localStorage.getItem("storyImages") || "[]"));
  }, []);

  const handleImageAdd = (imageSrc: string) => {
    setImages((prev) => {
      const updatedImages = [
        ...prev,
        {
          id: prev.length + 1,
          url: imageSrc,
          datetime: new Date(),
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
            <div>
              <img
                src={selectedImage}
                alt="Selected Story"
                className="mx-auto w-full h-full rounded-lg"
              />
            </div>
          ) : (
            <>
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                Click an image above to preview it here, or use the
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {" "}"+"{" "}
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

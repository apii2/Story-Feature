import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import ImageAddModal from "./components/ImageAddModal";

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
      const updatedImages = [...prev, { 
        id: prev.length + 1, 
        url: imageSrc, 
        datetime: new Date() 
      }];
      localStorage.setItem("storyImages", JSON.stringify(updatedImages));
      return updatedImages;
    });
  };

  const handleCloseModal = () => {
    setOpenImageAddModal(false);
  };

  return (
    <>
      <div className="w-full lg:max-w-[40%] md:max-w-[60%] max-w-[90%] min-w-75 min-h-screen py-6 mx-auto box-border">
        <div className="flex gap-5 mb-10 flex-wrap">
          {/* Add button */}
          <div
            onClick={() => setOpenImageAddModal(true)}
            className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden border-[3px] border-gray-300 shadow-md transition-all duration-300 cursor-pointer hover:shadow-lg group hover:border-white dark:border-gray-600"
          >
            <Plus className="w-4/5 h-4/5 text-gray-500 group-hover:text-white pointer-events-none transition-all duration-300" />
          </div>

          {/* Display added images */}
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image.url)}
              className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-gray-300 shadow-md transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
            >
              <img
                src={image.url}
                alt={`Story ${image.id}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Display Image */}
        <div className="min-h-[calc(100dvh-11rem)] bg-gray-50 p-7 rounded-xl shadow-lg text-center dark:bg-gray-800">
          {selectedImage ? (
            // <ImageSwiper imageList={images} />
            <div>
              <img
                src={selectedImage}
                alt="Selected Story"
                className="mx-auto w-full h-full rounded-lg"
              />
            </div>
          ) : (
            <>
              <h2 className="text-gray-800 mb-5 text-2xl dark:text-white">
                Main Content
              </h2>
              <p className="text-gray-600 leading-6 text-base dark:text-gray-300">
                This is your main content area that takes up one-third of the
                width and is centered on the page.
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

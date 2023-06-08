/* eslint-disable @next/next/no-img-element */
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

function ImageUpload({
  images,
  setImages,
}: {
  images: any[];
  setImages: Dispatch<SetStateAction<any[]>>;
}) {
  const uploadImages = async (e: any) => {
    const files = e.target.files as any[];
    if (files.length > 0) {
      for (let image of files) {
        if (image.size > 6291456) {
          toast.error("upload image cannot be larger than 6MB");
          return;
        }
      }
      setImages((pre) => [...pre, ...files]);
    }
  };
  const handleDeleteImageOnClick = (imageName: string) => {
    setImages((pre) => images.filter((image) => image.name !== imageName));
  };
  return (
    <div>
      <div className="flex flex-row gap-4 mt-8 flex-wrap">
        <div className="mockup-code  bg-primary text-primary-content w-full text-xs sm:text-sm">
          <pre data-prefix=">">
            <code>Please pay the booking fee in one day, thanks.</code>
          </pre>
          <pre data-prefix=">">
            <code>payment receipt can not exceed 6MB.</code>
          </pre>
          <pre data-prefix=">">
            <code>You can upload upto 3 images.</code>
          </pre>
        </div>
        <h2 className=" my-auto">Upload payment receipt:</h2>
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs file-input-sm md:file-input-md"
          onChange={uploadImages}
          accept="image/*"
          multiple
        />
      </div>
      {images.length > 0 && (
        <div className="flex gap-6 mt-8 flex-wrap">
          {images.map((image) => (
            <div className="indicator" key={image.name}>
              <span
                className="indicator-item badge badge-secondary cursor-pointer w-10 h-8"
                onClick={() => handleDeleteImageOnClick(image.name)}
              >
                X
              </span>

              <img
                src={URL.createObjectURL(image)}
                alt="your image"
                className=" w-36 h-28 rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;

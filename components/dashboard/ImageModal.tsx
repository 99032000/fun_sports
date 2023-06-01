import Image from "next/image";
const ImageModal = ({ url }: { url: string }) => {
  return (
    <>
      <input type="checkbox" id={url} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={url}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <Image
            src={url}
            alt="image"
            width={240}
            height={240}
            quality={100}
            className=" rounded-xl object-contain w-full"
          />
        </div>
      </div>
    </>
  );
};

export default ImageModal;

import { Modal } from "@nextui-org/react";
import { Carousel } from "react-responsive-carousel";

/**
 * Compoent - Image Carousel Preview
 */
function ImageCarousel({ images, visible, selected, handleClose }) {
  return (
    <>
      <Modal
        blur
        aria-labelledby="modal-title"
        width="60%"
        open={visible}
        onClose={handleClose}
      >
        <Carousel selectedItem={selected} showThumbs={false}>
          {images.map(({ id, image }) => (
            <div key={`image-${id}`}>
              <img src={image} alt="gallery photo" />
            </div>
          ))}
        </Carousel>
      </Modal>
    </>
  );
}

export default ImageCarousel;

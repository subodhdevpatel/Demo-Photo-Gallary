import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

import Image from "@/Components/Image";
import { useRouter } from "next/router";

import ConfirmDelete from "@/Components/Modal/ConfirmDelete";
import ImageCarousel from "@/Components/Modal/ImageCarousel";

/**
 * Page - Preview
 */
function Images() {
  const [imagesState, setImages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const [urlState, setUrlState] = useState({ next: "", prev: "" });
  const [deleteVisible, setdeleteVisible] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API}/images/`)
        .then((res) => {
          if (res.data) {
            setUrlState({
              next: res.data.next,
              prev: res.data.previous,
            });
            setImages(res.data.results);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };
    fetch();
  }, []);

  /**
   * Handle Image delete
   * @param {number} id
   */
  const onDelete = useCallback(async (id) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_BASE_API}/images/`, {
        data: { image_ids: [id] },
      })
      .then(() => {
        setImages((prev) => prev.filter((img) => img.id !== id));
        setdeleteVisible(null);
        toast.success("Image deleted successfully");
      })
      .catch((error) => alert(error.message));
  }, []);

  /**
   * Handler page change for pagination
   * @param {string} key
   */
  const handlePageChange = useCallback(
    (key) => {
      if (!urlState[key]) {
        return;
      }

      axios
        .get(urlState[key])
        .then((res) => {
          setImages(res.data.results);
          setUrlState({
            next: res.data.next,
            prev: res.data.previous,
          });
        })
        .catch((error) => alert(error.message));
    },
    [urlState]
  );

  /**
   * Prepare the images in grid view
   */
  const prepareImages = useMemo(
    () => (
      <div className="image-grid">
        {imagesState.map((img, index) => (
          <div
            className="image-item"
            onClick={() => {
              setVisible(true);
              setSelected(index);
            }}
            key={`image-${img.id}`}
          >
            <div style={{ position: "relative" }}>
              <RiDeleteBin6Line
                size={30}
                onClick={(e) => {
                  e.stopPropagation();
                  setdeleteVisible(img.id);
                }}
                style={{
                  height: "30px",
                  position: "absolute",
                  right: 1,
                  top: 1,
                  zIndex: 1,
                  backgroundColor: "white",
                }}
              />
              <Image hash={img.blur_hash} imgSrc={img.image} />
            </div>
          </div>
        ))}
      </div>
    ),
    [imagesState]
  );

  return (
    <div className="preview-image">
      <button onClick={() => router.push("/")} className="submit-button">
        Home
      </button>
      <h1 className="title">Uploaded Images</h1>
      {prepareImages}
      <div className="button">
        <button
          disabled={!urlState.next}
          onClick={() => handlePageChange("next")}
          className={!urlState.next ? "btn-dis" : "btn"}
        >
          Next
        </button>
        <button
          disabled={!urlState.prev}
          onClick={() => handlePageChange("prev")}
          className={!urlState.prev ? "btn-dis" : "btn"}
        >
          Prev
        </button>
      </div>

      <ConfirmDelete
        deleteVisible={deleteVisible}
        handleDelete={onDelete}
        handleCancel={() => setdeleteVisible(null)}
      />

      <ImageCarousel
        visible={visible}
        images={imagesState}
        selected={selected}
        handleClose={() => setVisible(false)}
      />
    </div>
  );
}

export default Images;

import React, { useCallback, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

import { Container } from "@nextui-org/react";

import { RiDeleteBin6Line } from "react-icons/ri";

/**
 * Page - Upload Images
 */
function UploadImage() {
  const router = useRouter();
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  /**
   * Handle image change
   */
  const onChangeImage = useCallback((e) => {
    if (!e.target.files.length) return;
    if (e.target.files.length > 20) {
      return setErrorMsg("Max 20 images allowed");
    }
    setErrorMsg("");
    setFiles((prev) => [...prev, ...e.target.files]);
    setPreviews((prev) => [
      ...prev,
      ...Object.values(e.target.files).map((img) => URL.createObjectURL(img)),
    ]);
  }, []);

  /**
   * Handle upload image
   */
  const onUploadImage = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    Object.values(files).map((fileN) => {
      formdata.append("image", fileN, fileN.name);
    });
    setLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_API}/upload/`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        router.push("/previewimage");
      })
      .catch((error) => {
        setErrorMsg(error.message);
        setLoading(false);
        toast.error(error.message);
      });
  };

  /**
   * Handle the delete image from preview
   */
  const handleDeletePreviewImage = useCallback(
    (preview, previewIndex) => {
      setPreviews((prev) => prev.filter((item) => item !== preview));
      setFiles((prev) => prev.filter((_, index) => index !== previewIndex));
    },
    [files]
  );

  return (
    <div className="upload-page">
      <button onClick={() => router.push("/")} className="submit-button">
        Home
      </button>
      <form onSubmit={onUploadImage}>
        <input
          accept="image/*"
          type="file"
          ref={ref}
          multiple
          style={{ display: "none" }}
          onChange={onChangeImage}
          className="file-input"
        />
        <Container css={{ display: "flex", padding: 0 }}>
          <div className="submit-button" onClick={() => ref.current.click()}>
            Pick a file
          </div>
          <button
            type="submit"
            className={
              files.length === 0 || loading
                ? "submit-button-dis"
                : "submit-button"
            }
            disabled={files.length === 0 || loading}
          >
            {loading ? "Uploading..." : "Upload Images"}
          </button>
        </Container>
      </form>
      {errorMsg && <div className="error">{errorMsg}</div>}
      {!errorMsg && (
        <div className="preview-grid">
          {previews.map((preview, index) => (
            <div style={{ position: "relative" }} key={`preview-${index}`}>
              <img
                src={preview}
                width="100%"
                height="300px"
                style={{ objectFit: "contain" }}
              />
              <div>
                <RiDeleteBin6Line
                  size={30}
                  onClick={() => handleDeletePreviewImage(preview, index)}
                  style={{
                    height: "30px",
                    cursor: "pointer",
                    position: "absolute",
                    right: 1,
                    top: 1,
                    zIndex: 1,
                    backgroundColor: "white",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UploadImage;

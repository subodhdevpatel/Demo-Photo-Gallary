import React, { useState, useCallback } from "react";
import { Blurhash } from "react-blurhash";

/**
 * Components - Image
 */
function Image({ hash, imgSrc }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  /**
   * ON LOAD METHOD
   */
  const onLoaded = useCallback(() => {
    setImgLoaded(true);
  }, []);

  return (
    <>
      {!imgLoaded && (
        <Blurhash hash={hash} width="100%" height="300px" punch={1} />
      )}
      <img
        src={imgSrc}
        width="100%"
        onLoad={onLoaded}
        style={{
          height: imgLoaded ? "300px" : "0px",
          objectFit: "cover",
        }}
      />
    </>
  );
}

export default Image;

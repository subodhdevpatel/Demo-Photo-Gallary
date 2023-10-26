import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  return (
    <div className="index">
      <Link href="/uploadimage" className="link">
        Image Upload
      </Link>
      <Link href="/previewimage" className="link">
        Preview Images
      </Link>
    </div>
  );
}

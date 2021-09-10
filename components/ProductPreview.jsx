import Image from "next/image";
import { css } from "@emotion/react";

const productStyles = css`
  flex: 1;
`;

const ProductPreview = ({ onClick, title, price, image, description }) => (
  <div css={productStyles}>
    <div>{title}</div>
    <Image
      src={image} // Route of the image file
      height={144} // Desired size with correct aspect ratio
      width={144} // Desired size with correct aspect ratio
      alt="Your Name"
      priority
    />
    <div>{price}</div>
    <button onClick={onClick} type="button">
      {" "}
      Add To Cart
    </button>
  </div>
);

export default ProductPreview;

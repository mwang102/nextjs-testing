import Head from "next/head";
import { css } from "@emotion/react";
import { useEffect, memo } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useCartDispatch, useCartState } from "../components/CartProvider";

import media, { defaultBreakpoints } from "../utils/mediaStyles";
import ProductPreview from "../components/ProductPreview";

const homeContainerStyles = css`
  width: 800px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  border: 3px solid #dea5a4;
  overflow: hidden;

  ${media.greaterThan(defaultBreakpoints.medium)`
    border: 3px solid #CCD4BF;
  `};
`;

const titleStyles = css`
  color: #dea5a4;

  ${media.greaterThan(defaultBreakpoints.medium)`
    color: #CCD4BF;
`};
`;

export async function getStaticProps() {
  const products = await axios.get("https://fakestoreapi.com/products").then(
    (response) => ({
      props: {
        products: response.data,
      },
    }),
    (error) => ({
      products: {},
    })
  );

  return products;
}

const Home = ({ products }) => {
  const dispatch = useCartDispatch();
  const state = useCartState();
  const router = useRouter();
  useEffect(() => {
    dispatch({ type: "ADD_PRODUCTS", item: products.slice(0, 6) });
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next Boiler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css={homeContainerStyles}>
        <button
          onClick={() => dispatch({ type: "ADD_DOUBLE_SHIRT" })}
          type="button"
        >
          Add double shirt
        </button>

        {state.products.length > 0 &&
          state.products.map((product) => (
            <div>
              <ProductPreview
                key={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                description={product.description}
                onClick={() => dispatch({ type: "ADD_TO_CART", item: product })}
              />
              <button
                onClick={() => router.push(`/products/${product.id}`)}
                type="button"
              >
                To Product Page
              </button>
            </div>
          ))}
      </section>
    </div>
  );
};

const MemoizedHome = memo(Home);

export default MemoizedHome;
// const MemoizedPreviewSection = memo(PreviewSection);

// export default MemoizedPreviewSection;

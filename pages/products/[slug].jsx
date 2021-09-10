import axios from "axios";
import Link from "next/link";
import ProductPreview from "../../components/ProductPreview";
import { useCartDispatch } from "../../components/CartProvider";

const Product = ({ productData }) => {
  const dispatch = useCartDispatch();

  return (
    <div>
      Welcome to product page!!!
      <ProductPreview
        key={productData.id}
        title={productData.title}
        price={productData.price}
        image={productData.image}
        description={productData.description}
        onClick={() => dispatch({ type: "ADD_TO_CART", item: productData })}
      />
      <div className="title">
        <Link href="/">
          <a>Back to home page!</a>
        </Link>
      </div>
    </div>
  );
};

export default Product;

const getAllDrinkIds = async () => {
  const products = await axios.get("https://fakestoreapi.com/products").then(
    (response) => response.data,
    (error) => ({
      products: {},
    })
  );

  const slicedProducts = products.slice(0, 5).map((product) => ({
    params: {
      slug: product.id.toString(),
    },
  }));
  return slicedProducts;
};

// technically has nothing to do with getStaticProps
export const getStaticPaths = async () => {
  const paths = await getAllDrinkIds();
  return {
    paths,
    fallback: false,
  };
  // Return a list of possible value for id
};

const getData = async (id) => {
  const products = await axios
    .get(`https://fakestoreapi.com/products/${id}`)
    .then(
      (response) => response.data,
      (error) => ({
        products: {},
      })
    );

  return {
    id,
    ...products,
  };
};

export const getStaticProps = async ({ params }) => {
  const productData = await getData(params.slug);

  return {
    props: {
      productData,
    },
  };
};

// import style from "./product-page.module.css";
import { useLayoutEffect, useEffect, useState } from "react";
import { useParams, useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions";
// import { RESET_PRODUCT_DATA } from "../../actions";
import { ROLE } from "../../constants/role.js";
import { ProductContent, PrivateProductContent, PrivateEditForm } from "./index.js";
import { getSingleProduct } from "../../fetchs";
import { Header } from "../components";
import SkeletonProductCard  from "../components/skeleton/SkeletonProductCard";

export const ProductPage = () => {
  const [sinlgeProduct, setSinlgeProduct] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const isEditing = !!useMatch(`/products/:id/edit`);

  useLayoutEffect(() => {
    const currentUserDataJSON = localStorage.getItem("userData");
    if (!currentUserDataJSON) {
      return;
    }
    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(
      setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
    );
    // dispatch(RESET_PRODUCT_DATA);
  }, [dispatch]);

  useEffect(() => {
    getSingleProduct(params.id).then((productsData) => {
      setSinlgeProduct(productsData);
      setError(productsData?.error);
      setIsLoading(false);
    });
  }, [params.id]);

  const AdminProductPage = isEditing ? (
    <>
      <Header />
      {isLoading ? (
        <SkeletonProductCard />
      ) : (
        <PrivateProductContent access={[ROLE.ADMIN]} serverError={error}>
          <PrivateEditForm product={sinlgeProduct} />
        </PrivateProductContent>
      )}
    </>
  ) : (
    <>
      <Header />
      {isLoading ? (
        <SkeletonProductCard />
      ) : (
          <ProductContent product={sinlgeProduct} />
      )}
    </>
  );

  return error ? (
    <>
      <Header />
      <div>{error}</div>
    </>
  ) : (
    AdminProductPage
  );
};

export default ProductPage;

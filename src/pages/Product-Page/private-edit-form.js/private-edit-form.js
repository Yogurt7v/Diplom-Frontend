import styled from "./private-edit-form.module.css";
import { CustomInput } from "../../components";
import { useLayoutEffect, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RESET_PRODUCT_DATA, saveProductAsync } from "../../../actions";
import { useNavigate } from "react-router-dom";
import { useServerRequest } from "../../../hooks";
import { addProductFetch } from "../../../fetchs/addProduct";
import { getAllProducts } from "../../../fetchs/getAllProducts";
import {updatedProductFetch} from "../../../fetchs/updateProduct";
import { getSingleProduct } from "../../../fetchs/getSinlgeProduct";

export const PrivateEditForm = ({
  product: {
    id,
    productName,
    image_url,
    description,
    category,
    weight,
    calories,
    ingredients,
    price,
  },
}) => {
  const [productNameValue, setProductNameValue] = useState(productName);
  const [imageUrlValue, setImageUrlValue] = useState(image_url);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [categoryValue, setCategoryValue] = useState(category);
  const [weightValue, setWeightValue] = useState(weight);
  const [caloriesValue, setCaloriesValue] = useState(calories);
  const [ingredientsValue, setIngredientsValue] = useState(ingredients);
  const [priceValue, setPriceValue] = useState(price);
  const [categoriesValue, setCategoriesValue] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    setImageUrlValue(image_url);
    setDescriptionValue(description);
    setCategoryValue(category);
    setWeightValue(weight);
    setCaloriesValue(calories);
    setIngredientsValue(ingredients);
    setPriceValue(price);
    dispatch(RESET_PRODUCT_DATA);
  }, [
    image_url,
    description,
    category,
    weight,
    calories,
    ingredients,
    price,
    dispatch,
  ]);

  useEffect(() => {
    getAllProducts().then((products)=> {
      let categories = [];
      for (let i = 0; i < products.length; i++) {
        categories.push(products[i].category);
      }

      const uniqueСategories = categories.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

      setCategoriesValue(uniqueСategories);
    })
  }, []);



  const onSave = () => {
    if (id){
      console.log("updatedProductFetch");
      updatedProductFetch({ 
        id,
        productName: productNameValue,
        image_url: imageUrlValue,
        description: descriptionValue,
        category: categoryValue || "burger",
        weight: Number(weightValue),
        calories: Number(caloriesValue),
        ingredients: ingredientsValue,
        price: Number(priceValue),
      }).then(() => navigate(`/products/${id}`));

    } else {
      console.log("addProductFetch");
      addProductFetch({
        productName: productNameValue,
        image_url: imageUrlValue,
        description: descriptionValue,
        category: categoryValue || "burger",
        weight: Number(weightValue),
        calories: Number(caloriesValue),
        ingredients: ingredientsValue,
        price: Number(priceValue),
      }).then(() => navigate(`/`));
    }
  };

  const onProductNameChange = ({ target }) => {
    setProductNameValue(target.value);
  };
  const onImageChange = ({ target }) => {
    setImageUrlValue(target.value);
  };
  const onDescriptionChange = ({ target }) => {
    setDescriptionValue(target.value);
  };
  const onCategoryChange = ({ target }) => {
    setCategoryValue(target.value);
  };
  const onWeightChange = ({ target }) => {
    setWeightValue(target.value);
  };
  const onCaloriesChange = ({ target }) => {
    setCaloriesValue(target.value);
  };
  const onIngredientsChange = ({ target }) => {
    setIngredientsValue(target.value);
  };
  const onPriceChange = ({ target }) => {
    setPriceValue(target.value);
  };

  return (
    <div className={styled.EditFormWrapper}>
      <CustomInput
        value={productNameValue}
        placeholder="Название продукта"
        type="text"
        className="input"
        onChange={onProductNameChange}
      />
      <CustomInput
        value={imageUrlValue}
        placeholder="Путь к картинке"
        type="text"
        className="input"
        onChange={onImageChange}
      />
      <CustomInput
        value={descriptionValue}
        placeholder="Описание продукта"
        type="text"
        className="input"
        onChange={onDescriptionChange}
      />
      <select
        value={categoriesValue[0] || "burger"}
        onChange={onCategoryChange}
        className={styled.select}
      >
        {categoriesValue?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <CustomInput
        value={weightValue}
        placeholder="Вес продукта"
        className="input"
        type="number"
        onChange={onWeightChange}
      />
      <CustomInput
        value={caloriesValue}
        placeholder="Калории"
        className="input"
        type="number"
        onChange={onCaloriesChange}
      />
      <CustomInput
        value={ingredientsValue}
        placeholder="Ингредиенты"
        type="text"
        className="input"
        onChange={onIngredientsChange}
      />
      <CustomInput
        value={priceValue}
        placeholder="Цена"
        type="number"
        className="input"
        onChange={onPriceChange}
      />
      <div className={styled.ButtonsWrapper}>
        <button onClick={() => navigate(`/`)} className={styled.EditButtons}>
          Назад
        </button>
        <button onClick={onSave} className={styled.EditButtons}>
          Сохранить
        </button>
      </div>
    </div>
  );
};

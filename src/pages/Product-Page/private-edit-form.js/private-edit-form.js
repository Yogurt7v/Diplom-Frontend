import styled from "./private-edit-form.module.css";
import { CustomInput } from "../../components";
import { useLayoutEffect, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RESET_PRODUCT_DATA, saveProductAsync } from "../../../actions";
import { useNavigate } from "react-router-dom";
import { useServerRequest } from "../../../hooks";
import { addProductFetch } from "../../../fetchs/addProduct";

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
  const [categoriesValue, setCategoriesValueValue] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestServer = useServerRequest();

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
    requestServer(`fetchProducts`, "", "").then(({ res: { products } }) => {
      let categories = [];
      for (let i = 0; i < products.length; i++) {
        categories.push(products[i].category);
      }

      const uniqueСategories = categories.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

      setCategoriesValueValue(uniqueСategories);
    });
  }, [requestServer]);

  const onSave = () => {
      addProductFetch({
        productName: productNameValue,
        image_url: imageUrlValue,
        description: descriptionValue,
        category: categoryValue,
        weight: weightValue,
        calories: caloriesValue,
        ingredients: ingredientsValue,
        price: priceValue,
      })
    .then(() => navigate(`/`));
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
        className="input"
        onChange={onProductNameChange}
      />
      <CustomInput
        value={imageUrlValue}
        placeholder="Путь к картинке"
        className="input"
        onChange={onImageChange}
      />
      <CustomInput
        value={descriptionValue}
        placeholder="Описание продукта"
        className="input"
        onChange={onDescriptionChange}
      />
      <select
        value={categoryValue}
        onChange={onCategoryChange}
        className={styled.select}
      >
        {categoriesValue.map((category) => (
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

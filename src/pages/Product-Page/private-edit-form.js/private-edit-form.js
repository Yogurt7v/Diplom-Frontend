import styled from "./private-edit-form.module.css";
import { CustomInput } from "../../components";
// import { SpecialPanel } from "../special-panel";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveProductAsync } from "../../../actions";
import { useNavigate } from "react-router-dom";
import { useServerRequest } from "../../../hooks";

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


  useLayoutEffect(() => {
    setImageUrlValue(image_url);
    setDescriptionValue(description);
    setCategoryValue(category);
    setWeightValue(weight);
    setCaloriesValue(calories);
    setIngredientsValue(ingredients);
    setPriceValue(price);
  }, [image_url, description, category, weight, calories, ingredients, price]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestServer = useServerRequest();

  const onSave = () => {
    dispatch(
      saveProductAsync(requestServer, {
        id,
        image_url: imageUrlValue,
        description: descriptionValue,
        category: categoryValue,
        weight: weightValue,
        calories: caloriesValue,
        ingredients: ingredientsValue,
        price: priceValue,
      })
    ).then(({ id }) => navigate(`/products/${id}`));
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
      <CustomInput
        value={categoryValue}
        placeholder="Категория"
        className="input"
        onChange={onCategoryChange}
      />
      <CustomInput
        value={weightValue}
        placeholder="Вес продукта"
        className="input"
        onChange={onWeightChange}
      />
      <CustomInput
        value={caloriesValue}
        placeholder="Калории"
        className="input"
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
        className="input"
        onChange={onPriceChange}
      />
      <div className={styled.ButtonsWrapper}>
        <button onClick={() => navigate(-1)} className={styled.EditButtons}>
          Назад
        </button>
        <button onClick={onSave} className={styled.EditButtons}>
          Сохранить
        </button>
      </div>
    </div>
  );
};

import style from "./private-edit-form.module.css";
import { SpecialPanel } from "../special-panel";
import { sanitazeContent } from "../../../utils";
import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { saveProductAsync } from "../../../actions";
import { useNavigate } from "react-router-dom";
import { useServerRequest } from "../../../hooks";
import { CustomInput } from "../../components/input";

export const PrivateEditForm = ({
  product: {
    id,
    productName,
    image_url,
    description,
    category,
    price,
    weight,
    calories,
    ingredients,
  },
}) => {
  const [productNameValue, setProductNameValue] = useState(productName);
  // const [imageUrlValue, setImageUrlValue] = useState(image_url);
  // const [descriptionValue, setDescriptionValue] = useState(description);
  // const [categoryValue, setCategoryValue] = useState(category);
  // const [weightValue, setWeightValue] = useState(weight);
  // const [caloriesValue, setCaloriesValue] = useState(calories);
  // const [ingredientsValue, setIngredientsValue] = useState(ingredients);
  // const [priceValue, setPriceValue] = useState(price);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    setProductNameValue(productName);
    // setImageUrlValue(image_url);
    // setDescriptionValue(description);
    // setCategoryValue(category);
    // setWeightValue(weight);
    // setCaloriesValue(calories);
    // setIngredientsValue(ingredients);
    // setPriceValue(price);
  }, [
    image_url,
    productName,
    description,
    category,
    weight,
    calories,
    ingredients,
    price,
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestServer = useServerRequest();

  const onSave = () => {
    const newContent = sanitazeContent(contentRef.current.innerHTML);

    dispatch(
      saveProductAsync(requestServer, {
        id,
        productName: productNameValue,
        // image_url: imageUrlValue,
        // description: descriptionValue,
        // category: categoryValue,
        // weight: weightValue,
        // calories: caloriesValue,
        // ingredients: ingredientsValue,
        // price: priceValue,
        content: newContent,
      })
    ).then(({ id }) => navigate(`/products/${id}`));
  };

  const onProductNameChange = ({ target }) => {
    setProductNameValue(target.value);
  };
  // const onImageUrlValueChange = ({ target }) => {
  //   setImageUrlValue(target.value);
  // };
  // const onDescriptionValueChange = ({ target }) => {
  //   setDescriptionValue(target.value);
  // };
  // const onCategoryValueChange = ({ target }) => {
  //   setCategoryValue(target.value);
  // };
  // const onWeightValueChange = ({ target }) => {
  //   setWeightValue(target.value);
  // };
  // const onCaloriesValueChange = ({ target }) => {
  //   setCaloriesValue(target.value);
  // };
  // const onIngredientsValueChange = ({ target }) => {
  //   setIngredientsValue(target.value);
  // };
  // const onPriceValueChange = ({ target }) => {
  //   setPriceValue(target.value);
  // };

  return (
    <>
      <div className={style.EditFormWrapper}>
        <CustomInput
          value={productName}
          placeholder="Название"
          onChange={onProductNameChange}
        />
        {/* <CustomInput
          value={imageUrlValue}
          placeholder="Путь к картинке"
          onChange={onImageUrlValueChange}
        />
        <CustomInput
          value={description}
          placeholder="Описание"
          onChange={onDescriptionValueChange}
        />
        <CustomInput
          value={category}
          placeholder="Категория"
          onChange={onCategoryValueChange}
        />
        <CustomInput
          value={weight}
          placeholder="Вес"
          onChange={onWeightValueChange}
        />
        <CustomInput
          value={calories}
          placeholder="Калорийность"
          onChange={onCaloriesValueChange}
        />
        <CustomInput
          value={ingredients}
          placeholder="Ингредиенты"
          onChange={onIngredientsValueChange}
        />
        <CustomInput
          value={price}
          placeholder="Цена $"
          onChange={onPriceValueChange}
        /> */}
        <SpecialPanel
        id={id}
        editButton={
          <div onClick={onSave}>
          <img src="" alt="save" />
          </div>
        }
      />
        <button className={style.saveButton} onClick={onSave}>
          Сохранить
        </button>
        <div
          className="post-text"
          ref={contentRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          {/* {content} */}
        </div>
      </div>
    </>
  );
};

import { useDispatch } from "react-redux";
import { API_URL } from "../../const";
import style from "./CartItem.module.scss";
import { useState } from "react";
import { debounce, isNumber } from "../../util";
import { addItemToCart } from "../../redux/thunks/addItemToCart";

export const CartItem = ({ id, photoUrl, name, price, quantity }) => {
  const dispatch = useDispatch();
  const [inputQuantity, setInputQuantity] = useState(quantity);

  const debounceInputChange = debounce((newQuantity) => {
    if (isNumber(newQuantity)) {
      dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
    }
  }, 500);

  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setInputQuantity(newQuantity);
    debounceInputChange(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = inputQuantity - 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  };

  const handleInrement = () => {
    const newQuantity = inputQuantity + 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  };

  return (
    <li className={style.item}>
      <img className={style.img} src={`${API_URL}${photoUrl}`} alt={name} />
      <h4 className={style.title}>{name}</h4>
      <div className={style.counter}>
        <button className={style.btn} onClick={handleDecrement}>
          -
        </button>
        <input
          className={style.input}
          type="number"
          max="99"
          min="0"
          value={inputQuantity}
          onChange={handleInputChange}
        />
        <button className={style.btn} onClick={() => handleInrement()}>
          +
        </button>
      </div>
      <p className={style.price}>
        {inputQuantity ? price * inputQuantity : 0}&nbsp;₽
      </p>
    </li>
  );
};

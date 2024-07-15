import { useDispatch, useSelector } from "react-redux";
import style from "./Order.module.scss";

import classNames from "classnames";
import { useCallback, useEffect } from "react";
import { closeModal, updateOrderData } from "../../redux/slices/orderSlice";
import { sendOrder } from "../../redux/thunks/sendOrder";

export const Order = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.order.isOpen);
  const orderId = useSelector((state) => state.order.orderId);
  const orderData = useSelector((state) => state.order.data);
  const itemsCart = useSelector((state) => state.cart.items);

  const handlerClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateOrderData({
        [name]: value,
      }),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendOrder());
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handlerClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, handlerClose]);

  if (!isOpen) return null;

  return (
    <div className={style.order} onClick={handlerClose}>
      <div className={style.wrapper} onClick={(e) => e.stopPropagation()}>
        {orderId ? (
          <>
            <h2 className={style.title}>Заказ оформлен!</h2>
            <p className={style.id}>Ваш номер заказа: {orderId}</p>
          </>
        ) : (
          <>
            <h2 className={style.title}>Оформить заказ</h2>
            <form className={style.form} id="order" onSubmit={handleSubmit}>
              <fieldset className={style.fieldset}>
                <legend className={style.legend}>Данные заказчика</legend>
                <div className={style["input-group"]}>
                  <input
                    className={style.input}
                    type="text"
                    name="buyerName"
                    placeholder="Имя"
                    value={orderData.buyerName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className={style.input}
                    type="text"
                    name="buyerPhone"
                    value={orderData.buyerPhone}
                    placeholder="Телефон"
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>
              <fieldset className={style.fieldset}>
                <legend className={style.legend}>Данные получателя</legend>
                <div className={style["input-group"]}>
                  <input
                    className={style.input}
                    type="text"
                    name="recipientName"
                    value={orderData.recipientName}
                    placeholder="Имя"
                    onChange={handleChange}
                    required
                  />
                  <input
                    className={style.input}
                    type="text"
                    name="recipientPhone"
                    value={orderData.recipientPhone}
                    placeholder="Телефон"
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>
              <fieldset className={style.fieldset}>
                <legend className={style.legend}>Адрес</legend>
                <div className={style["input-group"]}>
                  <input
                    className={style.input}
                    type="text"
                    name="street"
                    value={orderData.street}
                    placeholder="Улица"
                    onChange={handleChange}
                    required
                  />
                  <input
                    className={classNames(style.input, style.input_min)}
                    type="text"
                    name="house"
                    value={orderData.house}
                    placeholder="Дом"
                    onChange={handleChange}
                    required
                  />
                  <input
                    className={classNames(style.input, style.input_min)}
                    type="text"
                    name="apartment"
                    value={orderData.apartment}
                    placeholder="Квартира"
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>
              <fieldset className={style.fieldset}>
                <div className={style.payment}>
                  <label className={style["label-radio"]}>
                    <input
                      className={style.radio}
                      type="radio"
                      name="paymentOnline"
                      value={orderData.paymentOnline === "true"}
                      defaultChecked
                      onChange={handleChange}
                    />
                    Оплата онлайн
                  </label>
                </div>
                <div className={style.delivery}>
                  <label htmlFor="delivery">Дата доставки</label>
                  <input
                    className={style.input}
                    type="date"
                    name="deliveryDate"
                    value={orderData.deliveryDate}
                    onChange={handleChange}
                    required
                  />
                  <div className={style["select-wrapper"]}>
                    <select
                      className={style.select}
                      name="deliveryTime"
                      id="delivery"
                      value={orderData.deliveryTime}
                      onChange={handleChange}
                      required>
                      <option value="9-12">с 9:00 до 12:00</option>
                      <option value="12-15">с 12:00 до 15:00</option>
                      <option value="15-18">с 15:00 до 18:00</option>
                      <option value="18-21">с 18:00 до 21:00</option>
                    </select>
                  </div>
                </div>
              </fieldset>
            </form>
            <div className={style.footer}>
              <p className={style.total}>
                {itemsCart.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0,
                )}
                &nbsp;₽
              </p>
              <button className={style.button} type="submit" form="order">
                Заказать
              </button>
            </div>
          </>
        )}
      </div>
      <button className={style.close} type="button">
        ×
      </button>
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import style from "./Order.module.scss";
import { closeModal } from "../../redux/orderSlice";
import classNames from "classnames";
import { useCallback, useEffect } from "react";

export const Order = () => {
  const dispatch = useDispatch();
  const isOrderReady = false;
  const isOpen = useSelector((state) => state.order.isOpen);

  const handlerClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

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
        {isOrderReady ? (
          <>
            <h2 className={style.title}>Заказ оформлен!</h2>
            <p className={style.id}>
              Ваш номер заказа: 971f365a-caa1-4cdb-9446-bad2eff047e1
            </p>
          </>
        ) : (
          <>
            <h2 className={style.title}>Оформить заказ</h2>
            <form className={style.form} id="order">
              <fieldset className={style.fieldset}>
                <legend className={style.legend}>Данные заказчика</legend>
                <div className={style["input-group"]}>
                  <input
                    className={style.input}
                    type="text"
                    name="name-buyer"
                    placeholder="Имя"
                  />
                  <input
                    className={style.input}
                    type="text"
                    name="phone-buyer"
                    placeholder="Телефон"
                  />
                </div>
              </fieldset>
              <fieldset className={style.fieldset}>
                <legend className={style.legend}>Данные получателя</legend>
                <div className={style["input-group"]}>
                  <input
                    className={style.input}
                    type="text"
                    name="name-recipient"
                    placeholder="Имя"
                  />
                  <input
                    className={style.input}
                    type="text"
                    name="phone-recipient"
                    placeholder="Телефон"
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
                    placeholder="Улица"
                  />
                  <input
                    className={classNames(style.input, style.input_min)}
                    type="text"
                    name="house"
                    placeholder="Дом"
                  />
                  <input
                    className={classNames(style.input, style.input_min)}
                    type="text"
                    name="apartment"
                    placeholder="Квартира"
                  />
                </div>
              </fieldset>
              <fieldset className={style.fieldset}>
                <div className={style.payment}>
                  <label className={style["label-radio"]}>
                    <input
                      className={style.radio}
                      type="radio"
                      name="payment-online"
                      value="true"
                      defaultChecked
                    />
                    Оплата онлайн
                  </label>
                </div>
                <div className={style.delivery}>
                  <label htmlFor="delivery">Доставка 01.07</label>
                  <input type="hidden" name="delivery-date" value="01.07" />
                  <div className={style["select-wrapper"]}>
                    <select
                      className={style.select}
                      name="delivery-time"
                      id="delivery">
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
              <p className={style.total}>92100&nbsp;₽</p>
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

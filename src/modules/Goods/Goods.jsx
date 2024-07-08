import { useSelector } from "react-redux";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import "./goods.scss";

import { API_URL } from "../../const";

export const Goods = () => {
  const {
    items: goods,
    status: goodsStatus,
    error,
  } = useSelector((state) => state.goods);

  let content = null;

  if (goodsStatus === "loading") {
    content = <p>Loading...</p>;
  }

  if (goodsStatus === "success") {
    content = (
      <ul className="goods__list">
        {goods.map((item) => (
          <li key={item.id} className="goods__item">
            <Card
              className="goods__card"
              id={item.id}
              img={`${API_URL}${item.photoUrl}`}
              title={item.name}
              dateDelivery="сегодня в 14:00"
              price={item.price}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (goodsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">Цветы</h2>

          {content}
        </div>

        <Cart />
      </div>
    </section>
  );
};

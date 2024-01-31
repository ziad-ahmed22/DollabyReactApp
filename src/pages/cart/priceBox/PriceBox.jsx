import { formatPrice } from "../../../utils/formatCurrency";
import { useMyStore } from "../../../hooks/useMyStore";

const PriceBox = () => {
  const { cart } = useMyStore();

  return (
    <div className="checkout bg-white shadow rounded mb-3 p-2 fs-18 fw-bold">
      <div className="flex-between py-2 mb-2">
        Items:
        <span className="text-blue">{cart.cartData.length}</span>
      </div>

      <div className="flex-between py-2 mb-2">
        Total Quantity:
        <span className="text-blue">{cart.cartQuantity}</span>
      </div>

      <div className="flex-between py-2">
        Total Price:
        <span className="text-blue">{formatPrice(cart.cartPrice)}</span>
      </div>
    </div>
  );
};

export default PriceBox;

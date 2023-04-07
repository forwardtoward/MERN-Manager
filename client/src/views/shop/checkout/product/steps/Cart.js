// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import InputNumber from 'rc-input-number';
import { X, Heart, Star, Plus, Minus } from 'react-feather';

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  Button,
  Badge,
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/input-number/input-number.scss';

// ** Actions
import { checkoutSetTotalPrice } from '../../../store';

const Cart = (props) => {
  // ** Props
  const {
    products,
    stepper,
    deleteCartItem,
    dispatch,
    addToWishlist,
    deleteWishlistItem,
    getCartItems,
    updateProductAmount
  } = props;

  // ** Function to convert Date
  const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
    if (!value) return value;
    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
  };

  // ** Function to toggle wishlist item
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id));
    } else {
      dispatch(addToWishlist(id));
    }
    dispatch(getCartItems());
  };

  const setProductAmount = (product_id, val) => {
    const data = {
      product_id: product_id,
      amount: val
    };
    dispatch(updateProductAmount(data));
  };

  // ** Render cart items
  const renderCart = () => {
    return (
      products &&
      products.map((item) => {
        return (
          <Card key={item.product.product_name} className="ecommerce-card">
            <div className="item-img">
              <Link to={`/ecommerce/product-detail/${item.product._id}`}>
                <img className="img-fluid" src={item.product.product_url} alt={item.product.name} />
              </Link>
            </div>
            <CardBody>
              <div className="item-name">
                <h6 className="mb-0">
                  <Link to={`/ecommerce/product-detail/${item.product._id}`}>
                    {item.product.product_name}
                  </Link>
                </h6>
                <span className="item-company">
                  By
                  <a className="ms-25" href="/" onClick={(e) => e.preventDefault()}>
                    {item.product.product_brand}
                  </a>
                </span>
                <div className="item-rating">
                  <ul className="unstyled-list list-inline">
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className="ratings-list-item me-25">
                          <Star
                            className={classnames({
                              'filled-star': index + 1 <= item.product.product_rating,
                              'unfilled-star': index + 1 > item.product.product_rating
                            })}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <span className="text-success mb-1">In Stock</span>
              <div className="item-quantity">
                <span className="quantity-title me-50">Qty</span>
                <InputNumber
                  min={1}
                  max={10}
                  upHandler={<Plus />}
                  className="cart-input"
                  defaultValue={item.amount}
                  downHandler={<Minus />}
                  onChange={(e) => setProductAmount(item.product._id, e)}
                />
              </div>
            </CardBody>
            <div className="item-options text-center">
              <div className="item-wrapper">
                <div className="item-cost">
                  <h4 className="item-price">${item.product.product_price * item.amount}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className="shipping">
                      <Badge color="light-success" pill>
                        Free Shipping
                      </Badge>
                    </CardText>
                  ) : null}
                </div>
              </div>
              <Button
                className="mt-1 remove-wishlist"
                color="light"
                onClick={() => dispatch(deleteCartItem(item.product._id))}
              >
                <X size={14} className="me-25" />
                <span>Remove</span>
              </Button>
            </div>
          </Card>
        );
      })
    );
  };

  const totalOutput = () => {
    let sum = 0;
    products &&
      products.map((item, i) => {
        sum += item.amount * item.product.product_price;
      });
    return sum;
  };

  const onNext = () => {
    const totalPrice = totalOutput();
    dispatch(checkoutSetTotalPrice(totalPrice))
    stepper.next()
  }

  return (
    <div className="list-view product-checkout">
      <div className="checkout-items">
        {products.length ? renderCart() : <h4>Your cart is empty</h4>}
      </div>
      <div className="checkout-options">
        <Card>
          <CardBody>
            <div className="price-details">
              <h6 className="price-title">Pay Now</h6>
              <ul className="list-unstyled">
                <li className="price-detail">
                  <div className="detail-title">Price</div>
                  <div className="detail-amt">${totalOutput()}</div>
                </li>
                <li className="price-detail">
                  <div className="detail-title">Delivery Charges</div>
                  <div className="detail-amt discount-amt text-success">Free</div>
                </li>
              </ul>
              <hr />
              <ul className="list-unstyled">
                <li className="price-detail">
                  <div className="detail-title detail-total">Total</div>
                  <div className="detail-amt fw-bolder">${totalOutput()}</div>
                </li>
              </ul>
              <Button
                block
                color="primary"
                disabled={!products.length}
                onClick={onNext}
                classnames="btn-next place-order"
              >
                Place Order
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Cart;

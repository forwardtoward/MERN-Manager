// ** React Imports
import { Link } from 'react-router-dom';
import { useEffect, Fragment, useState } from 'react';

// ** Third Party Components
import InputNumber from 'rc-input-number';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ShoppingCart, X, Plus, Minus } from 'react-feather';

// ** Reactstrap Imports
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Badge, Button } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  getCartItems,
  deleteCartItem,
  getProduct,
  updateProductAmount
} from '../../../views/shop/store';

// ** Styles
import '@styles/react/libs/input-number/input-number.scss';

const CartDropdown = () => {
  // ** State
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.shop);
  // ** ComponentDidMount
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  // ** Function to toggle Dropdown
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // ** Function to call on Dropdown Item Click
  const handleDropdownItemClick = (id) => {
    dispatch(getProduct(id));
    toggle();
  };

  // ** Loops through Cart Array to return Cart Items
  const setProductAmount = (product_id, val) => {
    const data = {
      product_id: product_id,
      amount: val
    };
    dispatch(updateProductAmount(data));
  };

  const renderCartItems = () => {
    if (store.cart && store.cart.length) {
      let total = 0;
      store.cart.map((cart_item) => {
        total += cart_item.amount * cart_item.product.product_price;
      });
      return (
        <Fragment>
          <PerfectScrollbar
            className="scrollable-container media-list"
            options={{
              wheelPropagation: false
            }}
          >
            {store.cart.map((item) => {
              return (
                <div key={item.id} className="list-item align-items-center">
                  <img
                    className="d-block rounded me-1"
                    src={item.product.product_url}
                    alt={item.product.product_name}
                    width="62"
                  />
                  <div className="list-item-body flex-grow-1">
                    <X
                      size={14}
                      className="cart-item-remove"
                      onClick={() => dispatch(deleteCartItem(item.product._id))}
                    />
                    <div className="media-heading">
                      <h6 className="cart-item-title">{item.product.product_name}</h6>
                      <small className="cart-item-by">by {item.product.product_brand}</small>
                    </div>
                    <div className="cart-item-qty">
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
                    <h5 className="cart-item-price">${item.product.product_price * item.amount}</h5>
                  </div>
                </div>
              );
            })}
          </PerfectScrollbar>
          <li className="dropdown-menu-footer">
            <div className="d-flex justify-content-between mb-1">
              <h6 className="fw-bolder mb-0">Total:</h6>
              <h6 className="text-primary fw-bolder mb-0">${Number(total.toFixed(2))}</h6>
            </div>
            <Button
              tag={Link}
              to={'/ecommerce/checkout/product'}
              color="primary"
              block
              onClick={toggle}
            >
              Checkout
            </Button>
          </li>
        </Fragment>
      );
    } else {
      return <p className="m-0 p-1 text-center">Your cart is empty</p>;
    }
  };

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      tag="li"
      className="dropdown-cart nav-item me-25"
    >
      <DropdownToggle tag="a" className="nav-link position-relative">
        <ShoppingCart className="ficon" />
        {store.cart && store.cart.length > 0 ? (
          <Badge pill color="primary" className="badge-up">
            {store.cart.length}
          </Badge>
        ) : null}
      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media dropdown-cart mt-0">
        <li className="dropdown-menu-header">
          <DropdownItem tag="div" className="d-flex" header>
            <h4 className="notification-title mb-0 me-auto">My Cart</h4>
            <Badge color="light-primary" pill>
              {/* {store.cart.length || 0} Items */}
              {store.cart ? store.cart.length : 0} Items
            </Badge>
          </DropdownItem>
        </li>
        {renderCartItems()}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CartDropdown;

// ** React Imports
import { useState, useEffect } from 'react';
// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import { Star, ShoppingCart, Heart, Copy, Check } from 'react-feather';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// ** Reactstrap Imports
import { Row, Col, Input, Card, CardBody, CardText, Button, Badge } from 'reactstrap';

const ProductCards = (props) => {
  // ** Props
  const {
    store,
    type,
    products,
    dispatch,
    addToCart,
    activeView,
    getProducts,
    getCartItems,
    handleWishlistItem,
    deleteCartItem
  } = props;

  const cartProducts = store.cart;
  // ** Condition btn tag
  const CartBtnTag = Link;

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id));
    } else {
      dispatch(deleteCartItem(id));
    }
    dispatch(getCartItems());
    dispatch(getProducts(store.params));
  };

  // ** Handle Wishlist item
  const handleWishlistClick = (item) => {
    if (item.isfavorite === 0) {
      dispatch(handleWishlistItem({ id: item._id, isfavorite: 1 }));
    } else {
      dispatch(handleWishlistItem({ id: item._id, isfavorite: 0 }));
    }
  };
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const reProducts = products.map((item) => ({ ...item, copied: false }));
    setProductData(reProducts);
  }, [products]);

  const url = new URL(location.href);
  const publicUrl = url.origin + '/ecommerce/checkout/public-product/';

  const onCopy = (e) => {
    const id = e.split('/').slice(-1)[0];
    let changedProducts = productData.map((item) => {
      if (item._id === id) {
        item.copied = true;
      } else {
        item.copied = false;
      }
      return item;
    });
    setProductData(changedProducts);
    setTimeout(
      (id) => {
        let changedProducts = productData.map((item) => {
          if (item._id === id) {
            item.copied = false;
          }
          return item;
        });
        setProductData(changedProducts);
      },
      3000,
      id
    );
  };

  const isInCart = (product_id) => {
    let status = false;
    cartProducts &&
      cartProducts.map((item, i) => {
        if (item.product._id === product_id) {
          status = true;
        }
      });
    return status;
  };

  // ** Renders products
  const renderProducts = () => {
    if (productData.length) {
      return productData.map((item) => {
        const CartBtnTag = item.isInCart ? Link : 'button';
        return (
          <Card className="ecommerce-card" key={item.name}>
            <div className="d-flex align-items-center justify-content-between m-50">
              {item.permission === 'private' && (
                <h6 className="px-1 bg-danger text-white">Private</h6>
              )}
              {item.permission === 'public' && (
                <h6 className="px-1 bg-success text-white">Public</h6>
              )}
              {item.permission === 'all' && <h6 className="px-1 bg-primary text-white">All</h6>}
              <div>
                {item.permission !== 'private' && (
                  <CopyToClipboard onCopy={onCopy} text={publicUrl + item._id}>
                    {item.copied ? (
                      <Check size={20} color="#28c76f" className="me-50 mt-50" />
                    ) : (
                      <Copy size={20} color="#28c76f" className="me-50 mt-50" />
                    )}
                  </CopyToClipboard>
                )}
              </div>
            </div>
            <div className="item-img text-center mx-auto">
              <Link to={`/ecommerce/product-detail/${item._id}`}>
                <img className="img-fluid card-img-top" src={item.product_url} alt={item.name} />
              </Link>
            </div>
            <CardBody>
              <div className="item-wrapper">
                <div className="item-rating">
                  <ul className="unstyled-list list-inline">
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className="ratings-list-item me-25">
                          <Star
                            className={classnames({
                              'filled-star': index + 1 <= item.product_rating,
                              'unfilled-star': index + 1 > item.product_rating
                            })}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="item-cost">
                  <h6 className="item-price">${item.product_price}</h6>
                </div>
              </div>
              <h6 className="item-name">
                <Link className="text-body" to={`/ecommerce/product-detail/${item._id}`}>
                  {item.product_name}
                </Link>
                <CardText tag="span" className="item-company">
                  By{' '}
                  <a className="company-name" href="/" onClick={(e) => e.preventDefault()}>
                    {item.product_brand}
                  </a>
                </CardText>
              </h6>
              <CardText className="item-description">{item.product_description}</CardText>
            </CardBody>
            <div className="item-options text-center">
              <div className="item-wrapper">
                <div className="item-cost">
                  <h4 className="item-price">${item.product_price}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className="shipping">
                      <Badge color="light-success">Free Shipping</Badge>
                    </CardText>
                  ) : null}
                </div>
              </div>
              <Button
                className="btn-wishlist"
                color="light"
                onClick={() => handleWishlistClick(item)}
              >
                <Heart
                  className={classnames('me-50', {
                    'text-danger': item.isfavorite ? true : false
                  })}
                  size={14}
                />
                <span>Favorite</span>
              </Button>
              {/* {!isInCart(item._id) ? ( */}
              <Button
                color="primary"
                tag={CartBtnTag}
                className="btn-cart move-cart"
                onClick={() => handleCartBtn(item._id, isInCart(item._id))}
              >
                <ShoppingCart className="me-50" size={14} />
                <span>{!isInCart(item._id) ? 'Move to Cart' : 'Remove from Cart'}</span>
              </Button>
              {/* ) : (
                <></>
              )} */}
            </div>
          </Card>
        );
      });
    }
  };

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  );
};

export default ProductCards;

// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import { Star, ShoppingCart, Heart } from 'react-feather';

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap';

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
    addToWishlist,
    deleteWishlistItem
  } = props;

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id));
    }
    dispatch(getCartItems());
    dispatch(getProducts(store.params));
  };

  // ** Handle Wishlist item toggle
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id));
    } else {
      dispatch(addToWishlist(id));
    }
    dispatch(getProducts(store.params));
  };

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map((item, index) => {
        const CartBtnTag = item.isInCart ? Link : 'button';

        return (
          <Card className="ecommerce-card" key={`item.name-${index}`}>
            <div className="item-img text-center mx-auto">
              <Link to={`/ecommerce/shop/public/product/${item._id}`}>
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
                <Link className="text-body" to={`/ecommerce/shop/public/product/${item._id}`}>
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
              <Button className="btn-wishlist" color="light">
                <Heart className="me-50" size={14} />
                <span>Free Shipping</span>
              </Button>
              <Link className="text-body" to={`/ecommerce/checkout/public-product/${item._id}`}>
                <Button color="primary" tag={CartBtnTag} className="btn-cart move-cart">
                  <span>{'Buy Now'}</span>
                </Button>
              </Link>
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

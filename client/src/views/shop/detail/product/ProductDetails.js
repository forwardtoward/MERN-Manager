// ** React Imports
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import {
  Star,
  ShoppingCart,
  DollarSign,
  Heart,
  Share2,
  Facebook,
  Twitter,
  Youtube,
  Instagram
} from 'react-feather';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  CardText,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
import { BsArrowReturnLeft } from 'react-icons/bs';

const Product = (props) => {
  // ** Props
  const {
    store,
    data,
    dispatch,
    addToWishlist,
    getProduct,
    productId,
    addToCart,
    handleWishlistItem
  } = props;

  // ** State
  const colorOptions = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];
  const [isInWishlist, setIsInWishList] = useState(false);
  const [selectedColor, setSelectedColor] = useState('primary');
  const [productDetail, setProductDetail] = useState({});
  const products = store.cart;

  const renderColorOptions = () => {
    return colorOptions.map((color, index) => {
      const isLastColor = colorOptions.length - 1 === index;
      return (
        <li
          key={color}
          className={classnames('d-inline-block', {
            'me-25': !isLastColor,
            selected: selectedColor === color
          })}
          onClick={() => setSelectedColor(color)}
        >
          <div className={`color-option b-${color}`}>
            <div className={`filloption bg-${color}`}></div>
          </div>
        </li>
      );
    });
  };

  // ** Handle Wishlist item toggle
  const handleWishlist = (item) => {
    if (item.isfavorite === 0) {
      dispatch(handleWishlistItem({ id: item._id, isfavorite: 1 }));
    } else {
      dispatch(handleWishlistItem({ id: item._id, isfavorite: 0 }));
    }
    setIsInWishList(!isInWishlist);
  };

  const isInCart = (product_id) => {
    let status = false;
    products &&
      products.map((item, i) => {
        if (item.product._id === product_id) {
          status = true;
        }
      });
    return status;
  };

  // ** Handle Move/Add to cart
  const handleCartBtn = (id) => {
    if (id) {
      dispatch(addToCart(id));
    }
  };

  // ** Condition btn tag
  const CartBtnTag = Link;
  useEffect(() => {
    dispatch(getProduct(productId)).then((res) => {
      if (res && res.payload.data) {
        setProductDetail({ ...res.payload.data });
      }
    });
  }, [isInWishlist]);

  return productDetail ? (
    <Row className="my-2">
      <Col className="d-flex align-items-center justify-content-center mb-2 mb-md-0" md="5" xs="12">
        <div className="d-flex align-items-center justify-content-center">
          <img
            className="img-fluid product-img"
            src={productDetail.product_url}
            alt={productDetail.product_name}
          />
        </div>
      </Col>
      <Col md="7" xs="12">
        <h4>{data.product_name}</h4>
        <CardText tag="span" className="item-company">
          By
          <a className="company-name" href="/" onClick={(e) => e.preventDefault()}>
            {productDetail.product_brand}
          </a>
        </CardText>
        <div className="ecommerce-details-price d-flex flex-wrap mt-1">
          <h4 className="item-price me-1">${data.price}</h4>
          <ul className="unstyled-list list-inline">
            {new Array(5).fill().map((listItem, index) => {
              return (
                <li key={index} className="ratings-list-item me-25">
                  <Star
                    className={classnames({
                      'filled-star': index + 1 <= productDetail.product_rating,
                      'unfilled-star': index + 1 > productDetail.product_rating
                    })}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <CardText>
          Available -<span className="text-success ms-25">In stock</span>
        </CardText>
        <CardText>{data.product_description}</CardText>
        <ul className="product-features list-unstyled">
          <li>
            <ShoppingCart size={19} />
            <span>Free Shipping</span>
          </li>
          <li>
            <DollarSign size={19} />
            <span>EMI options available</span>
          </li>
        </ul>
        <hr />
        <div className="d-flex flex-column flex-sm-row pt-1">
          <Link to={`/ecommerce/checkout/product/${productDetail._id}`}>
            <Button
              tag={CartBtnTag}
              className="btn-cart me-0 me-sm-1 mb-1 mb-sm-0"
              color="primary"
              // // /*eslint-disable */
              {...{ to: `/ecommerce/checkout/product/${productDetail._id}`}}
            >
              <ShoppingCart className="me-50" size={14} />
              {'Buy Now'}
            </Button>
          </Link>
          {!isInCart(productDetail._id) ? (
            <Button
              tag={CartBtnTag}
              className="btn-cart me-0 me-sm-1 mb-1 mb-sm-0"
              color="primary"
              onClick={() => handleCartBtn(productDetail._id)}
              /*eslint-disable */
            >
              <ShoppingCart className="me-50" size={14} />
              {'Move to cart'}
            </Button>
          ) : (
            <></>
          )}
          <Button
            className="btn-wishlist me-0 me-sm-1 mb-1 mb-sm-0"
            color="secondary"
            outline
            onClick={() => handleWishlist(productDetail)}
          >
            <Heart
              size={14}
              className={classnames('me-50', {
                'text-danger': productDetail.isfavorite ? true : false
              })}
            />
            <span>Wishlist</span>
          </Button>
          <UncontrolledButtonDropdown className="dropdown-icon-wrapper btn-share">
            <DropdownToggle className="btn-icon hide-arrow" color="secondary" caret outline>
              <Share2 size={14} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag="a" href="/" onClick={(e) => e.preventDefault()}>
                <Facebook size={14} />
              </DropdownItem>
              <DropdownItem tag="a" href="/" onClick={(e) => e.preventDefault()}>
                <Twitter size={14} />
              </DropdownItem>
              <DropdownItem tag="a" href="/" onClick={(e) => e.preventDefault()}>
                <Youtube size={14} />
              </DropdownItem>
              <DropdownItem tag="a" href="/" onClick={(e) => e.preventDefault()}>
                <Instagram size={14} />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      </Col>
    </Row>
  ) : (
    <></>
  );
};

export default Product;

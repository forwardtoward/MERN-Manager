// ** React Imports
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// ** Third Party Components
import classnames from 'classnames';
import { Star, ShoppingCart, Heart, UserPlus, Copy, Check } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/images/elements/iphone-x.png';
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button, Badge } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const MembershipCards = (props) => {
  // ** Props
  const {
    store,
    type,
    dispatch,
    activeView,
    getMembership,
    addMembershipToWishlist,
    deleteMembershipWishlist
  } = props;

  const { memberships } = store;
  const [membershipData, setMembership] = useState([]);

  useEffect(() => {
    const reMemberShips = memberships.map((item) => ({ ...item, copied: false }));
    setMembership(reMemberShips);
  }, [memberships]);

  // ** Handle Move/Add to cart
  const buyMembership = (id) => {
    dispatch(getMembership(id));
  };

  // ** Handle Wishlist item toggle
  const handleWishlistClick = (item) => {
    if (item.isfavorite === 0) {
      dispatch(addMembershipToWishlist({ id: item._id }));
    } else {
      dispatch(deleteMembershipWishlist({ id: item._id }));
    }
  };

  const url = new URL(location.href);
  const publicUrl = url.origin + '/ecommerce/checkout/public-membership/';

  const onCopy = (e) => {
    const id = e.split('/').slice(-1)[0];
    let changedMemberships = membershipData.map((item) => {
      if (item._id === id) {
        item.copied = true;
      } else {
        item.copied = false;
      }
      return item;
    });
    setMembership(changedMemberships);
    setTimeout(
      (id) => {
        let changedMemberships = membershipData.map((item) => {
          if (item._id === id) {
            item.copied = false;
          }
          return item;
        });
        setMembership(changedMemberships);
      },
      3000,
      id
    );
  };
  // ** Renders products
  const renderProducts = () => {
    if (membershipData && membershipData.length) {
      return membershipData.map((item, index) => {
        const CartBtnTag = item.isInCart ? Link : 'button';
        return (
          <Card className="ecommerce-card" key={`item.name-${index}`}>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between mb-50">
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
              <div className={'d-flex align-items-center justify-content-between'}>
                <h6 className="item-name">{item.membership_name}</h6>
                <div>
                  <h6 className={`rounded-3 px-1 bg-${item.color} text-white`}>
                    {item.membership_type}
                  </h6>
                </div>
              </div>
              <CardText className="item-description mt-2">{item.description}</CardText>
              <div className="item-wrapper">
                <div className="item-rating">
                  <h6>{'Total Price:'}</h6>
                </div>
                <div className="item-cost">
                  <h6 className="item-price">${item.total_price}</h6>
                </div>
              </div>
              <div className="item-wrapper">
                <div className="item-rating">
                  <h6>{'Payment Type:'}</h6>
                </div>
                <div className="item-cost">
                  <h6 className="item-price">${item.payment_type}</h6>
                </div>
              </div>
            </CardBody>
            <div className="item-options text-center">
              <div className="item-wrapper">
                <div className="item-cost">
                  <h4 className="item-price">${item.price}</h4>
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
              <Link to={`/ecommerce/checkout/membership/${item._id}`}>
                <Button
                  color="primary"
                  tag={CartBtnTag}
                  className="btn-cart move-cart"
                  onClick={() => buyMembership(item._id)}
                  /*eslint-disable */
                  {...{ to: '/ecommerce/checkout/membership' }}
                  /*eslint-enable */
                >
                  <ShoppingCart className="me-50" size={14} />
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

export default MembershipCards;

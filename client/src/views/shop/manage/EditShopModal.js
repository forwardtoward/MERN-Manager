import React, { useEffect, useState } from 'react';

import {
  Button,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import { useUploadSignature } from '../../../requests/documents/recipient-doc';
import { editShopAction, getIsValidPath } from '../store/action';

export default function EditShopModal({ open, toggle, dispatch, data }) {
  const [shop, setShop] = useState({});
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (data) {
      setShop(data);
    }
  }, []);

  const editShop = () => {
    let payload = shop;
    if (logo !== null) {
      const formData = new FormData();
      formData.append('file', logo);
      useUploadSignature(formData).then((res) => {
        if (res?.success === true) {
          payload = { ...payload, logoUrl: res.url };
          if (banner !== null) {
            const formData = new FormData();
            formData.append('file', banner);
            useUploadSignature(formData).then((res) => {
              if (res?.success === true) {
                payload = { ...payload, bannerUrl: res.url };
                //dispatch(createShopAction(payload))
                dispatch(editShopAction(shop._id, payload));
                toggle();
              }
            });
          }
        }
      });
    } else {
      if (banner !== null) {
        const formData = new FormData();
        formData.append('file', banner);
        useUploadSignature(formData).then((res) => {
          if (res?.success === true) {
            payload = { ...payload, bannerUrl: res.url };
            //dispatch(createShopAction(payload))
            dispatch(editShopAction(shop._id, payload));
            toggle();
          }
        });
      } else {
        dispatch(editShopAction(shop._id, payload));
        toggle();
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'bannerUrl') {
      setBanner(e.target.files[0]);
    } else if (e.target.name === 'logoUrl') {
      setLogo(e.target.files[0]);
    } else if (e.target.name === 'shopPath') {
      if (e.target.value.length > 5) {
        dispatch(getIsValidPath(e.target.value.replaceAll(' ', '-'))).then((res) => {
          if (res.isAvailable === true) {
            setIsValid(true);
            setShop({ ...shop, [e.target.name]: e.target.value.replaceAll(' ', '-') });
          } else {
            setIsValid(false);
          }
        });
      } else {
        setShop({ ...shop, [e.target.name]: e.target.value });
      }
    } else {
      setShop({ ...shop, [e.target.name]: e.target.value });
    }
  };
  return (
    <>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Your Shop</ModalHeader>
        <ModalBody>
          <div>
            <Label>Name Your Shop</Label>
            <Input type="text" name="name" onChange={handleChange} value={shop?.name} />
          </div>
          <div>
            <Label>Give a Short Description</Label>
            <Input
              type="text"
              name="description"
              onChange={handleChange}
              value={shop?.description}
            />
          </div>
          <div>
            <Label>Give a Path for Your Shop</Label>
            {/* <Input type="text" name="shopPath" onChange={handleChange} /> */}
            <InputGroup>
              <InputGroupText>www.mymanager.com/shop/</InputGroupText>
              <Input
                type="text"
                value={shop?.shopPath}
                placeholder="Shop Path"
                name="shopPath"
                valid={isValid}
                // onChange={handleChange}
                disabled
              />
            </InputGroup>
            <FormFeedback valid={isValid}>Sweet! That path is available.</FormFeedback>
          </div>
          <div>
            <Label>Shop Banner</Label>
            {shop?.bannerUrl && <img src={shop?.bannerUrl} className="w-100" />}
            <Input type="file" name="bannerUrl" onChange={handleChange} />
          </div>
          <div>
            <Label>Shop Logo</Label>
            <br />
            {shop?.logoUrl && <img src={shop?.logoUrl} className="w-50 text-center" />}
            <Input type="file" name="logoUrl" onChange={handleChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={editShop}>
            Edit Shop
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

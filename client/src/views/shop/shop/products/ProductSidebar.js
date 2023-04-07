// ** React Imports

// ** Custom Hooks
import Sidebar from '@components/sidebar';
import { selectThemeColors } from '@utils';
import { useForm } from 'react-hook-form';
// ** Third Party Components
import Select, { components } from 'react-select';
import { useEffect } from 'react';
import wNumb from 'wnumb';
import classnames from 'classnames';
import { Star, Grid, Circle } from 'react-feather';
import Nouislider from 'nouislider-react';
import useMessage from '../../../../lib/useMessage';
// import AddTypeModal from './AddTypeModal';
import { useGetMembershipTypes } from '../../../../requests/membership';

// ** Reactstrap Imports
import { Button, Label, Form, Input, ButtonGroup } from 'reactstrap';

// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss';
import { useState } from 'react';
import Buttons from '../../../components/buttons';
import { addProduct } from '../../store';

// ** Store
import { useSelector } from 'react-redux';

const ProductSidebar = (props) => {
  // ** Props
  const [state, setState] = useState({
    name: '',
    brand: '',
    price: 0,
    rating: 0,
    description: ''
  });
  const { productSidebarOpen, toggleProductHandler, dispatch } = props;
  const [avatar, setAvatar] = useState(
    require('@src/assets/images/avatars/avatar-blank.png').default
  );
  const [permission, setPermission] = useState('Private');
  const { error, success } = useMessage();

      // ** Store Vars
  const shopStore = useSelector((state) => state.shopDetails);

  const permissionOptions = [
    { value: 'private', label: 'Private' },
    { value: 'public', label: 'Public' },
    { value: 'all', label: 'All' }
  ];

  const [selectedFile, setSelectedFile] = useState(null);

  const onPhotoChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      setSelectedFile(files[0]);
      setAvatar(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const handleImgReset = () => {
    setAvatar(require('@src/assets/images/avatars/avatar-blank.png').default);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const { name, price, brand, rating, description } = state;
    if (name === '') {
      error('product name must not be empty!');
      return;
    }
    if (price === 0) {
      error('product price must not be empty!');
      return;
    }
    if (brand === 0) {
      error('product brand must not be empty!');
      return;
    }
    if (description === '') {
      error('description must not be empty!');
      return;
    }
    if (selectedFile === null) {
      error('photo must not be empty!');
      return;
    }
    let formData = new FormData();
    formData.append('product_name', name);
    formData.append('product_brand', brand);
    formData.append('product_description', description);
    formData.append('product_price', price);
    formData.append('product_rating', rating);
    formData.append('permission', permission);
    formData.append('file', selectedFile);
    formData.append('shopId', shopStore.shop._id);
    dispatch(addProduct(formData)).then((res) => {
      if (res) {
        toggleProductHandler();
      }
    });
  };

  return (
    <Sidebar
      size="lg"
      open={productSidebarOpen}
      title="New Product"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleProductHandler}
    >
      <Form onSubmit={submitHandler}>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-5 mb-1">
            <Label className="form-label" for="name">
              Name <span className="text-danger">*</span>
            </Label>
            <></>
            <Input
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  name: e?.target?.value
                }));
              }}
              id="name"
              placeholder="Product Name"
            />
          </div>
          <div className="col-5">
            <Label className="form-label" for="name">
              Brand <span className="text-danger">*</span>
            </Label>
            <></>
            <Input
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  brand: e?.target?.value
                }));
              }}
              id="brand"
              placeholder="Product Brand"
            />
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-5">
            <Label className="form-label" for="duration">
              Price<span className="text-danger">*</span>
            </Label>
            <Input
              type="number"
              id="price"
              placeholder="Enter Price"
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  price: e.target.value
                }));
              }}
            />
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="me-25">
            <img
              className="rounded me-50"
              src={avatar}
              alt="Generic placeholder image"
              height="100"
              width="100"
            />
          </div>
          <div className="d-flex align-items-end mt-75 ms-1">
            <div>
              <Button tag={Label} className="mb-75 me-75" size="sm" color="primary">
                Upload
                <Input
                  type="file"
                  onChange={onPhotoChange}
                  hidden
                  // accept="image/*"
                />
              </Button>
              <Button
                className="mb-75"
                color="secondary"
                size="sm"
                outline
                onClick={handleImgReset}
              >
                Reset
              </Button>
              <p className="mb-0">Allowed JPG, GIF or PNG. Max size of 800kB</p>
            </div>
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-12">
            <Label className="form-label" for="balance">
              Description <span className="text-danger">*</span>
            </Label>
            <Input
              type="textarea"
              rows="5"
              id="total_price"
              placeholder=""
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  description: e.target.value
                }));
              }}
            />
          </div>
        </div>
        <div className="col-12 mb-1 d-flex justify-content-between">
          <div className="col-12">
            <Label className="form-label" for="permission">
              Select Permission
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={permissionOptions[0]}
              options={permissionOptions}
              isClearable={false}
              onChange={(data) => setPermission(data.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between px-5 py-3">
          <Button type="reset" color="secondary" outline onClick={toggleProductHandler}>
            Cancel
          </Button>
          <Button type="submit" onClick={submitHandler} className="me-1" color="primary">
            {'Add'}
          </Button>
        </div>
      </Form>
      {/* <AddTypeModal modal={modal} toggle={toggle} membershipTypes={membershipTypes} newMembershipTypes={newMembershipTypes} refetch={refetch}/> */}
    </Sidebar>
  );
};

export default ProductSidebar;

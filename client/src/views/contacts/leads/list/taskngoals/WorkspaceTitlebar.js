// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// ** Icons Imports
import { ChevronLeft, ChevronRight, MoreVertical, Share, UserPlus, Users } from 'react-feather';
// ** Reactstrap Component Imports
import {
  Button,
  Col,
  Collapse,
  Row,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
// ** Blank Avatar Image
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png';
// ** Custom Components
import Avatar from '@components/avatar';
import AvatarGroup from '@components/avatar-group';
import WorkspaceTitle from '@src/views/apps/workspace';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWorkspaceApi,
  getSelectedWorkspaceData,
  addWorkspace
} from '@src/views/apps/workspace/store';

// ** Style
import '@src/assets/styles/toggle-switch.scss';

const WorkspaceTitleBar = (props) => {
  const { workspace, handleWorkspaceCollapse, collapse, active, setActive, activeLeadName } = props;
  const [shareModalFlag, setShareModalFlag] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return {
      ...state.workspace
    };
  });

  const id = 'toggle-switch-task';
  const name = 'toggle-switch-task';

  const handleKeyPress = (e) => {
    if (e.keyCode !== 32) return;

    e.preventDefault();

    if (active == '2') {
      setActive('3');
    } else {
      setActive('2');
    }
  };

  useEffect(() => {
    dispatch(fetchWorkspaceApi()).then((res) => {
      if (res && res.payload && res.payload.length > 0) {
        dispatch(getSelectedWorkspaceData(res.payload[0]._id));
      }
    });
  }, [dispatch]);
  



  // ** Renders Collabrators
  const renderCollabrators = () => {
    const item = workspace?.collabrators;
    if (item === undefined) return null;
    return item.length ? (
      <div>{item.length ? <AvatarGroup data={item} /> : null}</div>
    ) : (
      <Avatar img={blankAvatar} imgHeight="32" imgWidth="32" />
    );
  };

  return (
    <div className="workspace-title border-bottom d-flex justify-content-between">
      {collapse ? (
        <Button className="btn-icon" size="sm" color="flat-dark" onClick={handleWorkspaceCollapse}>
          <ChevronRight size={14} style={{ margin: '-2px -2px' }} />
        </Button>
      ) : null}
      <WorkspaceTitle workspace={activeLeadName} />
      <div className="d-flex align-items-center">
        {renderCollabrators()}
        <Button outline={true} color="flat-dark" className="d-flex" onClick={() => {}}>
          <Users size={14} />
          <span className="align-middle ms-25">Assignee</span>
        </Button>
        <div className="toggle-switch">
          <input
            type="checkbox"
            name={name}
            className="toggle-switch-checkbox"
            id={id}
            checked={active == '2'}
            onChange={(e) => setActive(e.target.checked ? '2' : '3')}
          />
          {id ? (
            <label
              className="toggle-switch-label"
              // tabIndex={disabled ? -1 : 1}
              onKeyDown={(e) => handleKeyPress(e)}
              htmlFor={id}
            >
              <span className="toggle-switch-inner" data-yes="List" data-no="Board" tabIndex={-1} />
              <span className="toggle-switch-switch" tabIndex={-1} />
            </label>
          ) : null}
        </div>
        <UncontrolledDropdown>
          <DropdownToggle
            className="hide-arrow me-1"
            tag="a"
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            <MoreVertical className="text-body" size={16} />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'title-asc')}>
              About this workspace
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'title-desc')}>
              Change background
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'assignee')}>
              Upgrade
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'due-date')}>
              Activity
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, '')}>
              More
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </div>
  );
};

export default WorkspaceTitleBar;

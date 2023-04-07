// ** React Imports
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

// ** Icons Imports
import { ChevronRight, MoreVertical, UserPlus } from 'react-feather';
// ** Reactstrap Component Imports
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap';
// ** Custom Components
import Avatar from '@components/avatar';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWorkspaceApi,
  getSelectedWorkspaceData,
  shareWorkspace,
  shareRevertWorkspace
} from '../apps/workspace/store';

// ** Style
import '@src/assets/styles/toggle-switch.scss';

import WorkspaceTitle from '../apps/workspace';
import About from './About';
import ShareModal from './Share';

const WorkspaceTitleBar = (props) => {
  const {
    workspace,
    handleWorkspaceCollapse,
    collapse,
    setToggle,
    toggleListOrBoard,
    optionLabels,
    selectedTab
  } = props;
  const [aboutOpen, setAboutOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const dispatch = useDispatch();
  const { employeeList } = useSelector((state) => state.employeeContact);

  const store = useSelector((state) => {
    return {
      ...state.workspace
    };
  });

  useEffect(() => {
    dispatch(fetchWorkspaceApi()).then((res) => {
      if (res.payload) {
        dispatch(getSelectedWorkspaceData(res.payload[0]._id));
      }
    });
  }, [dispatch]);

  // ** Renders Collaborators
  const renderCollaborators = () => {
    return store.selectedWorkspace.collaborators ? (
      <div className="own-avatar-group">
        {store.selectedWorkspace.collaborators.map((row) => renderAssignee(row))}
      </div>
    ) : (
      ''
    );
  };

  const renderAssignee = (row) => {
    let tmpValue = 0;
    if (row && row.label && Object.keys(row).length > 0) {
      Array.from(row.label).forEach((x, index) => {
        tmpValue += x.codePointAt(0) * (index + 1);
      });
    }
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    return (
      <div className="own-avatar">
        {row?.label ? (
          <UncontrolledTooltip placement={row?.placement} target={row.label.split(' ').join('-')}>
            {row.label}
          </UncontrolledTooltip>
        ) : null}
        {row?.img ? (
          <Avatar
            className={classnames('pull-up', {
              [row.className]: row.className
            })}
            img={row.img}
            width="32"
            height="32"
            {...(row.label ? { id: row.label.split(' ').join('-') } : {})}
          />
        ) : (
          <Avatar
            color={color || 'primary'}
            className={classnames('pull-up', {
              [row?.className]: row?.className
            })}
            content={row?.label || 'John Doe'}
            {...(row?.label ? { id: row?.label.split(' ').join('-') } : {})}
            width="32"
            height="32"
            initials
          />
        )}
      </div>
    );
  };

  const handleKeyPress = (e) => {
    if (e.keyCode !== 32) return;

    e.preventDefault();
    setToggle(!toggleListOrBoard);
  };

  const shareWorkspaceBtnClicked = () => {
    setShareOpen(true);
  };

  const aboutThisWorkspace = (e) => {
    e.preventDefault();
    setAboutOpen(true);
  };

  const shareConfirm = (data) => {
    dispatch(shareWorkspace(data));
  };

  const shareRevert = (data) => {
    dispatch(shareRevertWorkspace(data));
  };

  const id = 'toggle-switch-task';
  const name = 'toggle-switch-task';
  //const optionLabels = ['List', 'Board'];

  return (
    <div className="workspace-title">
      {collapse ? (
        <Button className="btn-icon" size="sm" color="flat-dark" onClick={handleWorkspaceCollapse}>
          <ChevronRight size={14} style={{ margin: '-2px -2px' }} />
        </Button>
      ) : null}
      <WorkspaceTitle workspace={workspace} dispatch={dispatch} />
      <div className="d-flex align-items-center">
        {renderCollaborators()}
        <Button
          color="flat-success"
          style={{ borderRadius: '20px', marginInline: '10px', padding: '5px 21px' }}
          className="d-flex"
          onClick={shareWorkspaceBtnClicked}
        >
          <UserPlus size={16} />
          <span className="align-middle ms-25">Share</span>
        </Button>
        {selectedTab === '1' && (
          <div className="toggle-switch">
            <input
              type="checkbox"
              name={name}
              className="toggle-switch-checkbox"
              id={id}
              checked={toggleListOrBoard}
              onChange={(e) => setToggle(e.target.checked)}
            />
            {id ? (
              <label
                className="toggle-switch-label"
                // tabIndex={disabled ? -1 : 1}
                onKeyDown={(e) => handleKeyPress(e)}
                htmlFor={id}
              >
                <span
                  className="toggle-switch-inner"
                  data-yes={optionLabels[0]}
                  data-no={optionLabels[1]}
                  tabIndex={-1}
                />
                <span className="toggle-switch-switch" tabIndex={-1} />
              </label>
            ) : null}
          </div>
        )}
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
            <DropdownItem tag={Link} to="/" onClick={aboutThisWorkspace}>
              About this workspace
            </DropdownItem>
            {/* <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'title-desc')}>
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
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
        <About
          store={store}
          selectedWorkspace={store.selectedWorkspace}
          isOpen={aboutOpen}
          setIsOpen={setAboutOpen}
        />
        <ShareModal
          store={store}
          selectedWorkspace={store.selectedWorkspace}
          employeeList={employeeList}
          isOpen={shareOpen}
          setIsOpen={setShareOpen}
          shareConfirm={shareConfirm}
          shareRevert={shareRevert}
        />
      </div>
    </div>
  );
};

export default WorkspaceTitleBar;

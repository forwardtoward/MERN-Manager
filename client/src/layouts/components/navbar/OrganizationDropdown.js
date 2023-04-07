import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { getUserData } from '../../../auth/utils';
import { AbilityContext } from '../../../utility/context/Can';
import { setPermissions } from '../../../utility/Utils';
import { getOrgByPath } from '../../../views/organizations/store/api';

export default function OrganizationDropdown({ user }) {
  // ** Context
  const ability = useContext(AbilityContext);
  // ** State
  const [orgs, setOrgs] = useState([]);
  const [title, setTitle] = useState('Personal');

  const organization = localStorage.getItem('organization');
  // ** Function
  const handleChangeToPersonal = () => {
    localStorage.removeItem('organization');
    //rewrite with user plan permissions
    const user = getUserData();
    const newAbility = setPermissions(user.plan.permissions);
    const localUser = JSON.parse(localStorage.getItem('userData'));
    localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));

    setTitle('Personal');
    window.location.reload(false);
  };
  const handleChangeOrganization = async (o) => {
   
    //get org
    const org = await getOrgByPath(o.path);
    const plan = org.data[0].plan[org.data[0].plan.length - 1];
    const planDetails = org.data[0].planDetails.find((x) => x._id === plan.planId);
    switch (plan.status) {
      case 'waiting':
        const trialExp = new Date(plan.updatedAt).setDate(
          new Date(plan.updatedAt).getDate() + planDetails?.trialTime
        );
        const now = new Date();
        if (trialExp > now) {
          // go to organization
          const newAbility = setPermissions(planDetails.permissions);
          localStorage.setItem('organization', JSON.stringify(org.data[0]));
          const localUser = JSON.parse(localStorage.getItem('userData'));
          localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
          localStorage.setItem('expire',false)
          window.location.reload(false);
        } else {
          // payment then go to organization
          const newAbility = setPermissions(planDetails.permissions);
          localStorage.setItem('organization', JSON.stringify(org.data[0]));
          const localUser = JSON.parse(localStorage.getItem('userData'));
          localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
          localStorage.setItem('expire',true)
          window.location.reload(false);
        }
        break;
      case 'suspended':
        toast.error('Your organization plan is suspended! please contact support');
        break;
      case 'active':
        const newAbility = setPermissions(planDetails.permissions);
        localStorage.setItem('organization', JSON.stringify(org.data[0]));
        const localUser = JSON.parse(localStorage.getItem('userData'));
        localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
        window.location.reload(false);
        break;

      default:
        toast.error('No status found for your organization. please contact support');
        break;
    }
  };
  useEffect(() => {
    if (user && user?.organizations) {
      setOrgs(user?.organizations);
    }
  }, []);
  useEffect(() => {
    if (organization) {
      let o = JSON.parse(organization);

      setTitle(o.name);
    }
  }, [organization]);
  return (
    <UncontrolledDropdown className="me-50">
      <DropdownToggle caret color="outline-secondary">
        {title}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem className="w-100" onClick={handleChangeToPersonal}>
          Personal
        </DropdownItem>
        {orgs?.map((o, idx) => {
          return (
            <DropdownItem key={idx} className="w-100" onClick={() => handleChangeOrganization(o)}>
              {o.name}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

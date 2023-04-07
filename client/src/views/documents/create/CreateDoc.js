// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Components
import WizardModernVertical from './WizardModernVertical';
import { useParams } from 'react-router-dom';

import { DocumentContext } from '../../../utility/context/Document';



const CreateDoc = () => {
  const { setRecipients, setIsTemplate, setTemplateType } = useContext(DocumentContext);
  const { template, type } = useParams();
  // ** State

  useEffect(() => {
    setTemplateType(type);
    setIsTemplate(true);
    if (template === 'template') {
      setRecipients([
        {
          id: crypto.randomUUID(),
          name: 'first party',
          email: 'firstparty',
          color: '#B5EAD7',
          active: true,
          roleOption: 'sign',
          hashCode: '',
          url: '',
          hasViewed: false
        },
        {
          id: crypto.randomUUID(),
          name: 'Myself',
          email: 'myself',
          color: '#C7CEEA',
          active: false,
          roleOption: 'sign',
          hashCode: '',
          url: '',
          hasViewed: false
        }
      ]);
    } else {
      setIsTemplate(false);
    }
  }, [template, type]);

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Documents"
        breadCrumbParent="Documents"
        breadCrumbActive="Create Doc"
      />

      <WizardModernVertical />
    </Fragment>
  );
};

export default CreateDoc;

// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Components
import WizardModernVertical from './WizardModernVertical'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const AddEvent = () => {
    return (
        <Fragment>
            {/* <BreadCrumbs
                breadCrumbTitle="Event"
                breadCrumbParent="Calendar"
                breadCrumbActive="Add Event"
            /> */}

            <WizardModernVertical />
        </Fragment>
    )
}

export default AddEvent

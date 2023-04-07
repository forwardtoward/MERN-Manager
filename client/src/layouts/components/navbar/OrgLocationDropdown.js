import React, { useEffect, useState } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
export default function OrgLocationDropdown() {
    // ** Vars
    const organization = localStorage.getItem('organization')

    // ** States
    const [locations,setLocations] = useState([])
    const [title,setTitle] = useState('Select Location')

    const handleChangeLocation =()=>{

    }

    // ** Initial State
    useEffect(()=>{
        if(organization){
            setLocations(JSON.parse(organization).locations)
        }
    },[organization])
  return (
    <UncontrolledDropdown>
        <DropdownToggle caret color='outline-secondary' >{title}</DropdownToggle>
        <DropdownMenu>
            {
                locations.map((x,idx)=>{
                    <DropdownItem className='w-100' key={idx} onClick={()=>handleChangeLocation(x)}>{x.name}</DropdownItem>
                })
            }
        </DropdownMenu>
    </UncontrolledDropdown>
  )
}

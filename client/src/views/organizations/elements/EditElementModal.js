import React, { useState } from 'react'
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'


export default function EditElementModal({open,toggle,element,dispatch}) {
    const [elem,setElem] = useState(element)
    const handleChange = (e)=>{
        setElem({...elem, title:e.target.value})
    }
    const updateElement = ()=>{
        //dispatch(updateElementAction(elem._id,elem.organizationId,{title:elem.title}))
    }
  return (
    <Modal isOpen={open} toggle={toggle}>
        <ModalHeader>Edit Element</ModalHeader>
        <ModalBody>
            <div>
                <Label>What do you want to show?</Label>
                <Input type='text' defaultValue={elem.title} onChange={handleChange}/>
            </div>

        </ModalBody>
        <ModalFooter>
            <div className='d-flex justify-content-between'>
                <Button color='primary' onClick={updateElement}>Submit</Button>
            </div>
        </ModalFooter>
    </Modal>
  )
}

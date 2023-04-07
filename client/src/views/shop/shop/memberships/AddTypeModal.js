import React, { useState } from 'react'
import {Circle} from 'react-feather'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Table,
    Form,
} from 'reactstrap'

// import position table row


// create new type request api function import
import MemberShipTableRow from './MemberShipTableRow';
import {useCreateNewMembershipType, deleteMembershipTypeRQ} from '../../../../requests/membership'
import { toast } from 'react-toastify'

const AddTypeModal = ({
    modal,
    // setState,
    toggle,
    newMembershipTypes,
    membershipTypes,
    refetch
}) => {
    const { mutate } = useCreateNewMembershipType();
    const handleSubmit = (e) => {
        e.preventDefault()
        const type = e.target.type.value
        const payload = { type: type, color:selectedColor.label };
        const isTypeExist = newMembershipTypes?.find((p) => p.type.toLowerCase() === type.toLowerCase())
        if (isTypeExist) {
            e.target.reset()
            return toast.error("This type already exists")
        }
        else {
            mutate(payload)

            // refetch lead position data
            setTimeout(() => {
                refetch()
            }, 100)

            e.target.reset()
        }
    }

    const [deleteModal, setDeleteModal] = useState({
        id: '',
        show: false
    });

    const [colors,setColors]=useState([
        {   
            label:'primary',
            color:'#7367f0'
        },
        {
            label:'secondary',
            color:'#82868b'
        },
        {
            label:'success',
            color:'#28c76f'
        },
        {
            label:'info',
            color:'#00cfe8'
        },
        {
            label:'warning',
            color:'#ff9f43'
        },
        {
            label:'danger',
            color:'#ea5455'
        }
    ]);

    const [selectedColor, setSelectedColor]=useState(
        {
            label:'primary',
            color:'#7367f0'
        }
    );

    const deleteMembershipType = (id) => {

        if (!id) {
            // modal toggle
            setDeleteModal({
                id: '',
                show: false
            })

            return toast.warning("It's a default position. You can't delete this")
        }

        deleteMembershipTypeRQ(id)

        // modal toggle
        setDeleteModal({
            id: '',
            show: false
        })

        // refetch data
        setTimeout(() => {
            refetch()
        }, 100)
    }

    return (
        <form>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Type</ModalHeader>
                <ModalBody>
                    <div className="mb-1">
                        <Form onSubmit={handleSubmit}>
                            <Label className="form-label" for="position">
                                New Membership Type
                            </Label>
                            <div className='d-flex gap-2'>
                                <Input
                                    style={{ width: "71%" }}
                                    id="type"
                                    name="type"
                                    placeholder="add new"
                                />
                                <Button
                                    type='submit'
                                    size='sm'
                                    color="primary"
                                >
                                    Add
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <div className="mb-2">
                         <Label className="form-label" for="position">
                                Label Color
                         </Label>
                         <div>
                            {colors.map((e, index)=>{
                                return(
                                <Circle fill={e.color} color={selectedColor.color===e.color?'red':e.color} onClick={(val)=>{setSelectedColor({...e})}}/>
                                )
                            })}
                           
                         </div>
                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <h5
                        style={{
                            marginRight: "auto",
                            marginTop: "7px", marginBottom: "10px"
                        }}>
                        Available Types
                    </h5>
                    <Table size="sm">
                        <thead>
                            <tr>
                                <th style={{ width: "20%" }}>
                                    No
                                </th>
                                <th style={{ width: "62%" }}>
                                    Membership Type
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                newMembershipTypes?.map((p, i) =>
                                    <MemberShipTableRow
                                        refetch={refetch}
                                        setDeleteModal={setDeleteModal}
                                        key={i + 1}
                                        i={i}
                                        id={p._id}
                                        type={p.type}>
                                    </MemberShipTableRow>)
                            }
                        </tbody>
                    </Table>

                    <Button className='mt-2' color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            {/* Delete Modal */}
            <Modal
                toggle={() => {
                    setDeleteModal({
                        id: '',
                        show: false
                    })
                }}
                centered
                isOpen={deleteModal.show}
            >
                <ModalBody>
                    <div>
                        <h3>Are you sure to Delete ?</h3>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        size="sm"
                        onClick={() => {
                            setDeleteModal({
                                id: '',
                                show: false
                            })
                        }}
                    >
                        No
                    </Button>
                    <Button
                        // disabled={deleteLoading}
                        size="sm"
                        color="primary"
                        onClick={() => {
                            deleteMembershipType(deleteModal?.id)
                        }}
                    >
                        {/* {deleteLoading ? 'Deleting...' : 'Yes'} */}
                        Yes
                    </Button>{' '}
                </ModalFooter>
            </Modal>
        </form>
    )
}

export default AddTypeModal;
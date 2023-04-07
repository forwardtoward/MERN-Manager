import React, { useState } from 'react'
import { Edit, MoreVertical, Trash2 } from 'react-feather'
import { toast } from 'react-toastify'
import {
    DropdownToggle,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    Input
} from 'reactstrap'

import { usePutMembershipType } from '../../../../requests/membership'

import { useGetMembershipTypes} from '../../../../requests/membership'

const MemberShipTableRow = ({ type, i, id, setDeleteModal, refetch }) => {


    // toggle lead position input field and lead position title
    const [editType, setEditType] = useState(false)

    const { data: membershiptypes } = useGetMembershipTypes()
    const handleEditType = (e) => {
        e.preventDefault()

        const typeName = e.target.type.value
        const payload = { type: typeName}

        const isTypeExist = membershiptypes.find((p) => p.type.toLowerCase() === typeName.toLowerCase())

        if (isTypeExist) {
            // toggle lead position input field and lead position title
            setEditType(!editType)
            return toast.error("This membership type already exists")
        }
        else if (!id) {
            setEditType(!editType)
            return toast.warning("It's a default type. You can't edit this")
        }

        else {
            setEditType(!editType)

            // pass id and edited value to db
            usePutMembershipType(id, payload)

            // refetch lead position data
            setTimeout(() => {
                refetch()
            }, 100)
        }
    }

    return (
        <tr>
            <th scope="row">
                {i + 1}
            </th>
            <td>
                {
                    editType ?
                        <form onSubmit={handleEditType}>
                            <Input
                                bsSize="sm"
                                id="type"
                                name="type"
                                placeholder={type}
                            />
                        </form>
                        :
                        <span>{type}</span>
                }

            </td>
            <td className='d-flex gap-2'>

                <UncontrolledDropdown >
                    <DropdownToggle tag="div" className="btn btn-sm">
                        <MoreVertical
                            size={14}
                            className="cursor-pointer"
                        />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={() => setEditType(!editType)}
                            className="w-100"
                        >
                            <Edit size={14} className="me-50" />
                            <span
                                className="align-middle">Edit</span>
                        </DropdownItem>

                        <DropdownItem
                            className="w-100"
                            onClick={(e) => {
                                setDeleteModal({
                                    id: id,
                                    show: true
                                })
                            }}
                        >
                            <Trash2 size={14} className="me-50" />
                            <span className="align-middle">Delete</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    )
}

export default MemberShipTableRow
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table} from "reactstrap";
import dayjs from "dayjs";
import 'dayjs/locale/az'
import AddModal from "./AddModal.jsx";

const Categories = () => {
    dayjs.locale('az')
    const [data, setData] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const getCategories = async (showLoader = true) => {
        setIsLoading(showLoader)
        const {data} = await axios.get(`${import.meta.env.VITE_APP_BASE_API_URL}dashboard/categories/index`,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params:{
                name:'Contact'
            }
        })
        setData(data?.data?.categories)
        setIsLoading(false)
    }

    useEffect(() => {
        getCategories()
    },[])

    const toggle = (fetchData = false) => {
        setIsOpen(!isOpen)
        if(fetchData) {
            getCategories(false)
        }
    }

    const deleteCategory = async (id) => {
        await axios.delete(`${import.meta.env.VITE_APP_BASE_API_URL}dashboard/categories/delete/${id}`,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        getCategories(false)
    }

    return <div>
        {isLoading ? <div className="d-flex mt-5 justify-content-center">
            <Spinner size="sm"/>
        </div> : <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <AddModal toggle={toggle}/>
            </Modal>
            <Row className="gap-2 mt-5">
                <Col sm={12} md={2}>
                    <Button onClick={() => toggle()} className="w-100" color="success">Add</Button>
                </Col>
                <Col sm={12}>
                    <Table bordered responsive hover>
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Created at</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    {item.image &&  <img width="100px" height="100px" src={item.image} alt={item.name}/>}
                                </td>
                                <td>
                                    {dayjs(item?.created_at).format('MMMM/DD/YYYY')}
                                </td>
                                <td>
                                    <Button color="danger" onClick={() => deleteCategory(item?.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>}
    </div>
}

export default Categories

import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, Input, Label, Modal, Row, Spinner, Table} from "reactstrap";
import dayjs from "dayjs";
import AddModal from "./AddModal.jsx";
import {Controller, useForm} from "react-hook-form";
import classNames from "classnames";

const Home = () => {
    const [data, setData] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [modalData,setModalData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {control,handleSubmit,reset} = useForm()

    const getData = async (params = null) => {
        setIsLoading(true)
        const {data} = await axios.get(`${import.meta.env.VITE_APP_BASE_API_URL}todo/index`,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            params
        })
        setData(data?.data?.todos)
        setIsLoading(false)
    }

    const toggle = (regenerate = false) => {
        setIsOpen(!isOpen)
        setModalData(null)
        if(regenerate) {
            getData()
        }
    }

    useEffect(() => {
        getData()
    },[])

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_BASE_API_URL}todo/destroy/${id}`,{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            getData()
        }catch (e) {
            alert('Xeta')
        }
    }

    const filter = async (values) => {
        getData(values)
    }

    const resetData = () => {
        reset({
            title:null,
            description:null
        })
        getData()
    }

    const updateTodo = (todo) => {
        setIsOpen(true)
        setModalData(todo)
    }

    return <div>
        {isLoading ? <div className="d-flex mt-5 justify-content-center">
            <Spinner size="sm"/>
        </div> : <Container className="mt-5">
            <Modal isOpen={isOpen} toggle={() => toggle()}>
                <AddModal modalData={modalData} setModalData={setModalData} toggle={toggle}/>
            </Modal>

            <form onSubmit={handleSubmit(filter)}>
                <Row>
                    <Col sm={12} md={6}>
                        <Controller  render={({field:{value,onChange}}) => (
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input name="name" value={value} onChange={onChange}/>
                            </div>
                        )} name="title" control={control}/>
                    </Col>
                    <Col sm={12} md={6}>
                        <Controller render={({field:{value,onChange}}) => (
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input type="textarea" rows={5} name="description" value={value} onChange={onChange}/>
                            </div>
                        )} name="description" control={control}/>
                    </Col>
                    <Col sm={12}>
                        <div className="mt-3 d-flex gap-2 justify-content-end">
                            <Button color="primary">Search</Button>
                            <Button type="button" onClick={resetData} color="muted">Reset</Button>
                        </div>
                    </Col>
                </Row>
            </form>

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
                            <th>Description</th>
                            <th>Created at</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>
                                    {dayjs(item?.created_at).format('DD.MM.YYYY')}
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Button color="success" onClick={() => updateTodo(item)}>
                                            Update
                                        </Button>
                                        <Button color="danger" onClick={() => deleteTodo(item?.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>}
    </div>
}

export default Home

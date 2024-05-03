import {Button, Input, Label, ModalBody, ModalFooter, ModalHeader, Spinner} from "reactstrap";
import {useForm,Controller} from "react-hook-form";
import classNames from "classnames";
import axios from "axios";
import {useState} from "react";

const AddModal = ({toggle,modalData}) => {
    console.log(modalData)
    const {control,handleSubmit,formState:{errors}} = useForm({
        defaultValues: {
            title:modalData?.title,
            id:modalData?.id,
            description:modalData?.description
        }
    })
    const [isSaving,setIsSaving] = useState(false)

    const submit = async (values) => {
        setIsSaving(true)
        try {
            await axios.post(`${import.meta.env.VITE_APP_BASE_API_URL}todo/${values?.id ? 'update/' + values?.id : 'store'}`,values,{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            toggle(true)
        }catch (e) {
            alert('Xeta')
        }finally {
            setIsSaving(false)
        }
    }

    return <>
        <ModalHeader toggle={toggle}>
            {modalData?.id ? 'Update' : 'Add'} Todo
        </ModalHeader>
        <ModalBody>
            <form id="category-form" onSubmit={handleSubmit(submit)}>
                <Controller rules={{required:true}} render={({field:{value,onChange}}) => (
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input className={classNames({
                            'is-invalid':errors?.name
                        })} name="name" value={value} onChange={onChange}/>
                    </div>
                )} name="title" control={control}/>
                <Controller render={({field:{value,onChange}}) => (
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input type="textarea" rows={5} name="description" value={value} onChange={onChange}/>
                    </div>
                )} name="description" control={control}/>
            </form>
        </ModalBody>
        <ModalFooter>
            <div className="d-flex gap-2">
                <Button disabled={isSaving} type="submit" form="category-form" color="primary">
                    {isSaving && <Spinner size="sm"/>}
                    Save
                </Button>
                <Button color="muted" onClick={toggle}>Close</Button>
            </div>
        </ModalFooter>
    </>
}

export default AddModal

import {Button, Input, Label, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useForm,Controller} from "react-hook-form";
import classNames from "classnames";
import axios from "axios";

const AddModal = ({toggle}) => {
    const {control,handleSubmit,formState:{errors}} = useForm()

    const submit = async (values) => {
        const formData = {
            ...values,
            type:1
        }
        try {
            await axios.post(`${import.meta.env.VITE_APP_BASE_API_URL}dashboard/categories/store`,formData,{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            toggle(true)
        }catch (e) {
            alert('Xeta')
        }
    }

    return <>
        <ModalHeader toggle={toggle}>
            Add Category
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
                )} name="name" control={control}/>
            </form>
        </ModalBody>
        <ModalFooter>
            <div className="d-flex gap-2">
                <Button type="submit" form="category-form" color="primary">Save</Button>
                <Button color="muted" onClick={toggle}>Close</Button>
            </div>
        </ModalFooter>
    </>
}

export default AddModal

import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, FormText, Input, Label, Row} from "reactstrap";
import classNames from "classnames";
import Logo from "../../assets/react.svg";
import {useNavigate} from 'react-router-dom'
import { GoogleLogin ,GoogleOAuthProvider } from '@react-oauth/google';

const Register = () => {
    const naviagte = useNavigate()
    const {handleSubmit, control, formState:{errors}} = useForm()


    const onSubmit = async (values) => {
        try {
            const data = await axios.post(`${import.meta.env.VITE_APP_BASE_API_URL}login`,values)
            localStorage.setItem('token', data?.data?.data?.token)
            naviagte('/')
        }catch (e) {
            alert('Xeta')
        }
    }

    const PasswordInput = ({field:{value, onChange}}) => {
        return <div className="mt-2">
            <Label htmlFor="password">Password</Label>
            <Input name="password" type="password" onChange={onChange} value={value} className={classNames({
                'is-invalid': errors?.password
            })}/>
            <FormText color="danger">
                {errors?.password?.message}
            </FormText>
        </div>
    }

    return (
        <div className="container">
            <Row className="justify-content-center mt-5">
                <Col sm={12} md={4}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="fw-bold">Form</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <img src={Logo} alt="Image"/>
                            <GoogleOAuthProvider clientId="<your_client_id>">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />;
                            </GoogleOAuthProvider>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Controller render={({field:{value,onChange}}) => (
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input name="email" onChange={onChange} value={value}/>
                                    </div>
                                )} name="email" control={control}/>
                                <Controller rules={{
                                    required: true
                                }} render={PasswordInput} name="password" control={control}/>
                                <Button color="success w-100 mt-2">Submit</Button>
                            </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Register

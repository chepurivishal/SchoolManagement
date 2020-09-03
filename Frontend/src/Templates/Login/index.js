import React, { useContext, useState } from 'react';
import LoginContext from '../../context/loginContext';
import { useHistory } from 'react-router-dom';
import {
    Card,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    InputGroupAddon,
    InputGroup,
    InputGroupText,
    Alert,
    CardText
} from 'reactstrap';


const urlconfig = require('../../Config/urlConfig.json');
const config = require('../../Config/config.json');


const Login = (props) => {
    const history = useHistory();
    const { isLoggedIn, toggleLogIn } = useContext(LoginContext);
    let [userName, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let [isAdmin,setAdmin] = useState(true);
    const inputs = ["username", "password"];
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(true);

    const changeUserName = (e) => {
        setUserName(userName = e.target.value);
    }

    const changePassword = (e) => {
        setPassword(password = e.target.value);
    };

    const getRole = () => {
        return isAdmin? "Admin": "Parent";
    };

    const submitLogin = () => {
        let body = {
            userName: userName,
            password: password
        };
        if(isAdmin) body.type = "Admin";
        else body.type = "Parent";
        body = JSON.stringify(body);
        fetch(`${config.baseURL}${urlconfig.login.uri}`, {
            method: urlconfig.login.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then((res) => {
                inputs.forEach((input) => {
                    document.getElementById(input).value = "";
                });
                if (res.status === 200) {
                    return res.json();
                } else {
                    setIsLoginSuccessful(false);
                }
            })
            .then((response) => {
                if(response) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('type', getRole());
                    toggleLogIn();
                    if(isAdmin){
                        history.push('/classes');
                    }else{
                        history.push(`/parent/${response.student._id}`);
                    }
                }
            });
    };

    return (
        <div>
            <br />
            <br />
            <br />
            <Row>
                <Col xs="4"></Col>
                <Col xs="4">
                    <Card>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>USERNAME</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="username" placeholder="USERNAME" id="username" onChange={changeUserName} autoComplete="off" />
                                    </InputGroup>
                                    <br />
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>PASSWORD</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" name="password" placeholder="PASSWORD" id="password" onChange={changePassword} />
                                    </InputGroup>
                                    <br/>
                                    <InputGroup size = "sm">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                            {
                                                isAdmin?
                                                <Input addon type = "checkbox"  onChange = {() => setAdmin(!isAdmin)} checked/>
                                                :
                                                <Input addon type = "checkbox"  onChange = {() => setAdmin(!isAdmin)}/>

                                            }
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    <Input placeholder = "ADMIN" disabled/>
                                    </InputGroup>

                                    <br />
                                    <Button color="info" block onClick={submitLogin}> LOGIN</Button>
                                </FormGroup>
                            </Form>
                            {
                                !isLoginSuccessful? <Alert color = "danger"> Invalid Credentials!!</Alert> : <React.Fragment/>
                            }
                            <hr/>
                            <CardText>
                                <p>UNCHECK THE CHECK BOX TO LOGIN AS PARENT</p>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="4"></Col>
            </Row>
        </div>

    )
}

export default Login;
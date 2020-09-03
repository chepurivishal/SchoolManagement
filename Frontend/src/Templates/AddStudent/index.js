import React, { useState } from 'react';
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
    Container,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap'

const config = require('../../Config/config.json');
const urlConfig = require('../../Config/urlConfig.json');

const AddStudent = ({ match }) => {
    let [name, setName] = useState('');
    let [section, setSection] = useState('');
    let [dob, setDob] = useState('');
    let [academicYear, setAcademicYear] = useState('');
    let [_class, setClass] = useState('');
    let [ParentName, setParentName] = useState('');
    let [email, setEmail] = useState('');
    let [mobileNumber, setMobileNumber] = useState('');
    let [feeNeedTobePaid, setFeeNeedTobePaid] = useState('');
    const history = useHistory();

    const changeName = (e) => {
        setName(name = e.target.value);
    }

    const changeSection = (e) => {
        setSection(section = e.target.value)
    }

    const changeClass = (e) => {
        setClass(_class = e.target.value);
    }

    const changeDob = (e) => {
        setDob(dob = e.target.value);
    }

    const changeAcademicYear = (e) => {
        setAcademicYear(academicYear = e.target.value);
    }

    const changeParentName = (e) => {
        setParentName(ParentName = e.target.value);
    }

    const changeEmail = (e) => {
        setEmail(email = e.target.value);
    }
    const changeMobileNumber = (e) => {
        setMobileNumber(mobileNumber = e.target.value);
    }

    const changeFeeNeedToBePaid = (e) => {
        setFeeNeedTobePaid(feeNeedTobePaid = e.target.value);
    }

    const getToken = () => localStorage.getItem("token");
    const getRole = () => localStorage.getItem("type");

    const addStudent = (parentId) => {
        let body = JSON.stringify({
            name: name,
            dob: dob,
            academicYear: parseInt(academicYear),
            parent: parentId,
            class: match.params.id,
            feeNeedTobePaid: parseInt(feeNeedTobePaid)
        });
        const token = getToken();

        fetch(`${config.baseURL}${urlConfig.addstudent.uri}`, {
            method: urlConfig.addstudent.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
                'type': getRole()
            },
            body: body
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(() => {
            history.push(`/students/${match.params.id}`);
        });
    }

    const handleSubmit = () => {
        const token = getToken();
        let body = JSON.stringify({
            name: ParentName,
            mobile: mobileNumber,
            email: email
        });

        fetch(`${config.baseURL}${urlConfig.addparent.uri}`, {
            method: urlConfig.addparent.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
                'type': getRole()
            },
            body: body
        }).then((res) => {
            if (res.status === 200) {
                return res.json()
            }
        }).then(function(response) {
            console.log("dsafdsfasfasdfadsfasfdsa", response);
            addStudent(response._id);
        })
    };

    return (
        <div>
            <br />
            <Container>
                <Row>
                    <Col xs="2"></Col>
                    <Col xs="8">
                        <Card>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <InputGroup size="sm">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Name</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="NAME"
                                                onChange={changeName}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>D.O.B</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="dob"
                                                id="dob"
                                                placeholder="DATE OF BIRTH"
                                                onChange={changeDob}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>ParentName</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="parentname"
                                                id="parentname"
                                                placeholder="PARENT NAME"
                                                onChange={changeParentName}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>MobileNumber</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="mobilenumber"
                                                id="mobilenumber"
                                                placeholder="MOBILE NUMBER"
                                                onChange={changeMobileNumber}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Email</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="email"
                                                id="email"
                                                placeholder="EMAIL"
                                                onChange={changeEmail}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Academic Year</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="number"
                                                name="academicyear"
                                                id="academicyear"
                                                placeholder="ACADEMIC YEAR"
                                                onChange={changeAcademicYear}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Fees Due</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="number"
                                                name="feedue"
                                                id="feedue"
                                                placeholder="FEE DUE"
                                                onChange={changeFeeNeedToBePaid}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        <hr />
                                        <Row>
                                            <Col xs="6">
                                                <Button block color="info" onClick={() => handleSubmit()}> ADD</Button>
                                            </Col>
                                            <Col xs="6">
                                                <Button block color="danger" onClick={() => { history.push(`/students/${match.params.id}`) }}> CANCEL</Button>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="2"></Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddStudent;
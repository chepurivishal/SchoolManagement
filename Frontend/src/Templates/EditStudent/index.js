import React, { useState, useEffect } from 'react';
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
} from 'reactstrap';

const config = require('../../Config/config.json');
const urlConfig = require('../../Config/urlConfig.json');

const EditStudent = ({ match }) => {
    let [name, setName] = useState('');
    let [section, setSection] = useState('');
    let [dob, setDob] = useState(0);
    let [academicYear, setAcademicYear] = useState('');
    let [_class, setClass] = useState('');
    let [ParentName, setParentName] = useState('');
    let [email, setEmail] = useState('');
    let [mobileNumber, setMobileNumber] = useState(0);
    let [feeNeedTobePaid, setFeeNeedTobePaid] = useState('');
    let [parentId, setParentId] = useState('');
    let [classId, setClassId] = useState('');
    let [studentId, setStudentId] = useState('');
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    const history = useHistory();

    const changeName = (e) => {
        setName(name = e.target.value);
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

    const handleSubmit = () => {
        let body = JSON.stringify({
            name: ParentName,
            mobile: mobileNumber,
            email: email
        });
        const token = getToken();
        let url = `${config.baseURL}${urlConfig.editparent.uri}`;
        url = url.replace(":id", parentId)

        fetch(url, {
            method: urlConfig.editparent.method,
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
        }).then((res) => {
            editStudent()
        });
    };
    const editStudent = () => {
        const token = getToken();
        let body = JSON.stringify({
            name: name,
            dob: parseInt(dob),
            academicYear: parseInt(academicYear),
            parent: parentId,
            class: classId,
            feeNeedTobePaid: parseInt(feeNeedTobePaid)
        });
        let url = `${config.baseURL}${urlConfig.editstudent.uri}`;
        url = url.replace(":id", studentId)

        fetch(url, {
            method: urlConfig.editstudent.method,
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
        }).then(function (response) {
            history.push(`/students/${classId}`);
        })
    }
    const fetchStudent = (id) => {
        const token = getToken();
        let url = `${config.baseURL}${urlConfig.getstudent.uri}`;
        url = url.replace(":id", id);
        fetch(url, {
            method: urlConfig.getstudent.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
                'type': getRole()
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((response) => {
            if (response) {
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@", response);
                setName(response.name);
                setDob(response.dob);
                setParentName(response.parent.name);
                setEmail(response.parent.email)
                setAcademicYear(response.academicYear);
                setFeeNeedTobePaid(response.feeNeedTobePaid);
                setMobileNumber(response.parent.mobile)
                setStudentId(response._id);
                setParentId(response.parent._id);
                setClassId(response.class._id);
                setUserName(response.parent.role.username);
                setPassword(response.parent.role.password);
            }
        });
    };

    useEffect(() => {
        fetchStudent(match.params.id);
    }, []);

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
                                                value={name}
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
                                                value={dob}
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
                                                value={ParentName}
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
                                                value={mobileNumber}
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
                                                value={email}
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
                                                value={academicYear}
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
                                                value={feeNeedTobePaid}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>USERNAME</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                value={username}
                                                disabled
                                            />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>PASSWORD</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                value={password}
                                                disabled
                                            />
                                        </InputGroup>
                                        <hr />
                                        <Row>
                                            <Col xs="6">
                                                <Button block color="info" onClick={() => handleSubmit()}> ADD</Button>
                                            </Col>
                                            <Col xs="6">
                                                <Button block color="danger" onClick={() => { history.push(`/students/${classId}`) }}> CANCEL</Button>
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

export default EditStudent;
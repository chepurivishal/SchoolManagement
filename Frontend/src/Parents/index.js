import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    Button,
    Form,
    FormGroup,
    Input,
    Row,
    Col,
    Container,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';


const config = require('../Config/config.json');
const urlConfig = require('../Config/urlConfig.json');


const Parent = ({ match }) => {
    let [name, setName] = useState('');
    let [dob, setDob] = useState(0);
    let [academicYear, setAcademicYear] = useState('');
    let [_class, setClass] = useState('');
    let [ParentName, setParentName] = useState('');
    let [email, setEmail] = useState('');
    let [mobileNumber, setMobileNumber] = useState(0);
    let [feeNeedTobePaid, setFeeNeedTobePaid] = useState('');
    let [amount,updateAmount] = useState(0);

    const amountChange = (e)=> {
        updateAmount(amount = e.target.value)
    };

    const getToken = () => localStorage.getItem("token");
    const getRole = () => localStorage.getItem("type");

    const fetchStudent = (id) => {
        const token = getToken();
        let url = `${config.baseURL}${urlConfig.getstudent.uri}`;
        url = url.replace(":id", id);
        fetch(url, {
            method: urlConfig.getstudent.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
                'type': 'Admin'
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((response) => {
            if (response) {
                console.log('@@@@@@@@@@@@', response)
                setName(response.name);
                setDob(response.dob);
                setParentName(response.parent.name);
                setEmail(response.parent.email)
                setAcademicYear(response.academicYear);
                setFeeNeedTobePaid(response.feeNeedTobePaid);
                setMobileNumber(response.parent.mobile)
            }
        });
    };

    const handlePayment = () => {
        let body = JSON.stringify({
            amount : amount,
            studentId : match.params.id
        });
        const token = getToken();
        let url = `${config.baseURL}${urlConfig.addtransaction.uri}`;
        fetch(url, {
            method: urlConfig.addtransaction.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
                'type': 'Admin'
            },
            body : body
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((res)=>{
            updateStudent()
        });
        
    }

    const updateStudent = () => {
        const token = getToken();
        const studentId = match.params.id;
        let body = JSON.stringify({
            feeNeedTobePaid: parseInt(feeNeedTobePaid)-amount
        });
        let url = `${config.baseURL}${urlConfig.editstudent.uri}`;
        url = url.replace(":id",studentId)

        fetch(url, {
            method: urlConfig.editstudent.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
                'type': "Admin"
            },
            body: body
        }).then((res) => {
            if (res.status === 200) {
                return res.json()
            }
        }).then(function() {
            window.location.reload();
            alert(`Payment for student Id ${match.params.id} of amount ${amount} is successful!!`);
        });

    }

    useEffect(() => {
        fetchStudent(match.params.id);
    }, []);
    return (
        <div>
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
                                                autoComplete="off"
                                                value={name}
                                                disabled
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
                                                value={dob}
                                                autoComplete="off"
                                                disabled
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
                                                value={ParentName}
                                                autoComplete="off"
                                                disabled
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
                                                value={mobileNumber}
                                                autoComplete="off"
                                                disabled
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
                                                value={email}
                                                autoComplete="off"
                                                disabled
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
                                                value={academicYear}
                                                autoComplete="off"
                                                disabled
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
                                                value={feeNeedTobePaid}
                                                autoComplete="off"
                                                disabled
                                            />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Pay</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="number"
                                                name="pay"
                                                id="pay"
                                                placeholder="PAY"
                                                onChange = {amountChange}
                                                value = {amount}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        <hr />
                                        <Button block color="info" size="sm" onClick ={()=> handlePayment()} >Fee Payment</Button>
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
export default Parent;
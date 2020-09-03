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

const AddClass = () => {
    let [_class, setClass] = useState('');
    let [section, setSection] = useState('');
    let [academicYear, setAcademicYear] = useState('');
    let [fee, setFee] = useState('');
    const history = useHistory();

    const changeClass = (e) => {
        setClass(_class = e.target.value);
    }

    const changeSection = (e) => {
        setSection(section = e.target.value);
    }

    const changeAcademicYear = (e) => {
        setAcademicYear(academicYear = e.target.value);
    }

    const changeFee = (e) => {
        setFee(fee = e.target.value);
    }

    const getToken = () => localStorage.getItem("token");
    const getRole = () => localStorage.getItem("type");

    const handleSubmit = () => {
        let body = JSON.stringify({
            class : _class,
            section : section,
            academicYear :parseInt(academicYear),
            fee : parseInt(fee)
        });
        const token = getToken();

        fetch(`${config.baseURL}${urlConfig.addclass.uri}`, {
            method: urlConfig.addclass.method,
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
            history.push("/classes");
        });
    };

    return (
        <div>
            <br />
            <br />
            <Container>
                <Row>
                    <Col xs="2"></Col>
                    <Col xs="8">
                        <Card>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Class</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="class"
                                                id="class"
                                                placeholder="CLASS"
                                                onChange={changeClass}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        <hr />
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Section</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="section"
                                                id="section"
                                                placeholder="SECTION"
                                                onChange={changeSection}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        <hr/>
                                        <InputGroup>
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
                                        <hr/>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Fee</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="number"
                                                name="fee"
                                                id="fee"
                                                placeholder="FEE"
                                                onChange={changeFee}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        <hr />
                                        <Row>
                                            <Col xs="6">
                                                <Button block color="info" onClick={() => handleSubmit()}> ADD</Button>
                                            </Col>
                                            <Col xs="6">
                                                <Button block color="danger" onClick={() => { history.push('/Classes') }}> CANCEL</Button>
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

export default AddClass;
import React, { useState,useEffect } from 'react';
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

const EditClass = ({match}) => {
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

    const handleSubmit = (id) => {
        let body = JSON.stringify({
            class : _class,
            section : section,
            academicYear :parseInt(academicYear),
            fee : parseInt(fee)
        });
        const token = getToken();
        let url = `${config.baseURL}${urlConfig.editclass.uri}`;
        url = url.replace(":id",id)
        fetch(url, {
            method: urlConfig.editclass.method,
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
        }).then((response) => {
            history.push("/classes");
        });
    };
    const fetchClass = (id) => {
        const token = getToken();
        let url = `${config.baseURL}${urlConfig.getclass.uri}`;
        url = url.replace(":id", id);
        console.log('@@@@@@@',id ,url   );
        fetch(url, {
            method: urlConfig.getclass.method,
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
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@',response)
                setClass(response.class);
                setSection(response.section);
                setAcademicYear(response.academicYear);
                setFee(response.fee);
            }
        });
    };

    useEffect(() => {
        fetchClass(match.params.id);
    }, []);

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
                                                value ={_class}
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
                                                value = {section}
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
                                                value = {academicYear}
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
                                                value = {fee}
                                                autoComplete="off"
                                            />
                                        </InputGroup>
                                        <hr />
                                        <Row>
                                            <Col xs="6">
                                                <Button block color="info" onClick={() => handleSubmit(match.params.id)}> Save</Button>
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

export default EditClass;
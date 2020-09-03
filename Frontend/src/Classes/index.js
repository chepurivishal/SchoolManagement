import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Button, Row, Col, ButtonGroup, CardBody, Card, Container, CardText } from 'reactstrap';
const _ = require('lodash');

const config = require('../Config/config.json');
const urlConfig = require('../Config/urlConfig.json');
const Classes = () => {
    let [_classes, _updateClass] = useState([]);
    const getToken = () => localStorage.getItem("token");
    const getRole = () => localStorage.getItem("type");
    const history = useHistory();
    

    useEffect(() => {
        fetchClass()
    }, [])
    const fetchClass = () => {
        let token = getToken();
        let url = `${config.baseURL}${urlConfig.getclasses.uri}`;

        fetch(url, {
            method: urlConfig.getclasses.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
                'type': getRole()
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                history.push('/login');
            }
        }).then((response) => {
            _updateClass(response);
        });
    };
    const deleteClass = (id) => {
        const token = getToken();
        let url = `${config.baseURL}${urlConfig.deleteclass.uri}`;
        url = url.replace(":id", id);
        fetch(url, {
            method: urlConfig.deleteclass.method,
            headers: {
                'Context-Type': 'application/json',
                'Authorization': `bearer ${token}`,
                'type': getRole()
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((response) => {
            let classesClone = _.clone(_classes);
            _.remove(classesClone, (_class) => {
                if (_class._id === id) return true;
            });
            _updateClass(_classes = classesClone);
        });
    };

    return (
        <div>
            <br />
            <Container>
                <Row>
                    <Col xs="10">
                        <Card>
                            <CardBody>
                                <Table hover>
                                    <thead>
                                        <tr scope="row" >
                                            <th>Class</th>
                                            <th>Section</th>
                                            <th>Academic Year</th>
                                            <th>Fee</th>
                                            <th>Actions</th>
                                        </tr>
                                        <br />
                                    </thead>
                                    <tbody>
                                        {
                                            _classes.map((_class) => {
                                                return (
                                                    <React.Fragment>
                                                        <tr >
                                                            <td>{_class.class}</td>
                                                            <td>{_class.section}</td>
                                                            <td>{_class.academicYear}</td>
                                                            <td>{_class.fee}</td>

                                                            <td>
                                                                <Row>
                                                                    <ButtonGroup>
                                                                        <Button size="sm" color="info" onClick={() => history.push(`/students/${_class._id}`)} > Students</Button>
                                                                        <Button color="info" size="sm" onClick={() => history.push(`/editclass/${_class._id}`)}>edit</Button>
                                                                        <Button color="danger" size="sm" onClick={() => deleteClass(_class._id)} >delete</Button>
                                                                    </ButtonGroup>
                                                                </Row>
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                );
                                            })
                                        }
                                    </tbody>

                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="2">
                        <Card>
                            <CardBody>
                                <CardText>
                                    Click Below to add new Class!!
                                </CardText>
                                <hr />
                                <Button color="info" size="sm" onClick={() => history.push('/addclass')}> New Class</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    )
};

export default Classes;
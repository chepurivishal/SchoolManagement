import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Button, Row, Col, CardBody, Card, Container, CardText } from 'reactstrap';
const _ = require('lodash');

const config = require('../Config/config.json');
const urlConfig = require('../Config/urlConfig.json');

const Students = ({ match }) => {
    let [students, updateStudents] = useState([]);
    const getToken = () => localStorage.getItem("token");
    const getRole = () => localStorage.getItem("type");
    const history = useHistory();

    const objToQueryString = (obj) => {
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    };


    useEffect(() => {
        fetchStudents();
    }, [])
    const fetchStudents = () => {
        const classId = match.params.id;
        let token = getToken();
        let role = getRole();
        let url = `${config.baseURL}${urlConfig.getstudents.uri}`;
        let queryParams = {
            class: classId
        }
        url = `${url}?${objToQueryString(queryParams)}`;

        return fetch(url, {
            method: urlConfig.getstudents.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
                'type': role
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                history.push('/login');
            }
        }).then((response) => {
            updateStudents(response);
        });
    };
    const deleteStudent = (id) => {
        const token = getToken();
        let url = `${config.baseURL}${urlConfig.deletestudent.uri}`;
        url = url.replace(":id", id);
        fetch(url, {
            method: urlConfig.deletestudent.method,
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
            let studentsClone = _.clone(students);
            _.remove(studentsClone, (student) => {
                if (student._id === id) return true;
            });
            updateStudents(students = studentsClone);
        });
    };

    return (
        <div>
        <br/>
            <Container>
                <Row>
                    <Col xs="10">
                        <Card>
                            <CardBody>
                                <Table hover>
                                    <thead>
                                        <tr scope="row" >
                                            <th>Name</th>
                                            <th>Academic Year</th>
                                            <th>Class</th>
                                            <th>Section</th>
                                            <th>Parent</th>
                                            <th>Actions</th>
                                        </tr>
                                        <br />
                                    </thead>
                                    <tbody>
                                        {
                                            students.map((student) => {
                                                return (
                                                    <React.Fragment>
                                                        <tr>
                                                            <td>{student.name}</td>
                                                            <td>{student.academicYear}</td>
                                                            <td>{student.class.class}</td>
                                                            <td>{student.class.section}</td>
                                                            <td>{student.parent.name}</td>

                                                            <td>
                                                                <Row>
                                                                    <Col xs="3">
                                                                        <Button color="info" size="sm" onClick={() => history.push(`/editstudent/${student._id}`)}>edit</Button>
                                                                    </Col>
                                                                    <Button color="danger" size="sm" onClick={() => deleteStudent(student._id)} >delete</Button>
                                                                    <Col xs="9"></Col>
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
                                    Click below to add new Student!!
                                </CardText>
                                <hr/>
                                <Button color="info" size="sm" onClick={() => history.push(`/${match.params.id}/addstudent`)}> New Student</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    )
};

export default Students;
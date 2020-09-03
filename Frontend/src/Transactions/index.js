import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Container, Card, CardBody } from 'reactstrap';

const config = require('../Config/config.json');
const urlConfig = require('../Config/urlConfig.json');
const moment = require("moment");

const Transactions = () => {

    let [Transactions, setTransactions] = useState([]);
    const getToken = () => localStorage.getItem("token");
    const getRole = () => localStorage.getItem("type");

    const FetchTransactions = () => {
        let url = `${config.baseURL}${urlConfig.gettransactions.uri}`;
        const token = getToken();
        fetch(url, {
            method: urlConfig.gettransactions.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
                'type': getRole()
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json()
            }
        }).then((res) => {
            setTransactions(res);
        });
    };
    useEffect(() => {
        FetchTransactions()
    }, [])
    return (
        <Container>
            <Card>
                <CardBody>
                    <Table hover>
                        <thead>
                            <tr scope="row" >
                                <th>Student Name</th>
                                <th>Amount</th>
                                <th>Time</th>
                            </tr>
                            <br />
                        </thead>
                        <tbody>
                            {
                                Transactions.map((transaction) => {
                                    return (
                                        <React.Fragment>
                                            <tr>
                                                <td>{transaction.student.name}</td>
                                                <td>{transaction.amount}</td>
                                                <td>{moment(transaction.time).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>

        </Container>
    )
};

export default Transactions;
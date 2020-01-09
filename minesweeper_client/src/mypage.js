import React, { Component } from "react";

import "./styles.css";
import {gql} from "apollo-boost";

import {Col, Container, Row, Table} from 'react-bootstrap';

class MyPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: 'null',
            email: 'null'
        };

        this.getUserInfo();
    }

    getUserInfo = async () => {
        let token = window.sessionStorage.getItem("token");

        const QUERY = gql`
            query {
                me{
                    username
                    email
                }
            }
        `;

        const {data} = await this.props.client.query({
            query: QUERY,
            context: {
                // example of setting the headers with context per operation
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        });

        this.setState({
            username: data.me.username,
            email: data.me.email
        });
    };

    render(){
        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>항목 명</th>
                                    <th>항목 값</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>유저 이름</td>
                                    <td>{this.state.username}</td>
                                </tr>
                                <tr>
                                    <td>이메일</td>
                                    <td>{this.state.email}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default MyPage;

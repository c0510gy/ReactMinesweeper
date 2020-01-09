import React, { Component } from "react";

import "./styles.css";

import { Button, Form, Col, Container, Row } from 'react-bootstrap';

import { gql } from "apollo-boost";

class Login extends Component {
    constructor(props) {
        super(props);
        let token = window.sessionStorage.getItem("token");
        this.state = {
            token: token
        };
    }

    login = async (id, password) => {
        const LOGIN_QUERY = gql`
            query {
                authenticate(username: "${id}", password: "${password}")
            }
        `;
        console.log(LOGIN_QUERY);
        const {data} = await this.props.client.query({
            query: LOGIN_QUERY
        });

        let token = await data.authenticate;

        //console.log('쿼리: ', data);
        this.setState({
            token: token
        });

        if(token === null)
            window.sessionStorage.removeItem("token");
        else
            window.sessionStorage.setItem("token", token);

        window.location.reload(false);
    };

    handleSubmit = event => {
        let id = event.target.id.value;
        let pw = event.target.pw.value;
        console.log(id, pw);
        this.login(id, pw);

        event.preventDefault();
    };

    logout = event => {
        sessionStorage.removeItem("token");
        window.location.reload(false);
    };

    render() {
        return (
            <div>
                {this.state.token === null
                    ? (<><h3>로그인</h3>
                        <p>기본 id: user, pw: 123</p>
                        <Container>
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Form noValidate onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formHorizontalEmail">
                                        <Col>
                                            <Form.Control type="id" placeholder="Id" name="id"/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group controlId="formHorizontalPassword">
                                        <Col>
                                            <Form.Control type="password" placeholder="Password" name="pw"/>
                                        </Col>
                                    </Form.Group>
                                    <Button type="submit">Log In</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container></>)
                    : <a onClick={this.logout}>로그아웃</a>
                }
                <br />
            </div>
        );
    }웃
}

export default Login;

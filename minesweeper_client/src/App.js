import React, { Component } from 'react';
import logo from './logo.svg';

import Mainpage from './mainpage';
import Login from './login';

import "./styles.css";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
    uri: "http://localhost:4000"
});

class App extends Component {
    initializeUserInfo = async () => {
        let token = window.sessionStorage.getItem("token");
        this.setState({
            token: token
        });
        //window.sessionStorage.setItem("key", "hello, key");
        //console.log(window.sessionStorage.getItem("k"));
    };

    constructor(props) {
        super(props);

        this.initializeUserInfo();

        this.state = {
            token: null
        };
    }

    checkSession = () => {
        let token = window.sessionStorage.getItem("token");

        this.state = {
            token: token
        };
    };

    render() {
        this.checkSession();
        return (
            <div className="App">
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous"
                />

                <h1>Minesweeper</h1>
                <Login client={client} />
                <ApolloProvider client={client}>
                    {this.state.token != null && <div><Mainpage client={client} /></div>}
                </ApolloProvider>
            </div>
        );
    };
}

export default App;

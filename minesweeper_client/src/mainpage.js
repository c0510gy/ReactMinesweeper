import React, { Component } from "react";

import "./styles.css";

import Selector from './selector';
import MyPage from './mypage';
import Ranking from './ranking';

import {Button, ButtonGroup} from 'react-bootstrap';

class Mainpage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            select: "-1"
        };
    }

    clickHandler = event => {
        let item_num = event.target.attributes.getNamedItem("item_num").value;
        this.setState({
            select: item_num
        });
    };

    render() {

        return (
            <div>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="primary" item_num="-1" onClick={this.clickHandler}>Home</Button>
                    <Button variant="primary" item_num="0" onClick={this.clickHandler}>Start Game</Button>
                    <Button variant="primary" item_num="1" onClick={this.clickHandler}>MyPage</Button>
                    <Button variant="primary" item_num="2" onClick={this.clickHandler}>Ranking</Button>
                </ButtonGroup>
                <br/><br/>

                { this.state.select === "-1" && <p>세상에 Minesweeper보다 완벽한 게임이 또 있을까요? 전 이렇게 생각합니다..</p> }
                { this.state.select === "0" && <div><Selector client={this.props.client} /></div> }
                { this.state.select === "1" && <div><MyPage client={this.props.client} /></div> }
                { this.state.select === "2" && <div><Ranking client={this.props.client} /></div> }
            </div>
        );
    }
}

export default Mainpage;

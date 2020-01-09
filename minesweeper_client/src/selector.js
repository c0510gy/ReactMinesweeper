import React, { Component } from "react";

import Minesweeper from "./minesweeper";

import "./styles.css";

import Timer from "react-compound-timer";

class Selector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: "삽"
        };
    }

    toggle = event => {
        if (event.target.innerHTML === "삽") {
            this.setState({
                toggle: "깃발"
            });
        } else {
            this.setState({
                toggle: "삽"
            });
        }
    };

    render() {
        return (
            <div>
                <h3>상건이는 Minesweeper가 좋아요</h3>
                <br/>
                <div id="timer">
                    {<Timer>
                        <Timer.Seconds />
                    </Timer>}
                </div>
                <br/><br/>
                <b>삽</b> 또는 <b>깃발</b>:&nbsp;
                <button className="Toggle" onClick={this.toggle}>
                    {this.state.toggle}
                </button>
                <br /> <br />
                <div>
                    <Minesweeper selector={this.state.toggle}/>
                </div>
            </div>
        );
    }
}

export default Selector;

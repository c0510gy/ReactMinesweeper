import React, { Component } from "react";

import "./styles.css";

class Minesweeper extends Component {
    constructor(props) {
        super(props);

        let width = 10;
        let height = 10;

        let minesRate = 0.1;
        let numOfMines = Math.floor(width * height * minesRate);

        let mine = [];
        let cnt = [];
        let revealed = [];
        let flagged = [];

        for (let y = 0; y < height; y++) {
            mine.push([]);
            cnt.push([]);
            revealed.push([]);
            flagged.push([]);
            for (let x = 0; x < width; x++) {
                mine[y].push(0);
                cnt[y].push(0);
                revealed[y].push(false);
                flagged[y].push(false);
            }
        }

        for (let j = 0; j < numOfMines; ) {
            let x = Math.floor(Math.random() * width);
            let y = Math.floor(Math.random() * height);
            if (mine[y][x] === 0) {
                mine[y][x] = 1;
                j++;
            }
        }

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                cnt[y][x] = 0;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dx === 0 && dy === 0) continue;
                        if (x + dx < 0 || x + dx >= width || y + dy < 0 || y + dy >= height)
                            continue;

                        cnt[y][x] += mine[y + dy][x + dx];
                    }
                }
            }
        }

        this.state = {
            list: [],
            text: "",
            width: width,
            height: height,
            mine: mine,
            cnt: cnt,
            revealed: revealed,
            flagged: flagged
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        //this.removeItem = this.removeItem.bind(this);

        this.dir = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [1, 1],
            [-1, 1],
            [1, -1],
            [-1, -1]
        ];
    }

    mineDFS = (x, y) => {
        const newRevealed = this.state.revealed.slice();
        newRevealed[y][x] = true;
        this.setState({
            revealed: newRevealed
        });

        if (this.state.cnt[y][x] === 0) {
            for (let j = 0; j < this.dir.length; j++) {
                let nx = x + this.dir[j][0];
                let ny = y + this.dir[j][1];

                if (
                    nx < 0 ||
                    ny < 0 ||
                    nx >= this.state.width ||
                    ny >= this.state.height ||
                    this.state.revealed[ny][nx]
                ) {
                    continue;
                }
                this.mineDFS(nx, ny);
            }
        }
    };

    winChecker = () => {
        let ret = true;
        for (let y = 0; y < this.state.height; y++) {
            for (let x = 0; x < this.state.width; x++) {
                if (!this.state.mine[y][x] && !this.state.revealed[y][x]) {
                    ret = false;
                    break;
                }
            }
        }
        return ret;
    };

    clickHandler = event => {
        let x = event.target.attributes.getNamedItem("x").value;
        let y = event.target.attributes.getNamedItem("y").value;

        if (this.props.selector === "깃발") {
            const newFlagged = this.state.flagged.slice();
            newFlagged[y][x] = !newFlagged[y][x];
            this.setState({
                flagged: newFlagged
            });
            return;
        }

        if (this.state.flagged[y][x]) return;

        if (this.state.mine[y][x]) {
            alert("Game Over!");
            window.location.reload(false);
        }
        if (!this.state.mine[y][x] && this.state.cnt[y][x] === 0) {
            this.mineDFS(parseInt(x), parseInt(y));
        }
        const newRevealed = this.state.revealed.slice();
        newRevealed[y][x] = true;
        this.setState({
            revealed: newRevealed
        });

        if (this.winChecker()) {
            alert("You WIN!!");
            window.location.reload(false);
        }
    };

    render() {
        let buttons = [];

        for (let y = 0; y < this.state.height; y++) {
            for (let x = 0; x < this.state.width; x++) {
                buttons.push(
                    <button
                        x={x}
                        y={y}
                        className={
                            this.state.revealed[y][x]
                                ? "Grid Digged"
                                : this.state.flagged[y][x]
                                ? "Grid Flagged"
                                : "Grid"
                        }
                        onClick={this.clickHandler}
                    >
                        {this.state.revealed[y][x] === true
                            ? this.state.mine[y][x]
                                ? "x"
                                : this.state.cnt[y][x] > 0
                                    ? this.state.cnt[y][x] + ""
                                    : ""
                            : this.state.flagged[y][x]
                                ? "🚩"
                                : ""}
                    </button>
                );
            }
            buttons.push(<br />);
        }

        return <div>{buttons}</div>;
    }
}

export default Minesweeper;

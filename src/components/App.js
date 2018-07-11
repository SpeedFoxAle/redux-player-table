import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllData, setNameFilter, setPositionFilter, setAgeFilter } from '../actions'
import './App.css'

class App extends Component {
    componentDidMount() {
        this.props.getAllData();
    }

    filterByName(name) {
        if(name.length > 0) {
            this.props.setNameFilter(name);
        }
    }

    filterByAge(age) {
        if(age.length > 0) {
            this.props.setAgeFilter(age);
        }
    }

    filterByPosition(position) {
        if (position.length) {
            this.props.setPositionFilter(position);
        } 
    }

    render() {
        let rows = []
        this.props.fetched && this.props.players.forEach((player, index) => {
            rows.push(
                <tr key={index}>             
                    <td>{player.name}</td>
                    <td>{player.position}</td>
                    <td>{player.age}</td>
                </tr>
            );
        });

        return (
            <div className="App">
                <h3>Futboll player finder</h3>
                <div className="filters">
                    <input placeholder="Name" onChange={(event) => this.filterByName(event.target.value)}/>    
                    <select onChange={(event) => this.filterByPosition(event.target.value)}>
                        <option value="">select position</option>
                        <option value="Attacking-Midfield">Attacking Midfield</option>
                        <option value="Central-Midfield">Central Midfield</option>
                        <option value="Centre-Back">Centre Back</option>
                        <option value="Centre-Forward">Centre Forward</option>
                        <option value="Defensive-Midfield">Defensive Midfield</option>
                        <option value="Keeper">Keeper</option>
                        <option value="Left-Midfield">Left Midfield</option>
                        <option value="Left-Wing">Left Wing</option>
                        <option value="Left-Back">Left Back</option>
                        <option value="Right-Back">Right Back</option>
                    </select>
                    <input placeholder="Age" onChange={(event) => this.filterByAge(event.target.value)}/>    
                    <input type="button" value="Search" />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        players: state.fetchPlayer.players,
        fetched: state.fetchPlayer.fetched
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllData: bindActionCreators(getAllData, dispatch),
        setNameFilter: bindActionCreators(setNameFilter, dispatch),
        setPositionFilter: bindActionCreators(setPositionFilter, dispatch),
        setAgeFilter: bindActionCreators(setAgeFilter, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


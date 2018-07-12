import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllData, setNameFilter, setPositionFilter, setAgeFilter, searchByFilter } from '../actions'
import './App.css'

class App extends Component {
    componentDidMount() {
        this.props.getAllData();
    }

    searchByFilter(filter, typeSearch) {
        if(filter.length > 0) {
            this.props.searchByFilter(filter, typeSearch);
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
                    <input placeholder="Name" onChange={(event) => this.searchByFilter(event.target.value, 'name')}/>    
                    <select onChange={(event) => this.searchByFilter(event.target.value, 'position')}>
                        <option value="">select position</option>
                        <option value="Attacking Midfield">Attacking Midfield</option>
                        <option value="Central Midfield">Central Midfield</option>
                        <option value="Centre-Back">Centre Back</option>
                        <option value="Centre-Forward">Centre Forward</option>
                        <option value="Defensive Midfield">Defensive Midfield</option>
                        <option value="Keeper">Keeper</option>
                        <option value="Left Midfield">Left Midfield</option>
                        <option value="Left Wing">Left Wing</option>
                        <option value="Left-Back">Left Back</option>
                        <option value="Right-Back">Right Back</option>
                    </select>
                    <input placeholder="Age" onChange={(event) => this.searchByFilter(event.target.value, 'age')}/>    
                    <input type="button" value="Search" onClick={ (event) => window.alert("It's don't need it to search, just use the inputs")}/>
                </div>
                {
                    this.props.players && this.props.players.length > 0 ?
                        <table cellPadding="0" cellSpacing="2">
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
                        </table> :
                    <p>No player found, press Ctrl + R or F5 - (I know this suck xD)</p>
                }
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
        searchByFilter: bindActionCreators(searchByFilter, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


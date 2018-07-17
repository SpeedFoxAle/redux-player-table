import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllData, searchByFilter, clearFilter } from '../actions'
import './Table.css'

class Table extends Component {
    componentDidMount() {
        this.props.getAllData()
    }

    searchByFilter(filter, typeSearch) {
        if(filter.length > 0) {
            this.props.searchByFilter(filter, typeSearch)
        } 
    }

    clearAllFilters() {
        this.props.clearFilter()   
    }
    
    render() {
        let source = this.props.source,
            table = 
                this.props.fetched && this.props[source] && this.props[source].length > 0 ?
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props[source].map((player, index) => {
                                    return  <tr key={index}>
                                                <td>{player.name}</td>
                                                <td>{player.position}</td>
                                                <td>{player.age}</td>
                                            </tr>
                                }) 
                            }
                        </tbody>
                    </table> :
                <p>No Player Found T_T</p>
                
        return (
            <div className="table-wrapper" id="table-wrapper">
                <h3>Football Player Finder</h3>
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
                    <input type="button" value="Reset Filter" onClick={ () => this.clearAllFilters() }/>
                </div>
                {table}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        players: state.fetch.players,
        fetched: state.fetch.fetched,
        filteredPlayer: state.fetch.filteredPlayer,
        source: state.fetch.source,
        filters: state.fetch.filters
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllData: bindActionCreators(getAllData, dispatch),
        searchByFilter: bindActionCreators(searchByFilter, dispatch),
        clearFilter: bindActionCreators(clearFilter, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)


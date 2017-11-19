import React, {Component} from 'react';
import axios from 'axios';

import Header from './Header.js';
import Search from './Search.js';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class Team extends Component {

	constructor(props) {
		super(props)
		this.state = {
			 week: 0,
	     showWeek: '',
	     weeks: [],
	     teamData: [],
	     gotTeams: false
    }
			this.getTeamData = this.getTeamData.bind(this);
			this.getWeeks = this.getWeeks.bind(this);
			this.getTeams = this.getTeams.bind(this);
			this.onChange = this.onChange.bind(this);
    	this.onSubmit = this.onSubmit.bind(this);
    	this.renderWeeks = this.renderWeeks.bind(this);
    	// this.renderTeams = this.renderTeams.bind(this);
	}

	componentDidMount() {
		this.getWeeks();
	}

	getWeeks() {
		axios.get(`${this.props.url}/showWeek`)
		.then(res => {
			let current_week = Math.max(...res.data.weeks)
			console.log('current_week is ', current_week)
			this.setState({	week: current_week, weeks: res.data.weeks })
			this.getTeams();
		})
	}

	getTeams() {
		axios.get(`${this.props.url}/teamlist/${this.state.week}`)
		.then(res => {
			console.log('teams are ', res.data)
			this.setState({teams: res.data.teams, gotTeams: true })
			this.getTeamData();
		})
	}

	getTeamData() {
		console.log('url is ', this.props.url)
		const { teams, week } = this.state
		const url = this.props.url
		let teamCalls = [];
		let teamData = [];
		teams.forEach(function(team){
			teamCalls.push(axios(`${url}/${team}/${week}`))
		})
		axios.all(teamCalls)
		.then(res => {
			res.forEach(function(res){
				teamData.push(res.data)
				})
				this.setState({teamData: teamData, showWeek: this.state.week })
			})
	}

	renderWeeks() {
		const renderOptions = [];
		this.state.weeks.map(e => {
			renderOptions.push(
					<option key={e} value={e}>{e}</option>
				)
			return renderOptions;
		})
		return renderOptions;
	}

	onChange(e) {
		this.setState({
      [e.target.name]: e.target.value
		})
	}

	onSubmit(event) {
		event.preventDefault();
		this.getWeeks();
	}

	render() {
		return (
			<div className="oneWeekData">
				<Header />
				<div className="subHeader">
				<form className='viewSelect' onSubmit={this.onSubmit}>
				<div className="viewSelect-item">
				<label htmlFor='weekSelect'>Week:</label>
				<select className='select-values' id='weekSelect' name='week' value={this.state.week} onChange={this.onChange}>
							{this.renderWeeks()}
				</select>
				</div>
					<div className='submit'>
					<input className="submitButton" type='submit' value='Submit' />
					</div>
				</form>
				<Search />
				</div>

				<div className='playerTable'>
        <ReactTable
          data={this.state.teamData}
          columns={[
            {
              Header: `Team Air Yards Data for Week ${this.state.showWeek}`,
              columns: [
                {
                  Header: "Team",
                  accessor: "team"
                },
                {
                	Header: "Air Yards",
                	accessor: "tm_airyards",
									desc: true
                },
                {
                	Header: "Rec. Yards",
                	accessor: "rec_yards"
                },
                {
                	Header: "Receptions",
                	accessor: "rec"
                },
                {
                	Header: "Targets",
                	accessor: "tar"
                },
                {
                	Header: "YAC",
                	accessor: "yac"
                },
                {
                	Header: "Attempts",
                	accessor: "tm_att"
                }
              ]
            }
          ]}
          showPaginationBottom={false}
          showPaginationTop={true}
					className=" -highlight"
					defaultPageSize={10}
					defaultSortDesc={true}
        />
        </div>
      </div>
			)
	}
}

export default Team;

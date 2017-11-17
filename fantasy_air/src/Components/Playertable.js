import React, {Component} from 'react';
import axios from 'axios';

import Header from './Header.js';
import Search from './Search.js';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class Playertable extends Component {

	constructor(props) {
		super(props)
		this.state = {
	     position: 'All',
	     showWeek: '',
	     playerData: [],
	     weeks: [],
	     week: 0
    }
		this.getPlayerData = this.getPlayerData.bind(this);
		this.getWeeks = this.getWeeks.bind(this);
		this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderWeeks = this.renderWeeks.bind(this);
	}

	componentDidMount() {
		this.getWeeks();
	}

	getWeeks() {
		axios.get(`${this.props.url}/showWeek`)
		.then(res => {
			// console.log('weeks are', res.data.weeks)
			let current_week = Math.max(...res.data.weeks)
			console.log('current_week is ', current_week)
			this.setState({	week: current_week, weeks: res.data.weeks })
			this.getPlayerData();
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

	getPlayerData() {
		console.log(this.props.url)
		axios.get(`${this.props.url}/weeks/${this.state.week}`)
		.then(res => {
			this.setState({playerData: res.data, showWeek: this.state.week})
			}
		)
	}

	onChange(e) {
		this.setState({
      [e.target.name]: e.target.value
		})
	}

	onSubmit(event) {
		event.preventDefault();
		// /position/:position/:week
		if (this.state.position === 'All') {
			axios.get(`${this.props.url}/weeks/${this.state.week}`)
				.then(res => {
					console.log('res from submit weeks is ', res.data)
					this.setState({playerData: res.data, showWeek: this.state.week});
			})
		}
		else {
			axios.get(`${this.props.url}/position/${this.state.position}/${this.state.week}`)
				.then(res => {
					console.log('res from submit weeks with position is ', res.data)
					this.setState({playerData: res.data, showWeek: this.state.week});
			})
		}
	}

	render() {
		return (
			<div className="oneWeekData">
				<Header />
				<div className="subHeader">
				<form className='viewSelect' onSubmit={this.onSubmit}>
				<div className="viewSelect-item">
				<label htmlFor='positionSelect'>Position:</label>
				<select className='select-values' id='positionSelect' name='position' value={this.state.position} onChange={this.onChange}>
						<option defaultValue='all'>All</option>
						 <option value='WR'>WR</option>
						 <option value='TE'>TE</option>
						 <option value='WR'>RB</option>
				</select>
				</div>
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
          data={this.state.playerData}
          columns={[
            {
              Header: `Air Yards Data for Week ${this.state.showWeek}`,
              columns: [
                {
                  Header: "Full Name",
                  accessor: "full_name",
                  width: 150
                },
                {
                  Header: "Position",
                  accessor: "position"
                },
                {
                  Header: "Team",
                  accessor: "team"
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
                	Header: "Rec. Yards",
                	accessor: "rec_yards"
                },
                {
                	Header: "YAC",
                	accessor: "yac"
                },
                {
                	Header: "Air Yards",
                	accessor: "air_yards"
                },
                {
                	Header: "AYPT",
                	accessor: "aypt"
                },
                {
                	Header: "RACR",
                	accessor: "racr"
                },
                {
                	Header: "Team Attempts",
                	accessor: "tm_att"
                },
                {
                	Header: "Target Share",
                	accessor: "target_share"
                },
                {
                	Header: "Team Air Yards",
                	accessor: "tm_airyards"
                },
                {
                	Header: "MS Air Yards",
                	accessor: "ms_air_yards"
                },
                {
                	Header: "WOPR",
                	accessor: "wopr"
                },
              ]
            }
          ]}
          showPaginationBottom={false}
          showPaginationTop={true}
					className=" -highlight"
					defaultPageSize={10}
        />
        </div>
      </div>
			)
	}
}

export default Playertable;

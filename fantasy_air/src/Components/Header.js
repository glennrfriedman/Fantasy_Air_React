import React, {Component} from 'react';
// import { Link } from 'react-router-dom';

class Header extends Component {

	render(){
		return(
				<div className="header-container">
					<div className="logo">
						<h1>Fantasy Air</h1>
						<p><em>Fly Like a Champion</em></p>
					</div>
					<div className="header-links">
						<h3>Team Data</h3>
						<h3>Compare Players</h3>
						<h3>About Air Yards</h3>
					</div>
				</div>
			)
	}
}


export default Header;
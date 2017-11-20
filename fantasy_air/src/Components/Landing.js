import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/departure.png';

import Header from './Header.js';

class Landing extends Component {
render() {
	return(
		<div className="landingContainer">
			<div className="landingHeader">
						<div className="fantasyAir">Fantasy Air</div>
						<div><em>Fly Like a Champion</em></div>
						<img src={Logo} alt="Logo"/>
			</div>
			<div className="landingLinks">
				<div className="landingSection">
						<Link to="/players"><div>Player Data</div></Link>
						<p><em>See weekly air yards stats on every player in the NFL</em></p>
				</div>
				<div className="landingSection">
					<Link to="/teams"><div>Team Data</div></Link>
					<p><em>See weekly air yards stats for every team in the NFL</em></p>
				</div>
				<div className="landingSection">
					<Link to="/compare"><div>Compare Players</div></Link>
					<p><em>Compare players season-long air yards statistics</em></p>
				</div>
				<div className="landingSection">
					<Link to="/about"><div>About Air Yards</div></Link>
					<p><em>Air yards? Click here</em></p>
				</div>
			</div>
		</div>
		)
	}
}

export default Landing;
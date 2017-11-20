import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/departure.png';

// import Header from './Header.js';

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
						<Link to="/players"><div>Players</div></Link>
						<p><em>See weekly Air Yards stats for every pass catcher in the NFL</em></p>
				</div>
				<div className="landingSection">
					<Link to="/teams"><div>Teams</div></Link>
					<p><em>See weekly Air Yards stats for every team in the NFL</em></p>
				</div>
				<div className="landingSection">
					<Link to="/compare"><div>Compare</div></Link>
					<p><em>Compare season-long Air Yards stats by player</em></p>
				</div>
				<div className="landingSection">
					<Link to="/about"><div>About</div></Link>
					<p><em>Air Yards explained</em></p>
				</div>
			</div>
		</div>
		)
	}
}

export default Landing;
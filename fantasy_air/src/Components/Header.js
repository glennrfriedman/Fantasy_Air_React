import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

	render(){
		return(
				<div className="header-container">
					<div className="logo">
						<Link to="/"><h1>Fantasy Air</h1></Link>
						<p><em>Fly Like a Champion</em></p>
					</div>
					<div className="header-links">
						<Link to="/teams"><h3>Team Data</h3></Link>
						<Link to="/compare"><h3>Compare Players</h3></Link>
						<Link to="/about"><h3>About Air Yards</h3></Link>
					</div>
				</div>
			)
	}
}


export default Header;
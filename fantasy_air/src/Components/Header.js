import React, {Component} from 'react';
import Logo from '../Assets/departure.png';
import { Link } from 'react-router-dom';

class Header extends Component {

	render(){
		return(
				<div className="header-container">
					<div className="logo">
						<div className="logo-left">
						<Link to="/"><h1>Fantasy Air</h1></Link>
						<p><em>Fly Like a Champion</em></p>
						</div>
						<div className="logo-right">
						<img src={Logo} alt="Logo"/>
						</div>
					</div>
					<div className="header-links">
						<Link to="/players"><h3>Players</h3></Link>
						<Link to="/teams"><h3>Teams</h3></Link>
						<Link to="/compare"><h3>Compare</h3></Link>
						<Link to="/about"><h3>About</h3></Link>
					</div>
				</div>
			)
	}
}


export default Header;
import React, { Component } from 'react';

import Header from './Header.js';

class About extends Component {
render() {
	return(
		<div className="aboutContainer">
			<div className="aboutLinks">
			<Header />
			</div>
			<div className="aboutDesc">
				<div className="aboutHead">Glossary</div> 
				{/*<div className="intro">
					Welcome to the Fantasy glossary! Below you will find definitions and examples of all air yards terms represented on Fantasy Air. Read up, and fly like a champion!
				</div>*/}
				<div className='aboutAllStats'>
						<div className="aboutOneStat">
							<h3>Air Yards</h3>
							<p> Definition: Air yards measure receivers volumne or opportunity. Think of it this way, the higher the volume, the more likely a player is to turn that volume into fantasy points.</p>
							<p> Use it in a sentance: Wow, Alshon Jeffery has a TON of Air Yards but isn't converting them at a high rate. I wonder if he is a buy low candidate. </p>
							<p> Fly like a champion: Look for players with high air yards but make sure they have a high RACR as well. That means they're converting air yards to receiving yards at a high rate. Antyhing over 1 is great in this category. Especially for WR or TE. RB usually have a higher RACR. </p>
						</div>
						<div className="aboutOneStat">
							<h3>Market Share Air Yards ("MS Air Yards")</h3>
							<p> Definition: Market Share Air Yards measure the amount of team Air Yards a player receives. The higher this percentage the more this player is targeted down field compared to other players on the same team.</p>
							<p> Use it in a sentance: Antonio Brown has MS Air Yards of 46%...WHAT!?!? He has almost 50% of his teams total air yards for the season. This guy is a monster! </p>
							<p> Fly like a champion: High MS Air Yards percentage means higher opportunity for that player to produce yards down field. If you have a deep threat guy on your fantasy team with a high AYPT make sure his MS Air Yards are high too and that he's not just a guy who gets few opportunities but the opportunities he does get are deep. </p>
						</div>
						<div className="aboutOneStat">
							<h3>Targets</h3>
							<p> Definition: Targets measure how many times a receiver is passed to during a game. Like the other opportunity stats, the higher a player targets the more likely that player is to turn those targets into yards and receptions.</p>
							<p> Use it in a sentance: Keenan Allen had 13 targets and 12 receptions in week 11, that man is PPR gold! </p>
							<p> Fly like a champion: Like most of these stats, look for players with a lot of targets. Even if they're not turning those targets into fantasy points at the moment, they probably will soon.</p>
						</div>
						<div className="aboutOneStat">
							<h3>Air Yards per Target ("AYPT")</h3>
							<p> Definition: Air yards per target is an average measure of how deep down field a receiver is targeted. For example, if a player has an AYPT of 21 that means he is a deep threat, and sees a lot of opportunity to make big plays.</p>
							<p> Use it in a sentance: Will Fuller V is a beast! AYPT of almost 20, no wonder he has so many catches of 20+ yards this season. </p>
							<p> Fly like a champion: AYPT is a great stat because it can tell you what type of pass catcher a player is. Is he a RB who has a very low AYPT or a a deep ball threat with a high AYPT. Keep in mind AYPT can vary greatly by position, make sure to compare this stat against other players at the position. </p>
						</div>
						<div className="aboutOneStat">
							<h3>Target Share</h3>
							<p> Definition: Target Share measures the amount of team targets a player receives. For example, if a team has 30 targets for a week and one receiver on that team received 10 targets that players target share would be 0.33 or (10/30). More targets means more opportunity which usually means more fantasy points.</p>
							<p> Use it in a sentance: Larry Fitzgerald has a 0.25 percent target share at age 34! Woah.</p>
							<p> Fly like a champion: Target share is important. If you think a guy should be a WR1 make sure he's got the target share to back it up. A receiver can have all the talent in the world but unless he's getting the opportunities to do something with that talent he probably won't produce many fantasy points. </p>
						</div>
						<div className="aboutOneStat">
							<h3>Receiver Air Conversion Ratio ("RACR")</h3>
							<p> Definition: RACR is an efficiency stat that answers the question: “How well does a player convert a yard thrown at him into receiving yards?” The formula for RACR is: Receiving Yards / Total Air Yards. For example, a RB might have a very high RACR (>1) because their AYPT is low where a deep threat might have a lower RACR since their YAC may be lower.</p>
							<p> Use it in a sentance: Christian McCaffrey's RACR is through the roof! He turns almost every air yard he receives into 2.08 receiving yards. That makes sense because he's a runnning back that sees a lot of targets at or behind the line of scrimmage. </p>
							<p> Fly like a champion: High RACR is great, but keep in mind that RACR by position can vary greatly for example, a speedster like DeSean Jackson has an RACR of around 0.44 because he gets a lot of deep looks vs. McCaffrey's 2.08. </p>
						</div>
						<div className="aboutOneStat">
							<h3>Weighted Opportunity Rating ("WOPR")</h3>
							<p> Definition: WOPR allows us to compare slot receivers who get lots of targets but not a lot of air yards with players who receive fewer targets but a greater share of the team’s air yards. WOPR takes share of team air yards and share of team targets and weights them based on how well they predict both PPR and standard fantasy points. Targets are given roughly twice as much weight as air yards, and when you combine the two you are able to accurately assess the opportunity each receiver is commanding. One good example of this is Marvin Jones and Golden Tate in 2016. Last year Jones and Tate saw completely different types of opportunity at different times of the season. Yet at the end of the year their season-long WOPRs were exactly equal at 0.50. The formula for WOPR is: (1.5 * Target Share + 0.7) * (Share of Team Air Yards). </p>
							<p> Use it in a sentance: Antonio Brown's WOPR is 0.8...enough said. Get that guy on your team STAT! </p>
							<p> Fly like a champion: WOPR helps to cut through the differences in Air Yards stats seen by position. Get guys with a high WOPR on your team. Simple as that. Espcially in a PPR league. </p>
						</div>
				</div>
			</div>
		</div>
		)
}
}

export default About;
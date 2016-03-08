var React = require('react');
var PropTypes = React.PropTypes;
var styles = require('../styles');
var UserDetails = require('./UserDetails');
var UserDetailsWrapper = require('./UserDetailsWrapper');
var Link = require('react-router').Link;
var MainContainer = require('./MainContainer');
var Loading = require('./Loading');

function StartOver () {
	return (
		<div className="col-xs-12" style={styles.space}>
			<Link to="/playerOne">
    		<button className="btn btn-lg btn-danger">Start Over!</button>
    	</Link>
		</div>
	);
}

function Results (props) {
	if(props.isLoading === true){
		return (
			<Loading />
		)
	}

	if(props.scores[0] === props.scores[1]){
		return (
			<MainContainer>
				<h1>Its A Tie!</h1>
				<StartOver/>
			</MainContainer>
		)
	}

	var winningIndex = props.scores[0] > props.scores[1] ? 0 : 1;
	var loserIndex = winningIndex === 0 ? 1 : 0;

	return (
		<MainContainer>
			<h1>Results</h1>
			<div className="col-sm-8 col-sm-offset-2">
				<UserDetailsWrapper header="Winner">
					<UserDetails 
						score={props.scores[winningIndex]}
						info={props.playersInfo[winningIndex]}/>
				</UserDetailsWrapper>

				<UserDetailsWrapper header="Loser">
					<UserDetails 
						score={props.scores[loserIndex]}
						info={props.playersInfo[loserIndex]}/>
				</UserDetailsWrapper>
			</div>
			<StartOver/>
		</MainContainer>
	)
}

Results.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  playersInfo: PropTypes.array.isRequired,
  scores: PropTypes.array.isRequired
}

module.exports = Results;
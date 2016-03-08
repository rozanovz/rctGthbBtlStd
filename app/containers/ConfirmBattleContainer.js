var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers.js');

var ConfirmBattleContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState:function(){
		return {
			isLoading: true,
			playersInfo: []
		}
	},
	componentDidMount: function () {
		var query = this.props.location.query;
		githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
		.then(function(players){
			this.setState({
				isLoading:false,
				playersInfo:[players[0],players[1]]
			})
		}.bind(this));
	},
	hadleInitiateBattle: function(){
		this.context.router.push({
			pathname: '/results',
			state: {
				playersInfo: this.state.playersInfo
			}
		});
	},
	render: function(){
		return (
			<ConfirmBattle 
				isLoading={this.state.isLoading}
				onInitiateBattle={this.hadleInitiateBattle}
				playersInfo={this.state.playersInfo}/>
		)
	}
});

module.exports = ConfirmBattleContainer;
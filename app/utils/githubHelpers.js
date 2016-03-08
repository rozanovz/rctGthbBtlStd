var axios = require('axios');

var id = "CLIENT_ID";
var sec = "SECRET_ID";

var param = "?client_id="+id+"&client_secret="+sec;

function getUserInfo (username) {
	return axios.get('https://api.github.com/users/' + username + param)
};

function getRepos (username){
	return axios.get('https://api.github.com/users/' + username + "/repos" + param + '&per_page=100')
};

function getTotalStars (repos) {
	return repos.data.reduce(function(prev,curr){
		return prev + curr.stargazers_count
	}, 0)
};

function getPlayersData (player) {
	return getRepos(player.login)
	.then(getTotalStars)
	.then(function(totalStars){
		return {
			followers: player.followers,
			totalStars: totalStars
		}
	})
};

function calculateScores (players) {
	return [
		players[0].followers * 3 + players[0].totalStars,
		players[1].followers * 3 + players[1].totalStars
	]
};

var helpers = {
	getPlayersInfo: function(players){
		return axios.all(players.map(function(username){
			return getUserInfo(username);
		})).then(function(info){
			return info.map(function(user){
				return user.data;
			});
		})
	},
	battle: function(players){
		var plaerOneData = getPlayersData(players[0]);
		var plaerTwoData = getPlayersData(players[1]);

		return axios.all([plaerOneData, plaerTwoData])
			.then(calculateScores)
			.catch(function(){
				console.warn('Error in getPlayersInfo')
			})
	}
};

module.exports = helpers;
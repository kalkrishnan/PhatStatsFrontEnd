(function (global, $, undefined) {

	// Search Wikipedia for a given term
	function getespnresources(espn_url) {
		var promise = $.ajax({
			url: espn_url,
			dataType: 'json'
		}).promise();

		return Rx.Observable.fromPromise(promise);
	}

 function getespnplayers() {
		var promise = $.ajax({
			url: 'http://localhost:4567/NFLPlayers',
			dataType: 'json'
		}).promise();

		return Rx.Observable.fromPromise(promise);
	}


						var $results = $('#results');
						var $totalResults=0;
						var totalCalls=0;
						var $offsets=[];
var teams={};
var players={};

function main() {

						loadResults();
						var $input = $('#textInput');
						// Get all distinct key up events from the input and only fire if long enough and distinct
						// Get all distinct key up events from the input and only fire if long enough and distinct
						var keyup = Rx.Observable.fromEvent($input, 'keyup')
							.map(function (e) {
								return e.target.value; // Project the text from the input
							})
							.filter(function (text) {
								return text.length >= 2; // Only if the text is longer than 2 characters
							})
							.throttle(750 /* Pause for 750ms */ )
							.distinctUntilChanged(); // Only if the value has changed

						var searcher = keyup.flatMapLatest(
							function (text) { 
								return search(text); // Search wikipedia
							});

						var subscription =searcher.subscribe(
							function (data) {
												console.log("able to search");
												console.log(data["sports"][0]["leagues"][0]["teams"]);
														var res = data["sports"][0]["leagues"][0]["teams"];
												$results.empty();
												$.each(res, function (_, value) {
																				   link=value["links"]["web"]["teams"]["href"]
																				   team=value["location"]+" "+value["name"]

																						teams[team]=link;


														});
											}, 
											function (error) {
														// Handle any errors
														$results.empty();

														$('<li>Error: ' + error + '</li>').appendTo(results);
											}
						);





	console.log($totalResults);


}

function loadResults()
{

						var subscription1 = getespnresources("http://localhost:4567/NFLPlayers").subscribe(
									function (data) {

														console.log("after getting players");
														console.log(data);
														var espnplayers = data["Players"];
														//console.log(espnplayers);
														$.each(espnplayers, function (_, player) {
															console.log("iterating over players");
															link="http://www.nfl.com"
															name=player["displayName"];
															players[name]=link;
																																	
														});
													}, 
													function (error) {
														// Handle any errors
														$results.empty();

														$('<li>Error: ' + error + '</li>').appendTo(results);
													}
						);
						console.log("loading results");
						var subscription = getespnresources("http://localhost:4567/NFLTeams").subscribe(
							function (data) {
												console.log();
												console.log(data["sports"][0]["leagues"][0]["teams"]);
														var res = data["sports"][0]["leagues"][0]["teams"];
												$results.empty();
												$.each(res, function (_, value) {
																				   link=value["links"]["web"]["teams"]["href"]
																				   team=value["location"]+" "+value["name"]

																						teams[team]=link;


														});
											}, 
											function (error) {
														// Handle any errors
														$results.empty();

														$('<li>Error: ' + error + '</li>').appendTo(results);
											}
						);

						console.log("before getting players");
						
}


function search(input) {
	$results.empty();
    return Rx.Observable.create(function(observer) {


	for (var team in teams) {

	if (team.toLowerCase().indexOf(input) >= 0)
		{

			$('<li><a href='+teams[team]+'>' + team + '</a></li>').appendTo(results);
		}

	}

	console.log(Object.size(players));
	for (var player in players) {

		if (player.toLowerCase().indexOf(input) >= 0)
		{

			console.log("in search");
			$('<li><a href='+players[player]+'>' + player + '</a></li>').appendTo(results);
		}

	}


        
    });
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


	main();


}(window, jQuery));


(function (global, $, undefined) {

    // Search Wikipedia for a given term
    function getespnteams(term) {
        var promise = $.ajax({
            url: 'http://api.espn.com/v1/sports/football/nfl/teams/?apikey=4jwg9fbsuwv2ajmuvym22jmr',
            dataType: 'json'
        }).promise();
        return Rx.Observable.fromPromise(promise);
    }

 function getespnplayers(term) {
        var promise = $.ajax({
            url: 'http://api.espn.com/v1/sports/football/nfl/athletes/?limit=3000&apikey=4jwg9fbsuwv2ajmuvym22jmr',
            dataType: 'json'
        }).promise();
        return Rx.Observable.fromPromise(promise);
    }

    function main() {
        var $input = $('#textInput'),
            $results = $('#results');

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
                return getespnteams(text); // Search wikipedia
            });

 var searcher1 = keyup.flatMapLatest(
            function (text) { 
                return getespnplayers(text); // Search wikipedia
            });


        var subscription = searcher.subscribe(
            function (data) {
		console.log();
		console.log(data["sports"][0]["leagues"][0]["teams"]);
                var res = data["sports"][0]["leagues"][0]["teams"];
		$results.empty();
		$.each(res, function (_, value) {
		   link=value["links"]["web"]["teams"]["href"]
		   team=value["location"]+" "+value["name"]
			if (team.toLowerCase().indexOf($input[0]["value"]) >= 0)
			{
	                    $('<li><a href='+link+'>' + team + '</a></li>').appendTo(results);
			}
                });
            }, 
            function (error) {
                // Handle any errors
                $results.empty();

                $('<li>Error: ' + error + '</li>').appendTo(results);
            });

 var subscription1 = searcher1.subscribe(
            function (data) {
		console.log(data["resultsCount"]);
		
                var res = data["sports"][0]["leagues"][0]["athletes"];
	$.each(res, function (_, value) {
		   link=value["links"]["web"]["athletes"]["href"]
		   name=value["fullName"];
		   
			if (name.toLowerCase().indexOf($input[0]["value"]) >= 0)
			{

	                    $('<li><a href='+link+'>' + name+ '</a></li>').appendTo(results);
			}
                });
            }, 
            function (error) {
                // Handle any errors
                $results.empty();

                $('<li>Error: ' + error + '</li>').appendTo(results);
            });

    }

    main();


}(window, jQuery));
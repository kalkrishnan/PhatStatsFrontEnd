(function (global, $, undefined) {

   // Search Wikipedia for a given term
	function getespnnews(i) {
		var promise = $.ajax({
			//url: 'http://api.espn.com/v1/sports/football/nfl/news/headlines/top/?limit=5&offset='+i+'&apikey=4jwg9fbsuwv2ajmuvym22jmr',
			  url: 'http://localhost:4567/Latest',
			dataType: 'json'
		}).promise();
	
		return Rx.Observable.fromPromise(promise);
	}



	var $news = $('#news');
	var headlines=0;
    function main() {

			handle=setInterval(function(){getTestNewHeadlines(headlines)}, 20000);

						

       
    }


function getNewHeadlines(i)
{
	var subscription = getespnnews(i).subscribe(
							function (data) {
												console.log("getting news");
												console.log(data);
												var res = data["headlines"];
												$news.empty();
												$.each(res, function (_, value) {
																var byline=value["byline"];
																var headline=value["headline"];
																var description=value["description"];
																var images=value["images"][0];
																var url="";
																if(images)
																{
																  url=images["url"];
																}
																var link=value["links"]["web"]["href"]
																 team=value["location"]+" "+value["name"]
																					
					$('<li class="#outPopUp li"> <a href=""><img src="'+url+'" alt="icon" class="alignnone size-full wp-image-156" /></a> '+headline+':'+description+'<h6>: ' + byline + '<h6></li>').appendTo(news);																								
																					
														});
														
											}, 
											function (error) {
														// Handle any errors
														$results.empty();

														$('<li>Error: ' + error + '</li>').appendTo(results);
											}
						);
headlines=headlines+5;

						
$.getScript("another_script.js");
}

function getTestNewHeadlines(i)
{
	var subscription = getespnnews(i).subscribe(
							function (data) {
												console.log("getting news");
												console.log(data);
												var res = data["entry"];
												$news.empty();
												$.each(res, function (_, value) {
																var byline=value["creator"];
																var headline=value["title"];
																var summary=value['summary'];
																var description=summary["content"];
																//var images=value["images"][0];
																var url="";
																//if(images)
																//{
																//  url=images["url"];
																//}
																var link=value["id"]
																
																					
					$('<li class="#outPopUp li"> <a href=""><img src="'+url+'" alt="icon" class="alignnone size-full wp-image-156" /></a> '+headline+':'+description+'<h6>: ' + byline + '<h6></li>').appendTo(news);																								
																					
														});
														
											}, 
											function (error) {
														// Handle any errors
														$results.empty();

														$('<li>Error: ' + error + '</li>').appendTo(results);
											}
						);
headlines=headlines+5;

						
$.getScript("another_script.js");
}
    main();


}(window, jQuery));
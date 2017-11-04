/*At the top of the liri.js file, write the code you need to grab the data from keys.js. 
Then store the keys in a variable.
Make it so liri.js can take in one of the following commands:
my-tweets
spotify-this-song
movie-this
do-what-it-says
What Each Command Should Do

node liri.js my-tweets
This will show your last 20 tweets and when they were created at in your terminal/bash window.
node liri.js spotify-this-song '<song name here>'
This will show the following information about the song in your terminal/bash window
Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
If no song is provided then your program will default to "The Sign" by Ace of Base.
You will utilize the node-spotify-api package in order to retrieve song information from 
the Spotify API.
Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary 
credentials. You can follow these steps in order to generate a client id and client secret:
Step One: Visit https://developer.spotify.com/my-applications/#!/
Step Two: Either login to your existing Spotify account or create a new one 
(a free account is fine) and log in.
Step Three: Once logged in, navigate to 
https://developer.spotify.com/my-applications/#!/applications/create to register
 a new application to be used with the Spotify API. You can fill in whatever you'd like
  for these fields. When finished, click the "complete" button.
Step Four: On the next screen, scroll down to where you see your client id and client secret.
 Copy these values down somewhere, you'll need them to use the Spotify API and 
 the node-spotify-api package. See the
node liri.js movie-this '<movie name here>'
This will output the following information to your terminal/bash window:
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
It's on Netflix!
You'll use the request package to retrieve data from the OMDB API. Like all of the 
in-class activities, the OMDB API requires an API key. You may use 40e9cece.
node liri.js do-what-it-says
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to 
``00480

00-000
+
+e of LIRI's commands.
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Feel free to change the text in that document to test out the feature for other commands.*/

	var keys = require ("./keys.js");
	var spotify = require("node-spotify-api");
	var twitter = require ('node-twitter');
	var tmbd = require('node-tmbd').init({apikey:'40e9cece'});
	var TmdbApi = require("mentmdb-api");
		var request = require("request");
		var fs = require("fs");

		console.log(twitterKeys);

		var nodeArgs = process.argv;
		var query = [];
		var action = process.argv.slice(2);

		for (var i = 2; i < nodeArgs.length; i++){
			query.push(nodeArgs[i]);
		}
	var argOne = query.splice(0,1);
	var argTwo = query.join("");
	var action = String(argOne);
	var value = String(argTwo);

	console.log('searching for  ' + value);
	console.log('What command? '+ action);

	switch(action){

		case 'my-tweets':
		my-tweets();
		logAction();
		break;

		case 'spotify-this-song':
		spotifyThisSong();
		logAction();
		break;

		case 'movie-this':
		movieThis();
		logAction();
		break;

		case 'do-what-it-says':
		doThis();
		logAction();
		break

	}


//Comandos para para que liri llame con las  llaves  los tweets
    function myTweets(){

	var twitterKeys = keys.twitterKeys;

	var client = new twitter({
		consumer_keys: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret

	});

	var params = {screen_name: "apatron100", count:20};

	client.get("statuses/user_timeline", params, function(error, tweets, response){

	if (error) {
		console.log(error);
	}

	for(var i = 0; i < tweets.lenght; i++){
		console.log("-----------");
		console.log(tweets[i].text);
		console.log('-----------');
	}



});
	}
// spotify-this-song
 function spotifyThisSong(){

 	spotify.search({
 		type:"track",
 		query: value}, function(err, data){

 		if (err){ 			
 			console.log("Error Ocurred: " + err);
 			return;
 }
 //Si no hay musica el programara saltara a:
 		if(value === ""){
 			console.log('----------');
 			console.log('Artist: Ace of Base');
 			console.log('Song: The Sign');
 			console.log('Song link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE');
 			console.log('Album: The Sign');
 			console.log('------------');
 		}
 		else{

 			for (i=0; i < 5; i++){

 				var results = data.tracks.items[i];

 				var artist = results.artist[0].name;
 				var songName = results.name;
 				var songLink = results.external_urls.spotify;
 				var album = results.album.name;

//Artista, Cancion, Liga a la cancion, album//

 				console.log('-------------');
 				console.log('Artist: ' + artist);
 				console.log('Song: ' + songName);
 				console.log('Song Link: ' + songLink);
 				console.log('Album: ' + album);
 				console.log('--------------');


 			}
 		}
 	});
}

// movie-this
function movieThis(){
	
	var queryURL = "http://www.imdb.com/title/tt0485947/" + value;

request (queryURL, function(error, response, body){

// si la solicitud tiene exito
	if (error) {
		console.log('Error ocurred: ' + error);
		return;

	}



	if(value === ""){

		console.log('---------');
		console.log('Movie name: Mr. Nobody');
		console.log('Release Date: 2009-09-11');
		console.log('Average vote: ');
		console.log('Country: ');
		console.log('Sypnosis: ');
		console.log('Language: en');
		console.log('Actors:');

		console.log('-----------');

	}

	else  {

	console.log('------------');
	console.log('Movie Name:' + JSON.parse(body).results[0].title);
	console.log('Release Date:' + JSON.parse(body).results[0].release_date);
	console.log('Average Vote: ' + JSON.parse(body).results[0].vote_average);
	console.log('Country: '+ JSON.parse(body).results[0].country);
	console.log('Sypnosis: ' + JSON.parse(body).results[0].overview);
	console.log('Languaje: ' + JSON.parse(body).results[0].original_languaje);
	console.log('Actors: ' + JSON.parse(body).results[0].actors);
	console.log('-------------');
}


});
}

//do-what it-says
function doThis(){


fs.readFile("random.text", "utf8", function(error,data){

	var content = data.split(",");
	var array = data.toString().split("\n");
	console.log(array);


	action = content[0];
	value = content[1];

	switch (action){
		case "my-tweets":
		myTweets();
		break;

		case "spotify-this-song":
		spotifyThisSong();
		break;

		case "movie-this":
		movieThis();
		break;

		case "do-what-it-says":
		doThis();
		break;
	}

});

}
function logAction (){

	var logItem = "\nSearch String:" + action + "," + value;
	console.log(logItem);

	fs.appendFile("log.txt", logItem, function(err){

		if (err) {
			console.log(err);
		}
		else {
			console.log('Content Added');
		}
	});
}
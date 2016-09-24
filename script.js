// Base URL for API: https://api.twitch.tv/kraken
// Twitch Client ID: 7dz3226i5692rzqdjzkkpy44kk7rewp

// Array for all Twitch streamers on this site's list
var streamers = ["freecodecamp", "sodapoppin", "brunofin", "comster404", "hutch"];

function getProfileInfo() {
    // This function is to get the information for the streamers
    // on our list and populate each list item with their pic,
    // name, description if they are streaming, and their online status

    twitchURL = 'https://api.twitch.tv/kraken/streams/';
    var clientID = '?client_id=7dz3226i5692rzqdjzkkpy44kk7rewp&';
    // Loop through array of streamers looking for their stream info
    for (var i=0; i <streamers.length; i++) {
        //alert(streamers[i]);
        (function(i) {
            $.getJSON(twitchURL+streamers[i]+clientID+'callback=?', function(json) {

                // Get status of each user to test below
                var status = document.getElementsByClassName('status')[i];
                if (json.error == 'Not Found') {
                    status.innerHTML = 'Account Closed';
                    return;
                }

                // Set variables for pic, info, name to change later
                var pic = document.getElementsByClassName('profile-pic')[i];
                var info = document.getElementsByClassName('description')[i];
                var name = document.getElementsByClassName('profile-name')[i];
                var userName = json._links.channel.split('/');
                userName = userName[userName.length-1];
                var userURL = 'https://twitch.tv/'+userName;

                // If the user doesn't exist, change status
                if (json.error == "Not Found") {
                    status.innerHTML = "Account Closed";
                } else if (json.stream == null) {
                    name.innerHTML = '<a href="'+userURL+'">'+userName+'</a>';
                    status.innerHTML = '<a href="'+userURL+'">'+'Offline'+'</a>';
                } else {
                    // Change name/link, profile-pic src, stream info and status
                    pic.innerHTML = '<img src="'+json.stream.channel.logo+'">';
                    name.innerHTML = '<a href="'+userURL+'">'+userName+'</a>';
                    info.innerHTML = '<a href="'+userURL+'">'+json.stream.game+'</a>';
                    status.innerHTML = '<a href="'+userURL+'">'+'Online'+'</a>';
                }
            });
        })(i);
    }
}


window.onload = function() {
    getProfileInfo();
}
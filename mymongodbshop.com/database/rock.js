function generateObjectId() { //make random id
  return Math.floor((new Date).getTime()/1e3).toString(16) +
    (('x'.repeat(16).replace(/x/g,
      _=>(Math.random()*16|0).toString(16))
    ))
}
db.artists.insertMany([
{"genre" : "Rock",
 "artist" : "Queen",
 "albums": [ 
			{"idAlbum": generateObjectId(), "albumName": "A Night at the Opera", "year": 1975, "cost": 459, "songs": ["Bohemian Rhapsody", "I'm In Love With My Car", "Love Of My Life", "Sweet Lady"]},
			{"idAlbum": generateObjectId(), "albumName": "News of the World", "year": 1977, "cost": 679, "songs": ["We Will Rock You", "We Are the Champions", "Sheer Heart Attack", "It's Late"]},
			{"idAlbum": generateObjectId(), "albumName": "The Game", "year": 1980, "cost": 459, "songs": ["Play the Game", "Another One Bites the Dust",  "Crazy Little Thing Called Love", "Save Me"]}
		   ]
},
{"genre" : "Rock",
 "artist" : "The Beatles",
 "albums": [ 
			{"idAlbum": generateObjectId(), "albumName": "Help!", "year": 1965, "cost": 899, "songs": ["The Night Before", "Another Girl", "It's Only Love", "Yesterday"]},
			{"idAlbum": generateObjectId(), "albumName": "Abbey Road", "year": 1968, "cost": 799, "songs": ["Come Together", "Something", "Here Comes the Sun", "Because"]},
			{"idAlbum": generateObjectId(), "albumName": "Let it be", "year": 1970, "cost": 899, "songs": ["Let It Be", "Two Of Us", "I've Got A Feeling", "Get Back"]}
		   ]
},
{"genre" : "Rock",
 "artist" : "Roxette",
 "albums": [ 
			{"idAlbum": generateObjectId(), "albumName": "Look Sharp!", "year": 1988, "cost": 339, "songs": ["The Look", "Dance Away", "Listen to Your Heart", "Half a Woman, Half a Shadow"]},
			{"idAlbum": generateObjectId(), "albumName": "Tourism", "year": 1992, "cost": 379, "songs": ["How Do You Do!", "The Heart Shaped Sea", "It Must Have Been Love", "Never Is a Long Time"]},
			{"idAlbum": generateObjectId(), "albumName": "Crash! Boom! Bang!", "year": 1994, "cost": 479, "songs": ["Sleeping in My Car", "Place Your Love", "I Love the Sound of Crashing Guitars", "Go to Sleep"]}
		   ]
},
{"genre" : "Rock",
 "artist" : "Scorpions",
 "albums": [ 
			{"idAlbum": generateObjectId(), "albumName": "Blackout", "year": 1982, "cost": 529, "songs": ["Can't Live Without You", "No One Like You", "Now", "Dynamite"]},
			{"idAlbum": generateObjectId(), "albumName": "Crazy World", "year": 1990, "cost": 649, "songs": ["Wind of Change", "Send Me an Angel", "Tease Me Please Me", "Lust or Love"]},
			{"idAlbum": generateObjectId(), "albumName": "Love at First Sting", "year": 1984, "cost": 489, "songs": ["Rock You Like A Hurricane", "Still Loving You", "Crossfire", "Big City Nights"]}
		   ]
},
{"genre" : "Rock",
 "artist" : "Bon Jovi",
 "albums": [ 
			{"idAlbum": generateObjectId(), "albumName": "7800° Fahrenheit", "year": 1985, "cost": 459, "songs": ["In and Out of Love", "Only Lonely", "Silent Night", "To the Fire"]},
			{"idAlbum": generateObjectId(), "albumName": "Slippery When Wet", "year": 1986, "cost": 329, "songs": ["Let It Rock", "Livin' On A Prayer", "Raise Your Hands", "I'd Die for You"]},
			{"idAlbum": generateObjectId(), "albumName": "Crush", "year": 2000, "cost": 339, "songs": ["It's My Life", "Say It Isn't So", "Thank You For Loving Me", "Next 100 Years"]}
		   ]
}
])
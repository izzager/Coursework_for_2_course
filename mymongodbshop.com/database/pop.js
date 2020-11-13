function generateObjectId() { //make random id
  return Math.floor((new Date).getTime()/1e3).toString(16) +
    (('x'.repeat(16).replace(/x/g,
      _=>(Math.random()*16|0).toString(16))
    ))
}
db.artists.insertMany([
{"genre" : "Pop",
 "artist" : "Michael Jackson",
 "albums": [ 
			{"idAlbum": generateObjectId(), "albumName": "Thriller", "year": 1982, "cost": 329, "songs": ["Biilie Jean", "The Lady in My Life", "Pretty Young Thing", "Human Nature"]},
			 {"idAlbum": generateObjectId(), "albumName": "Bad", "year": 1987, "cost": 559, "songs": ["Bad", "Liberian Girl", "Just Good Friends", "Another Part of Me"]},
			 {"idAlbum": generateObjectId(), "albumName": "Dangerous", "year": 1991, "cost": 459, "songs": ["Jam", "Remember The Time", "Who Is It", "Heal the World"]}
		   ]
},

{"genre" : "Pop",
 "artist" : "Madonna",
 "albums": [ 
			{"idAlbum": generateObjectId(), "albumName": "Like a Prayer", "year": 1989, "cost": 589, "songs": ["Like a Prayer", "Promise to Try", "Cherish", "Oh Father"]},
			{"idAlbum": generateObjectId(), "albumName": "Ray of Light", "year": 1998, "cost": 729, "songs": ["Swim", "Nothing Really Matters", "Frozen", "The Power of Good-Bye"]},
			{"idAlbum": generateObjectId(), "albumName": "Confessions on a Dance Floor", "year": 2005, "cost": 389, "songs": ["Hung Up", "Sorry", "Forbidden Love", "Jump"]}
		   ]
},

{"genre" : "Pop",
 "artist" : "Sting",
 "albums": [ 
			{"idAlbum": generateObjectId(), "albumName": "Nothing Like the Sun", "year": 1987, "cost": 299, "songs": ["Englishman in New York", "We'll Be Together", "Straight To My Heart", "Little Wing"]},
			{"idAlbum": generateObjectId(), "albumName": "Ten Summoner’s Tales", "year": 1993, "cost": 299, "songs": ["Fields of Gold", "Shape of My Heart", "Seven Days", "Saint Augustine in Hell"]},
			{"idAlbum": generateObjectId(), "albumName": "Brand New Day", "year":1999, "cost": 199, "songs": ["Desert Rose", "The End of the Game", "Big Lie Small World", "After the Rain Has Fallen"]}
		   ]
},

{"genre" : "Pop",
 "artist" : "Modern Talking",
 "albums": [ 
			{"idAlbum": generateObjectId(), "albumName": "In the Middle of Nowhere", "year": 1986, "cost": 499, "songs": ["Geronimo's Cadillac", "Riding on a White Swan", "Stranded in the Middle of Nowhere", "Princess Of The Night"]},
			{"idAlbum": generateObjectId(), "albumName": "Back for Good", "year": 1998, "cost": 359, "songs": ["You're My Heart, You're My Soul", "Cheri Cheri Lady", "Anything Is Possible", "We Take the Chance", "Brother Louie"]},
			{"idAlbum": generateObjectId(), "albumName": "Alone", "year": 1999, "cost": 279, "songs": ["You Are Not Alone", "Sexy Sexy Lover", "Don't Let Me Down", "How You Mend a Broken Heart"]}
		   ]
},

{"genre" : "Pop",
 "artist" : "ABBA",
 "albums": [ 
			{"idAlbum": generateObjectId(), "albumName": "ABBA", "year": 1975, "cost": 249, "songs": ["Mamma Mia", "Hey, Hey Helen", "S.O.S.", "Man in the Middle"]},
			{"idAlbum": generateObjectId(), "albumName": "Arrival", "year": 1976, "cost": 659, "songs": ["When I Kissed the Teacher", "Dancing Queen", "My Love My Life", "Money, Money, Money"]},
			{"idAlbum": generateObjectId(), "albumName": "ABBA Live", "year": 1986, "cost": 489, "songs": ["Chiquitita", "Gimme! Gimme! Gimme!", "Super Trouper", "Name of the Game"]}
		   ]
},

{"genre" : "Pop",
 "artist" : "Ace of Base",
 "albums": [ 
			{"idAlbum": generateObjectId(), "albumName": "Happy Nation", "year": 1993, "cost": 539, "songs": ["All That She Wants", "Dancer in a Daydream", "Waiting for Magic", "Wheel of Fortune"]},
			{"idAlbum": generateObjectId(), "albumName": "The Bridge", "year": 1995, "cost": 399, "songs": ["Beautiful Life", "Never Gonna Say I'm Sorry", "Lucky Love", "Que sera"]},
			{"idAlbum": generateObjectId(), "albumName": "Flowers", "year": 1998, "cost": 399, "songs": ["Cruel Summer", "Everytime It Rains", "Tokyo Girl", "Always Have, Always Will"]}
		   ]
}

])
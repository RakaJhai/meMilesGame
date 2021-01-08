var names = ["Peter", "Emma", "Jack", "Mia", "Eric"];
console.log(names.sort()); // ["Emma", "Eric", "Jack", "Mia", "Peter"]

var objs = [
    {
      "customerid": "6",
      "email": "oktavianus@gmail.com",
      "gameplay": "2020-12-17 11:24:26",
      "gamesid": "4",
      "gamespoint": "150",
      "name": "Oktavianus",
      "scoreid": "2",
      "sessionid": null,
    },
    {
      "customerid": "4",
      "email": "asd@asd.com",
      "gameplay": "2020-12-17 06:11:30",
      "gamesid": "4",
      "gamespoint": "600",
      "name": "asdasd",
      "scoreid": "3",
      "sessionid": null,
    },
     {
      "customerid": "6",
      "email": "oktavianus@gmail.com",
      "gameplay": "2020-12-17 06:14:28",
      "gamesid": "4",
      "gamespoint": "195",
      "name": "Oktavianus",
      "scoreid": "4",
      "sessionid": null,
    },
     {
      "customerid": "3",
      "email": "csokta@gmail.com",
      "gameplay": "2020-12-17 06:17:08",
      "gamesid": "4",
      "gamespoint": "82",
      "name": "Okta CS",
      "scoreid": "5",
      "sessionid": null,
    },
     {
      "customerid": "6",
      "email": "oktavianus@gmail.com",
      "gameplay": "2020-12-17 06:25:02",
      "gamesid": "4",
      "gamespoint": "151",
      "name": "Oktavianus",
      "scoreid": "6",
      "sessionid": null,
    },
     {
      "customerid": "6",
      "email": "oktavianus@gmail.com",
      "gameplay": "2020-12-17 06:26:36",
      "gamesid": "4",
      "gamespoint": "159",
      "name": "Oktavianus",
      "scoreid": "7",
      "sessionid": null,
    },
    {
      "customerid": "6",
      "email": "oktavianus@gmail.com",
      "gameplay": "2020-12-17 06:28:36",
      "gamesid": "4",
      "gamespoint": "115",
      "name": "Oktavianus",
      "scoreid": "8",
      "sessionid": null,
    },
    {
      "customerid": "6",
      "email": "oktavianus@gmail.com",
      "gameplay": "2020-12-17 08:48:46",
      "gamesid": "4",
      "gamespoint": "140",
      "name": "Oktavianus",
      "scoreid": "9",
      "sessionid": null,
    },
    {
      "gameplay": "2020-12-17 10:46:25",
      "gamesid": "4",
      "gamespoint": "178",
      "name": "Okta CS",
      "scoreid": "10",
      "sessionid": null,
    },
  ]

objs.sort(function(a, b) {
  return b.gamespoint - a.gamespoint;
}); // Sort by age (lowest first)

console.log(objs)
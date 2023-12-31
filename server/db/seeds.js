use boatify;
db.dropDatabase();

db.locations.insertMany([
  {
    name:"Cala Pi de la Posada",
    english_name:"Formentor Beach",
    travel_time:15,
    price_morning: 20,
    price_afternoon: 25,
    price_day: 35,
    price_base: 10,
  },
  {
    name:"Cala Sant Vicenc",
    english_name:"Cove of St Vincent",
    travel_time:80,
    price_morning: 40,
    price_afternoon: 45,
    price_day: 75,
    price_base: 20,
  },
  {
    name:"S'Illot",
    english_name:"The Islet",
    travel_time:30,
    price_morning: 25,
    price_afternoon: 30,
    price_day: 45,
    price_base: 15,
  }
]);
db.extras.insertMany([
  {
    name:"Bacon Roll",
    price:5
  },
  {
    name:"Bucket of Beers",
    price:25
  },
  {
    name:"Champagne",
    price:35
  },
  {
    name:"Ice Lollies",
    price:10
  }
])
db.users.insertMany([
  {
    username: "Elon Musk",
    password: "ibuyboats34*",
    email: "twitter@x.tesla"
  },
  {
    username: "Jeff Bezos",
    password: "elonhasnoboats4£",
    email: "amazon@rocket.pr"
  }
])
const userIdFinder = (username)=>{
  const foundUser = db.users.findOne({username: username},{_id:1})
  return foundUser._id
}

db.orders.insertMany([
  {
    location: "Cala Pi de la Posada",
    morning:true,
    passengers: 2,
    price: 125,
    date: "2024-6-1" ,
    extras: [{
      name:"Champagne",
      quantity:1
    }]
  },
  {
    location: "Cala Pi de la Posada",
    morning:true,
    passengers: 6,
    price: 125,
    date: "2024-1-1" ,
    extras: [{
      name:"Champagne",
      quantity:1
    }]
  },
  {
    location: "Cala Pi de la Posada",
    afternoon:true,
    passengers: 8,
    price: 125,
    date: "2024-8-3" ,
    extras: [{
      name:"Champagne",
      quantity:1
    }]
  },
  {
    location: "Cala Pi de la Posada",
    afternoon:true,
    passengers: 6,
    price: 125,
    date: "2024-1-1" ,
    extras: [{
      name:"Champagne",
      quantity:1
    }]
  },{
    location: "Cala Pi de la Posada",
    morning:true,
    passengers: 2,
    price: 125,
    date: "2023-9-13" ,
    extras: [{
      name:"Champagne",
      quantity:1
    },{
      name:"Bacon Roll",
      quantity:1
    }]
  },{
    location: "Cala Pi de la Posada",
    morning:true,
    passengers: 2,
    price: 250,
    date: "2023-9-14" ,
    extras: [{
      name:"Bucket of Beers",
      quantity:2
    },{
      name:"Ice Lollies",
      quantity:5
    }],
    userId:userIdFinder("Elon Musk")
  },{
    location: "Cala Sant Vicenc",
    morning:true,
    afternoon:true,
    passengers: 5,
    price: 80000,
    date: "2023-9-12" ,
    extras: [{
      name:"Bucket of Beers",
      quantity:2
    },{
      name:"Ice Lollies",
      quantity:5
    }],
    userId:userIdFinder("Jeff Bezos")
  },
])


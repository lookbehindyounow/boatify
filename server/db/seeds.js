use boatify;
db.dropDatabase();

db.locations.insertMany([
  {
    name:"Cala Pi de la Posada / Formentor Beach",
    travel_time:15,
    price_morning: 20,
    price_afternoon: 25,
    price_day: 35,
    price_base: 10,
  },
  {
    name:"Cala Sant Vicenc",
    travel_time:80,
    price_morning: 40,
    price_afternoon: 45,
    price_day: 75,
    price_base: 20,
  },
  {
    name:"S'Illot",
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
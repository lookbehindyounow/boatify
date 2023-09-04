use boatify;
db.dropDatabase();

db.locations.insertMany([
    {
    name:"Cala Pi de la Posada / Formentor Beach",
    travel_time:15
    },
    {
    name:"Cala Sant Vicenc",
    travel_time:80
    },
    {
    name:"S'Illot",
    travel_time:30
    }
]);

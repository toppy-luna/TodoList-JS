var Sequelize = require('sequelize');

//var sequelize = new Sequelize('postgres://dev:secret@postgresql:5432/my-db');

console.log("--- new");
var sequelize = new Sequelize('my-db', 'dev', 'secret', {
    host: 'postgresql',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

console.log("--- authenticate");
sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

console.log("--- define");
var User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
console.log("--- sync");
User.sync({ force: true }).then(function () {
    // Table created
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});

console.log("--- findAll");
User.findAll().then(function (users) {
    console.log(users)
})

// DON'T DO THIS
console.log("--- findOne failed");
user = User.findOne()

console.log(user.get('firstName'));

console.log("--- findOne success");
User.findOne().then(function (user) {
    console.log(user.get('firstName'));
});
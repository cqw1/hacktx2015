/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

var cityName = 'Austin';
var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName;

ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    console.log('Successfully fetched weather data!');
    
    // Extract data
    var location = data.name;
    var temperature = Math.round(data.main.temp - 273.15) + 'C';
    
    // Always upper-case first letter of description
    var description = data.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.substring(1);
    
    card.subtitle(location + ',' + temperature);
    card.body(description);
  },
  function(error) {
    // Error!
    console.log('Failed fetching weather data: ' + error);
  }
);

// CONFIGURATION

// var accelData = [];

// var Accel = require('ui/accel');
// Accel.init();
// // rate, samples, subscribe
// Accel.config(100, 25, true);
// Accel.on('data', function(e) {
//     accelData.push(JSON.stringify(e.accels));
//     console.log(accelData);
// });

// Create the trainer/trainee menu
var menu = new UI.Menu({
  sections: []
});

var trainer_section = {
  title: 'Options',
  items: [{
    title: 'Trainer'
  }]
};
var trainee_section = {
  items: [{
    title: 'Trainee'
  }]
};

menu.section(1, trainer_section);
menu.section(2, trainee_section);
menu.show();

var trainer_window = new UI.Card({
    title: 'Trainer Mode'
    });
  trainer_window.body('Start moving!');

  var trainee_window = new UI.Card({
    title: 'Trainee Mode!'
  });
  trainee_window.body('Start learning!');

// EVENT HANDLERS

// def start_reading_data(array, Accel) {
//   Accel.on('data', function(e) {
//     array.push(JSON.stringify(e.accels));
//   }); 
// }

menu.on('select', function (e) {
  
  if (e.item.title == 'Trainer') {
    // start trainer window
    trainer_window.show();
    trainee_window.hide();
    var accelData = [];

var Accel = require('ui/accel');
Accel.init();
// rate, samples, subscribe
Accel.config(100, 25, true);
Accel.on('data', function(e) {
    accelData.push(JSON.stringify(e.accels));
    console.log(accelData);
});
//     start_reading_data(accelData);
//     var accelData = [];
//     start_reading_data(accelData, Accel);
//     console.log("ALL DATA: ", accelData);
  } else {
    // start trainee window
    trainer_window.hide();
    trainee_window.show();
  }
});


// Create the Weather Card
// var card = new UI.Card({
//   title: 'Weather',
//   subtitle:'substitle...'
  
// });

// // Display the Card
// card.show();


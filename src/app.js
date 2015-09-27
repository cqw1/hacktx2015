var UI = require('ui');
var ajax = require('ajax');
var Accel = require('ui/accel');

// CONFIGURATION

var accelData = [];

Accel.init();
// rate, samples, subscribe
Accel.config(100, 25, true);
Accel.on('data', function(e) {
//     if (window_is_loaded(trainer_window)) {
      accelData.push(JSON.stringify(e.accels));
      console.log(accelData);
//     }
    
});


var roleOptions = [
  {
    title: 'Trainer'
  },
  {
    title: 'Trainee'
  }
];

var gestures = [
  {
    title: 'Line'
  }
  
];

var menu = new UI.Menu({
  sections:[{
    title: 'Options',
    items: roleOptions
  }]
});
menu.show();

menu.on('select', function (e) {
  var roleDetails= new UI.Menu({
    sections:[{
      title: roleOptions[e.itemIndex].title,
      items: gestures
    }]
  })
  
  var addSection = {
    items: [{
      title: 'Add Gesture'
    }]
  };
  
  var new_gesture = new UI.Card({
    title: "Add a New Gesture!",
    subtitle: "Start recording a new action."
  });
  
  if (roleOptions[e.itemIndex].title == 'Trainer') {
    roleDetails.section(1, addSection);
//     roleDetails.item(0, roleDetails.section(0).items.length, {title: '+ Add Gesture'});
  }
  
  roleDetails.show();
  roleDetails.on('select', function (e) {
    if (e.item.title == 'Add Gesture') {
      new_gesture.show();
    }
  });

});





// // Create the trainer/trainee menu
// function create_elements() {
//   var menu = new UI.Menu({
//     sections: []
//   });

//   var trainer_section = {
//     title: 'Options',
//     items: [{
//       title: 'Trainer'
//     }]
//   };
  
//   var trainee_section = {
//     items: [{
//       title: 'Trainee'
//     }]
//   };
  
//   var trainer_window = new UI.Card({
//     title: 'Trainer Mode'
//     });
//   trainer_window.body('Start moving!');

//   var trainee_window = new UI.Card({
//     title: 'Trainee Mode!'
//   });
//   trainee_window.body('Start learning!');

//   // Add sections to the menu.
//   menu.section(1, trainer_section);
//   menu.section(2, trainee_section);
// }


// EVENT HANDLERS

// def start_reading_data(array, Accel) {
//   Accel.on('data', function(e) {
//     array.push(JSON.stringify(e.accels));
//   }); 
// }
  
//     var accelData = [];
//     var Accel = require('ui/accel');
//     Accel.init();
//     // rate, samples, subscribe
//     Accel.config(100, 25, true);
//     Accel.on('data', function(e) {
//       accelData.push(JSON.stringify(e.accels));
//       console.log(accelData);
//     });
    
//     start_reading_data(accelData);
//     var accelData = [];
//     start_reading_data(accelData, Accel);
//     console.log("ALL DATA: ", accelData);


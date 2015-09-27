console.log('processing data');


/*
Average n number of samples to obvtain the value of the 
reference threshold.

Data - Array of arrays.. that contain arrays. Three nested 
arrays. Second inner array contains all points of data collected 
in 1 second. Points of acceleration data are represented as 
arrays of [x, y, z].

Sample: 
[
	[[1, 2, 3], [5, 1, 0], [-1, 2, 20]],
	[[5, 2, 0], [5, 0, 0], [-13, 2, 20]],
	...
]
*/
function average_data(data) {
	if (data.length != 0) {
		var averaged_data = [];
		var len = data[0].length;

		for (var i = 0; i < data.length; i++) {
			var temp_sums = [0, 0, 0];

			for (var j = 0; j < len; j++) {
				temp_sums[0] += data[i][j][0]; // x
				temp_sums[1] += data[i][j][1]; // y
				temp_sums[2] += data[i][j][2]; // z
			}

			temp_sums[0] = temp_sums[0] / len; // average x
			temp_sums[1] = temp_sums[1] / len; // average y
			temp_sums[2] = temp_sums[2] / len; // average z

			averaged_data[i] = temp_sums;
		}
		return averaged_data;
	}
	return null;
};

/*
When no movement condition is present, minor errors in acceleration 
could be interpreted as a constant velocity due to the fact that 
samples not equal to zero are being summed. Apply a "window" of 
discrimination between "valid" and "invalid" data to filter out 
erroneous data.

Data - Array of arrays. Inner array contains average points of data 
collected in 1 second. Points of acceleration data are represented 
as arrays of [x, y, z].

Sample: 
[
	[5, 1, 0],
	[-13, 2, 20],
	...
]
*/
function apply_discrimination_window(data) {

	var threshold = 3;

	for (var i = 0; i < data.length; i++) {
		// Apply for x.
		if (data[i][0] <= threshold && data[i][0] >= -1 * threshold) {
			data[i][0] = 0;
		}
		// Apply for y.
		if (data[i][1] <= threshold && data[i][1] >= -1 * threshold) {
			data[i][1] = 0;
		}

		// Apply for z.
		if (data[i][2] <= threshold && data[i][2] >= -1 * threshold) {
			data[i][2] = 0;
		}
	}

	return data;
}


/*
Performing integration on acceleration data to get velocity data.

Data - Array of arrays. Inner array contains average points of data 
collected in 1 second. Points of acceleration data are represented
as arrays of [x, y, z].

Sample: 
[
	[5, 1, 0],
	[-13, 2, 20],
	...
]
*/
function first_integration(acceleration_data) {
	var len = acceleration_data.length;

	var velocity_data = [[0, 0, 0]];

	for (var i = 1; i < len; i++) {
		var old_acceleration = acceleration_data[i-1];
		var new_acceleration = acceleration_data[i];

		var temp_velocity = [0, 0, 0];
		temp_velocity[0] = velocity_data[i-1][0] + old_acceleration[0] + ((new_acceleration[0] - old_acceleration[0]) / 2);
		temp_velocity[1] = velocity_data[i-1][1] + old_acceleration[1] + ((new_acceleration[1] - old_acceleration[1]) / 2);
		temp_velocity[2] = velocity_data[i-1][2] + old_acceleration[2] + ((new_acceleration[2] - old_acceleration[2]) / 2);

		velocity_data.push(temp_velocity);
	}

	return velocity_data;
}

function second_integration(velocity_data) {
	var len = velocity_data.length;

	var position_data = [[0, 0, 0]];

	for (var i = 1; i < len; i++) {
		var old_velocity = velocity_data[i-1];
		var new_velocity = velocity_data[i];

		var temp_position = [0, 0, 0];
		temp_position[0] = position_data[i-1][0] + old_velocity[0] + ((new_velocity[0] - old_velocity[0]) / 2);
		temp_position[1] = position_data[i-1][1] + old_velocity[1] + ((new_velocity[1] - old_velocity[1]) / 2);
		temp_position[2] = position_data[i-1][2] + old_velocity[2] + ((new_velocity[2] - old_velocity[2]) / 2);

		position_data.push(temp_position);
	}

	return position_data;
	
}

/*
Given acceleration data, does two integrals, with some error-minimizing checks, to
find the position data.

Data - Array of arrays.. that contain arrays. Three nested 
arrays. Second inner array contains all points of data collected 
in 1 second. Points of acceleration data are represented as 
arrays of [x, y, z].

Sample Input: 
[
	[[1, 2, 3], [5, 1, 0], [-1, 2, 20]],
	[[5, 2, 0], [5, 0, 0], [-13, 2, 20]],
	...
]

Returns position data of an array of arrays. Inner arrays are (x, y, z) positions 
at each second.
[
	[0, 0, 0],
	[1, 4, 10],
	...
]
*/
function find_position(acceleration_data) {
	var averaged_acceleration_data = average_data(acceleration_data);
	//var discriminated_data = apply_discrimination_window(averaged_data);
	var velocity_data = first_integration(averaged_acceleration_data);
	var position_data = second_integration(velocity_data);
}


var data = [[[1, 2, 3], [-5, 6, 0]], [[2, -4, 11], [1, 1, 0]]];
find_position(data);

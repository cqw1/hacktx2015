# Assuming data comes in one string of {"x":.. "y":... },{"x":..}
f = open('data.txt', 'r')

data = f.read()

# Array of data points. Not pretty formatted yet.
split_by_point = data.split('},')

# Remove the '{' from the beginning of each string.
for i in range(len(split_by_point)):
	split_by_point[i] = split_by_point[i][1:]

# Remove the '}' from the last string in the array.
split_by_point[len(split_by_point)-1] = split_by_point[len(split_by_point)-1][:-1]


# Array of arrays. Inner array is [x, y, z] values for each point of data.
split_by_data = []

max_x = 0
min_x = 0
max_y = 0
min_y = 0
max_z = 0
min_z = 0

for i in range(len(split_by_point)):
	temp_array = split_by_point[i].split(',')

	x = int(temp_array[0][4:])
	y = int(temp_array[1][4:])
	z = int(temp_array[2][4:])

	split_by_data.append([x, y, z])

	if x < min_x:
		min_x = x
	if x > max_x:
		max_x = x

	if y < min_y:
		min_y = y
	if y > max_y:
		max_y = y

	if z < min_z:
		min_z = z
	if z > max_z:
		max_z = z

print 'min_x: ' + str(min_x)
print 'max_x: ' + str(max_x)
print 'min_y: ' + str(min_y)
print 'max_y: ' + str(max_y)
print 'min_z: ' + str(min_z)
print 'max_z: ' + str(max_z)


# Print out each data.
# for i in range(len(split_by_data)):
# 	print split_by_data[i]

print split_by_data





function select (data, key, values) {
	return data.filter(function (item_data) {
		return values.some(function (item_values) {
			return item_data[key] === item_values;
		})
	})
}

function set (name, val) {
  var json = JSON.stringify(val)
  return localStorage.setItem(name, json)
}
function get (name) {
  var data = localStorage.getItem(name)
  return JSON.parse(data)
}

export default {
	set: set,
	get: get
}

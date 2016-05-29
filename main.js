var users = [
	{
		username: "user1",
		password: "user1"
	},
	{
		username: "user2",
		password: "user2"
	},
]

function getInfo() {
	var username = document.getElementById('username').value
	var password = document.getElementById('password').value

	for(var i = 0; i < users.length; i++) {
		if(username == users[i].username && password == users[i].password) {
			console.log(username + " is logged in!!!")
			return
		}
	}
	console.log("incorrect username or password")
}

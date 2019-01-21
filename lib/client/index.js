const request = require("request");

module.exports = class HouseClient {
    setToken(token) {
        this.token = token
    }
    setEmployeeID(id) {
        this.employeeID = id
    }
    setPlayerID(id) {
        this.playerID = id
    }
    getPlayerID(){
        return this.playerID
    }
    login(username, password, callback) {
        request.post({
            "headers": { "content-type": "application/json", "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/authentication/token",
            "body": JSON.stringify({
                "username": username,
                "password": password
            })
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    getRoster(callback) {
        request.get({
            "headers": { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/roster"
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    addMembershipTime(type, amount, callback) {
        request.put({
            "headers": { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/player/" + this.playerID + "/membership?type=" + type + "&amount=" + amount
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    getPlayerMembership(callback) {
        request.get({
            "headers": { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/player/" + this.playerID + "/membership"
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    createMembership(membership, callback) {
        request.post({
            "headers": { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/player/" + this.playerID + "/membership",
            "body": JSON.stringify(membership)
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    createPlayer(player, callback) {
        request.post({
            "headers": { "content-type": "application/json", "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/player",
            "body": JSON.stringify(player)
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    checkinPlayer(callback) {
        request.get({
            "headers": { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/player/" + this.playerID + "/checkin"
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    checkoutPlayer(callback) {
        request.get({
            "headers": { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/player/" + this.playerID + "/checkout"
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    getPlayer(callback) {
        request.get({
            "headers": { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/player/" + this.playerID
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    updatePlayer(player, callback) {
        request.put({
            "headers": { "content-type": "application/json", "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/player/" + this.playerID,
            "body": JSON.stringify(player)
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    createEmployee(employee, callback) {
        request.post({
            "headers": { "content-type": "application/json", "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/employee",
            "body": JSON.stringify(employee)
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    getEmployee(callback) {
        request.get({
            "headers": { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/employee/" + this.employeeID
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    updateEmployee(employee, callback) {
        request.put({
            "headers": { "content-type": "application/json", "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/employee/" + this.employeeID,
            "body": JSON.stringify(employee)
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    getEmployee(callback) {
        request.get({
            "headers": { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/employee/" + this.employeeID
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    getRoles(callback) {
        request.get({
            "headers": { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/employee/" + this.employeeID + "/roles",
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    createRole(role, callback) {
        request.post({
            "headers": { "content-type": "application/json", "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/employee/" + this.employeeID + "/roles",
            "body": JSON.stringify(role)
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
    search(query, callback) {
        request.get({
            "headers": { "content-type": "application/json", "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            "url": "http://localhost:5000/house/api/v1/search?q=" + query,
        }, (error, response, body) => {
            if (error) {
                callback([false, {"error":"Unable to connect to server"}]);
            } else if (response) {
                if (response.statusCode == 200) {
                    callback([true, JSON.parse(body)]);
                } else {
                    callback([false, JSON.parse(body)]);
                }
            }
        });
    }
}
const request = require("request");

module.exports = class HouseClient {
    constructor(){
        this.protocol = "https://"
        this.host = "localhost"
        this.port = "4443"
        this.apiroute = "/house/api/v1"
        this.url = this.protocol + this.host + ":" + this.port + this.apiroute
    }
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
            rejectUnauthorized: false,
            headers: { "content-type": "application/json", "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/authentication/token`,
            body: JSON.stringify({
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
            rejectUnauthorized: false,
            headers: { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/roster`
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
            rejectUnauthorized: false,
            headers: { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/player/${this.playerID}/membership?type=${type}&amount=${amount}`
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
            rejectUnauthorized: false,
            headers: { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/player/${this.playerID}/membership`
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
            rejectUnauthorized: false,
            headers: { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/player/${this.playerID}/membership`,
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
            rejectUnauthorized: false,
            headers: { "content-type": "application/json", "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/player`,
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
            rejectUnauthorized: false,
            headers: { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/player/${this.playerID}/checkin`
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
            rejectUnauthorized: false,
            headers: { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/player/${this.playerID}/checkout`
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
            rejectUnauthorized: false,
            headers: { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/player/${this.playerID}`
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
            rejectUnauthorized: false,
            headers: { "content-type": "application/json", "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/player/${this.playerID}`,
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
            rejectUnauthorized: false,
            headers: { "content-type": "application/json", "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/employee`,
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
            rejectUnauthorized: false,
            headers: { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/employee/${this.employeeID}`
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
            rejectUnauthorized: false,
            headers: { "content-type": "application/json", "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url:  `${this.url}/employee/${this.employeeID}`,
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
            rejectUnauthorized: false,
            headers: { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/employee/${this.employeeID}`
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
            rejectUnauthorized: false,
            headers: { "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/employee/${this.employeeID}/roles`,
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
            rejectUnauthorized: false,
            headers: { "content-type": "application/json", "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/employee/${this.employeeID}/roles`,
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
            rejectUnauthorized: false,
            headers: { "content-type": "application/json", "Authorization": "Bearer " + this.token, "User-Agent": "MAPP Client/1.0" },
            url: `${this.url}/search?q=${query}`,
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
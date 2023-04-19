"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var express_1 = __importDefault(require("express"));
// import open from "open";
var child_process_1 = __importDefault(require("child_process"));
var server = new ws_1.WebSocketServer({ port: 1234 });
server.on("connection", function (socket) {
    // 向客户端发送消息
    socket.send(JSON.stringify({
        msg: "hello from server",
        code: "200",
    }));
    // 从客户端接收消息
    socket.addEventListener("message", function (_a) {
        var data = _a.data;
        try {
            // 第一次收到消息时, 给每个实例标记类型
            var response = JSON.parse(data);
            if (response.type == "unity") {
                socket.type = "unity";
            }
            if (response.type == "web") {
                socket.type = "web";
            }
            console.log(response);
            // 收到unity上报的房间信息就把消息转发给每个web类型的客户端
            if (socket.type == "unity" && response.type == "home_status") {
                server.clients.forEach(function (client) {
                    if (client.type == "web") {
                        client.send(data);
                    }
                });
            }
            // 收到web端的消息就转发给unity
            if (socket.type == "web" && response.command == "ctrl") {
                server.clients.forEach(function (client) {
                    if (client.type == "unity") {
                        client.send(data);
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
});
var app = (0, express_1.default)();
app.use(express_1.default.static("public"));
var PORT = 8960;
try {
    app.listen(PORT, function () {
        console.log("Server is listening on port 3000");
        // open(`http://localhost:${PORT}`);
        child_process_1.default.exec("start http://localhost:".concat(PORT));
    });
}
catch (error) {
    console.log("端口被占用 重新尝试");
    PORT += Math.floor(Math.random() * 1000);
    app.listen(PORT, function () {
        console.log("Server is listening on port 3000");
        // open(`http://localhost:${PORT}`);
        child_process_1.default.exec("start http://localhost:".concat(PORT));
    });
}

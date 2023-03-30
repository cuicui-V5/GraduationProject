interface ExtendedWebSocket extends WebSocket {
    type: "unity" | "web";
}
import WebSocket, { WebSocketServer } from "ws";
const server = new WebSocketServer({ port: 1234 });

server.on("connection", (socket: ExtendedWebSocket) => {
    // 向客户端发送消息
    socket.send(
        JSON.stringify({
            msg: "hello from server",
            code: "200",
        }),
    );

    // 从客户端接收消息
    socket.addEventListener("message", ({ data }) => {
        try {
            // 第一次收到消息时, 给每个实例标记类型
            const response = JSON.parse(data as string);

            if (response.type == "unity") {
                socket.type = "unity";
            }
            if (response.type == "web") {
                socket.type = "web";
            }

            console.log(response);
            // 收到unity上报的房间信息就把消息转发给每个web类型的客户端
            if (socket.type == "unity" && response.type == "home_status") {
                server.clients.forEach(client => {
                    if ((client as ExtendedWebSocket).type == "web") {
                        client.send(data);
                    }
                });
            }
            // 收到web端的消息就转发给unity
            if (socket.type == "web" && response.command == "ctrl") {
                server.clients.forEach(client => {
                    if ((client as ExtendedWebSocket).type == "unity") {
                        client.send(data);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    });
});

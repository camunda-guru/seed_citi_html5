﻿<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.WebSockets;
using System.Net.WebSockets;
using System.Threading.Tasks;
using System.Threading;
using System.Text;

public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        if (context.IsWebSocketRequest)
        {
            context.AcceptWebSocketRequest(ProcessWSChat);
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
    private async Task ProcessWSChat(AspNetWebSocketContext context)
    {
        WebSocket socket = context.WebSocket;
        while (true)
        {
            ArraySegment<byte> buffer = new ArraySegment<byte>(new byte[1024]);
            WebSocketReceiveResult result = await socket.ReceiveAsync(buffer, CancellationToken.None);
            if (socket.State == WebSocketState.Open)
            {
                string userMessage = Encoding.UTF8.GetString(buffer.Array, 0, result.Count);
                userMessage = "I receieved message as : " + userMessage + " at " + DateTime.Now.ToLongTimeString() + "Kindly respond";
                buffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(userMessage));
                await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
            }
            else
            {
                break;
            }
        }
    }
}
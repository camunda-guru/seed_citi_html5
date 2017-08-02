package com.polaris.demo.sockets;

import java.io.IOException;
import java.util.Date;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/SocketDemo")
public class SocketDemo {
	@OnOpen
	public void open()
	{
		System.out.println("Connection established");
	}
	@OnMessage
	public void message(String message, Session session)
	{
		System.out.println("Received from Client as"+message);
		int count=0;
		try {
			session.getBasicRemote().sendText
			("Response from server"+new Date().getTime()
					+"sending.....");
			while(count<5)
			{
				session.getBasicRemote().sendText("Response from server"+new Date().toLocaleString()
						+"sending.....");
				Thread.sleep(1000);
				count++;
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@OnClose
	public void close()
	{
		System.out.println("Connection terminated....");
	}

}

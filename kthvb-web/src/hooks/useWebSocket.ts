import { useState, useEffect, useCallback } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'

// define messages type
type Message = {
  type: string
  message: string
}

function useWebSocket (initialUrl: string): [Message[], (message: any) => void, React.Dispatch<React.SetStateAction<string>>] {
  const [socketUrl, setSocketUrl] = useState(initialUrl)
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<ReconnectingWebSocket | null>(null)

  useEffect(() => {
    if (socketUrl) {
      const ws = new ReconnectingWebSocket(socketUrl);
  
      ws.addEventListener('open', (event: any) => {
        console.log('WebSocket connected:', event);
      });
  
      ws.addEventListener('message', (event: any) => {
        try {
          // Parse the JSON string to a JavaScript object
          const newMessage = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      });
  
      ws.addEventListener('close', (event: any) => {
        console.log('WebSocket disconnected:', event);
      });
  
      ws.addEventListener('error', (event: any) => {
        console.error('WebSocket error:', event);
      });
  
      setSocket(ws);
  
      // Clean up on component unmount or when socketUrl changes
      return () => {
        ws.close();
      };
    }
  }, [socketUrl]);

  const sendMessage = useCallback(
    (message: any) => {
      if (socket) {
        socket.send(message)
      }
    },
    [socket]
  )

  return [messages, sendMessage, setSocketUrl]
}

export default useWebSocket

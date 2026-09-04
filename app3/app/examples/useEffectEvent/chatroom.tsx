import { useEffect, useEffectEvent, useState } from "react";
import {AlertDialog} from "radix-ui";

export function ChatRoom()
{
      const [roomId, setRoomId] = useState<number>(0);
    const [theme, setTheme] = useState("light");

    function showNotification(msg:string, theme: string)
    {

    }

    function createConnection(roomId: number){
        let state: boolean = false;
        let id: number = roomId;
        return {
            state,
            id,
            setId(num: number){this.id = num},
            on(status: string, cb: () => void): void { if(status == "connected" && this.state == true) cb();},
           connect() { this.state = true},
           disconnect() {this.state = false},
            
        };
    }
  const onConnected = useEffectEvent(() => {
    showNotification("Connected!", theme);
  });

  useEffect(() => {
    const connection = createConnection(roomId);

    connection.on("connected", onConnected);

    connection.connect();

    return () => connection.disconnect();
  }, [roomId]);

 return (
    <p>something</p>
 )

}

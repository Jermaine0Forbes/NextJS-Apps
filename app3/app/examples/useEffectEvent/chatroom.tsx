import { useEffect, useEffectEvent, useState } from "react";

export function ChatRoom()
{
        const [roomId, setRoomId] = useState();
    const [theme, setTheme] = useState();

    function createConnection(roomId: number){
        let state: boolean = false;
        return {
            state,
            on: (status: string, cb: () => void): void => { if(status == "connected" && state == true) cb();},
           connect: () => ( state = true),
            get disconnect () => (this.state = false),
            
        };
    }
    function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification("Connected!", theme);
  });

  useEffect(() => {
    const connection = createConnection(roomId);

    connection.on("connected", onConnected);

    connection.connect();

    return () => connection.disconnect();
  }, [roomId]);
}

 return (
    <p>something</p>
 )

}

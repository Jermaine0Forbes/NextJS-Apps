import { useEffect, useEffectEvent, useState } from "react";

export default function useEffectEventPage()
{
    const [roomId, setRoomId] = useState();
    const [theme, setTheme] = useState();

    function createConnection(roomId: number){
        return {
            on : () => ( true)
        }
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
    return(
        <main>

        </main>
    )
}
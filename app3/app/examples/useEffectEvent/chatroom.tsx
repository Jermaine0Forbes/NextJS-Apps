import { useEffect, useEffectEvent, useState } from "react";
import { Flex, Switch, AlertDialog} from "@radix-ui/themes";

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
    <section>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Flex>
            {theme}:
          <Switch defaultChecked />
          </Flex>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450">
          <AlertDialog.Title>Notification Room: {roomId}</AlertDialog.Title>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </section>
 )

}

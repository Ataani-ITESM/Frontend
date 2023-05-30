import { openDB } from "idb";
import { useEffect, useState } from "react";

export const OfflineQueue = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const getMessages = async () => {
    // open a database and create an object store
    const db = await openDB("messagesDB", 1, {
      upgrade(db) {
        db.createObjectStore("messages");
      },
    });

    // get all messages from the store
    const messages = await db.getAll("messages");

    // set the messages state
    setMessages(messages);
  };

  // Useffect para obtener los mensajes de indexedDB
  // Inside your OfflineQueue component
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "New message added") {
        getMessages();
      }
    };

    // create a broadcast channel
    const broadcastChannel = new BroadcastChannel("messagesDB");

    // add event listener for new messages
    broadcastChannel.onmessage = handleMessage;

    getMessages(); // get messages initially

    // cleanup function to close the channel when the component unmounts
    return () => {
      broadcastChannel.close();
    };
  }, []);

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      setIsSyncing(true);

      getMessages().then(async (msgs) => {
        console.log("Messages to be sent: ", msgs);

        // Here, you can add the code to send the messages to the server

        const db = await openDB("messagesDB", 1);
        await db.clear("messages");

        setIsSyncing(false);
      });
    }
  }, [isOnline]);

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold">Cola de mensajes</h2>
      <div className="flex items-center mt-2">
        <div
          className={`h-3 w-3 rounded-full ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <div>&nbsp;{isOnline ? "Online" : "Offline"}</div>
      </div>
      {isSyncing && <p>Sync in progress...</p>}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className="border-gray-200 border-2 rounded-md p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <p className="text-lg font-semibold">{message.mensaje}</p>
            <p className="text-gray-500 text-sm mt-2">
              {message.nombre} | {message.claveFamiliar}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

import { useState } from "react";
import { openDB } from "idb";

export const SendForm = () => {
  const [useKey, setUseKey] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [familyKey, setFamilyKey] = useState("");
  const [message, setMessage] = useState("");

  const onKeyToggle = (e: any) => {
    setUseKey((cur) => !cur);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Nombre: ", firstName);
    console.log("Clave familiar: ", familyKey);
    console.log("Mensaje: ", message);

    // open a database and create an object store
    const db = await openDB("messagesDB", 1, {
      upgrade(db: any) {
        db.createObjectStore("messages");
      },
    });

    // create a new date-based key for this message
    const key = Date.now().toString();

    // add the message to the store
    await db.put(
      "messages",
      {
        nombre: firstName,
        claveFamiliar: familyKey,
        mensaje: message,
      },
      key
    );

    // Create a broadcast channel
    const broadcastChannel = new BroadcastChannel("messagesDB");
    // Send a message to the channel
    broadcastChannel.postMessage("New message added");

    setFirstName("");
    setFamilyKey("");
    setMessage("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-2">
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label className="block text-xl font-medium leading-6 text-gray-900">
                  Nombre
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  placeholder="Escribe tu nombre"
                  className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="col-span-6">
                <span className="flex">
                  <label className="block text-xl font-medium leading-6 text-gray-900">
                    Clave familiar
                  </label>
                  <label className="ml-2 relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      onChange={onKeyToggle}
                      checked={useKey}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>{" "}
                  </label>
                </span>
                <input
                  type="text"
                  disabled={!useKey}
                  name="family-key"
                  id="family-key"
                  placeholder="Escribe tu clave"
                  className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  value={familyKey}
                  onChange={(e) => setFamilyKey(e.target.value)}
                />
              </div>

              <div className="col-span-6">
                <label className="block text-xl font-medium leading-6 text-gray-900">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="resize-none rounded-md border-0 mt-2 w-full p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  rows="7"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-green-600 py-2 px-3 text-lg font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
            >
              Publicar mensaje
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { openDB } from "idb";
import { v4 as uuidv4 } from "uuid";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

export const SendForm = () => {
  const [useKey, setUseKey] = useState(false);
  const [formData, setFormData] = useState<{
    name?: string;
    secret?: string;
    message?: string;
  }>({});
  const [loading, setLoading] = useState(false); // New loading state
  const [isOnline, setIsOnline] = useState(true);

  let imgFile: File | null = null;

  const storage = new ThirdwebStorage();

  const onKeyToggle = (e: any) => {
    setUseKey((cur) => !cur);
  };

  const handleInputChange = (e: any) => {
    if (e.target.name === "img") {
      imgFile = e.target.files[0];
      return;
    }
    setFormData((cur) => ({
      ...cur,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    // initial online status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when form is submitted

    let uri = "";
    try {
      if (imgFile !== null) {
        uri = await storage.upload(imgFile);
        uri = "https://ipfs.io/ipfs/" + uri.split("//")[1];
      }
      console.log(uri);
    } catch (error) {
      console.log("Error uploading IPFS");
    }

    setFormData((cur) => ({
      ...cur,
    }));

    const form = { ...formData, img: uri };

    if (!isOnline) {
      // open a database and create an object store
      const db = await openDB("messagesDB", 1, {
        upgrade(db) {
          db.createObjectStore("messages", { autoIncrement: true });
        },
      });

      console.log("adding message to the store", form);

      // add the message to the store
      const id = uuidv4();
      await db.add("messages", { ...form, id }, id);

      // create a broadcast channel
      const broadcastChannel = new BroadcastChannel("messagesDB");

      // send a message to the channel
      broadcastChannel.postMessage("New message added");

      toast.success("Mensaje agregado a la cola");
      setLoading(false); // Set loading to false when form is submitted
      setFormData({});
      return;
    } else {
      fetch("api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Mensaje publicado");
        })
        .catch((err) => {
          toast.error("Error al publicar el mensaje");
        });
    }

    setLoading(false); // Set loading to false when form is submitted
    setFormData({});
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
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Escribe tu nombre"
                  className="transition-all mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 disabled:bg-slate-200 disabled:cursor-not-allowed"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="col-span-6">
                <label className="block text-xl font-medium leading-6 text-gray-900">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Escribe tu mensaje"
                  value={formData.message || ""}
                  onChange={handleInputChange}
                  className="resize-none rounded-md border-0 mt-2 w-full p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 disabled:bg-slate-200 disabled:cursor-not-allowed transition-all"
                  rows={7}
                  disabled={loading}
                />
              </div>

              <div className="col-span-6">
                <label className="block text-xl font-medium leading-6 text-gray-900">
                  Subir Imágen (IPFS)
                </label>
                <input
                  onChange={handleInputChange}
                  accept="image/png, image/jpeg"
                  name="img"
                  className="block p-1.5 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none sm:text-lg sm:leading-6 disabled:bg-slate-200"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                />
                <p className="mt-1 text-sm text-gray-500" id="file_input_help">
                  PNG o JPG.
                </p>
              </div>
            </div>
          </div>
          {isOnline ? (
            <></>
          ) : (
            <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
              <p className="text-sm text-gray-500">
                Estás fuera de línea, el mensaje se enviará cuando tengas
                conexión a internet.
              </p>
            </div>
          )}
          <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-green-600 py-2 px-3 text-lg font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all"
              disabled={loading || !formData.name || !formData.message}
            >
              Publicar mensaje
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

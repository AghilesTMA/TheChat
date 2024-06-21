import React, { useContext, useEffect, useRef, useState } from "react";
import PageContainer from "../components/PageContainer";
import Icon from "../components/Icon";
import Avatar from "../components/Avatar";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { ChatContext } from "../context/ChatProvider";
import chatIll from "../assets/chat.png";
import { SocketContext } from "../context/SocketProvider";

const ChatBody = () => {
  const [msgs, setMsgs] = useState([]);
  const { socket } = useContext(SocketContext);
  const { currContact } = useContext(ChatContext);
  const [msg, setMsg] = useState("");
  const { id } = useContext(AuthContext);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (msg === "") return;
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:3000/messages/addmessage",
        data: {
          to: currContact.id,
          text: msg,
        },
        withCredentials: true,
      });
      socket.emit("send-message", currContact.id, id, msg);
      setMsgs((prev) => [...prev, { ...res.data.data }]);
      setMsg("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:3000/messages/getmessages/${currContact.id}`,
          withCredentials: true,
        });
        setMsgs(res.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    if (currContact.id) {
      getAllMessages();
    }
  }, [currContact]);

  useEffect(() => {
    if (socket) {
      socket.on("recieve-msg", (_, msg) => {
        console.log("you recieved a message:", msg);
        setMsgs((prev) => [...prev, { fromSelf: false, text: msg }]);
      });
    }
  }, []);

  useEffect(() => {
    if(!chatRef.current) return
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [msgs]);

  return (
    <div className=" flex flex-col gap-8">
      {currContact.id ? (
        <>
          <div className=" flex gap-1 items-center bg-bg-primary p-1 rounded shadow">
            <Avatar
              avatar={currContact.avatar}
              className=" w-12 h-12 rounded-full"
            />
            <span className=" font-semibold text-xl">
              {currContact.userName}
            </span>
          </div>

          <div
            ref={chatRef}
            className=" bg-bg-primary shadow rounded flex flex-col overflow-y-auto overflow-x-hidden max-h-60"
          >
            {msgs.length < 1 && (
              <p className=" font-semibold p-4">
                Send your first message to{" "}
                <span className=" text-blue-active">
                  {currContact.userName}!
                </span>
              </p>
            )}
            {msgs?.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.fromSelf ? " justify-end" : "justify-start"
                } flex p-1 font-medium`}
              >
                <span
                  className={`${
                    msg.fromSelf
                      ? "bg-blue-active text-white"
                      : " bg-white text-black"
                  } p-2 rounded-xl  max-w-xs `}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className=" bg-bg-primary flex gap-2 p-2 rounded shadow">
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className=" p-2 w-full rounded-md"
              name=""
              id=""
            ></textarea>
            <button
              onClick={sendMessage}
              className=" bg-blue-active p-4 rounded-xl text-white font-semibold hover:scale-105 active:scale-95"
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <div className=" flex flex-col items-center gap-12 bg-bg-primary p-4">
          <img src={chatIll} alt="illustration" className=" max-w-xs" />
          <p className=" font-semibold text-2xl">Please choose your Contact!</p>
        </div>
      )}
    </div>
  );
};

const ContactCard = ({ avatar, userName, contact, id }) => {
  const { dispatch } = useContext(ChatContext);
  const handleAddContact = async () => {
    try {
      await axios({
        method: "patch",
        url: "http://localhost:3000/users/addcontact",
        data: {
          contactId: id,
        },
        withCredentials: true,
      });
      dispatch({ type: "ADD_CONTACT", payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveContact = async () => {
    try {
      await axios({
        method: "patch",
        url: "http://localhost:3000/users/removecontact",
        data: {
          contactId: id,
        },
        withCredentials: true,
      });
      dispatch({ type: "REMOVE_CONTACT", payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectUser = () => {
    const payload = {
      id,
      avatar,
      userName,
    };
    dispatch({ type: "SET_CURR_CONTACT", payload });
  };

  return (
    <div className=" flex gap-2 bg-white p-2 justify-between items-center">
      <div onClick={handleSelectUser} className=" flex gap-2 cursor-pointer">
        <Avatar avatar={avatar} className=" rounded-full w-12 h-1/2" />
        <span className=" font-semibold text-lg">{userName}</span>
      </div>
      <div>
        {contact ? (
          <div onClick={handleRemoveContact}>
            <Icon
              type={"removeContact"}
              className={" cursor-pointer text-xl hover:text-blue-active"}
            />
          </div>
        ) : (
          <div onClick={handleAddContact}>
            <Icon
              type={"addContact"}
              className={" cursor-pointer text-xl hover:text-blue-active"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const SearchContact = () => {
  const [contacts, setContacts] = useState([]);
  const [userName, setUserName] = useState("");
  const { myList } = useContext(ChatContext);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:3000/users/getuser/${userName}`,
          withCredentials: true,
        });
        setContacts(res.data.users);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };
  return (
    <div className="p-2 w-full bg-bg-primary rounded-b-lg flex flex-col gap-2">
      <input
        onKeyDown={handleSearch}
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className=" p-2 rounded-full shadow w-full"
        placeholder="Type the name"
      />
      <div className=" flex flex-col gap-2 max-h-64 overflow-auto">
        {contacts?.map((user) => (
          <ContactCard
            id={user._id}
            key={user._id}
            avatar={user.avatar}
            userName={user.userName}
            contact={myList.includes(user._id)}
          />
        ))}
      </div>
    </div>
  );
};

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const { myList } = useContext(ChatContext);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await axios({
          method: "get",
          url: "http://localhost:3000/users/getcontacts",
          withCredentials: true,
        });
        setContacts(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);
  return (
    <div className=" p-2 bg-bg-primary w-full">
      <div className=" flex flex-col gap-2 p-2 max-h-80 overflow-auto w-full">
        {contacts.map((contact) => (
          <ContactCard
            id={contact._id}
            key={contact._id}
            avatar={contact.avatar}
            userName={contact.userName}
            contact={myList.includes(contact._id)}
          />
        ))}
      </div>
    </div>
  );
};

const Contacts = () => {
  const [active, setActive] = useState("search");

  return (
    <div className=" flex flex-col justify-start items-start">
      <div className=" flex">
        <div
          onClick={() => setActive("search")}
          className={` ${
            active === "search" ? " bg-bg-primary" : " "
          }  p-3 rounded-t-lg text-black`}
        >
          <Icon type={"search"} className={" cursor-pointer text-2xl "} />
        </div>
        <div
          onClick={() => setActive("contacts")}
          className={` ${
            active === "contacts" ? " bg-bg-primary" : " "
          }  p-3 rounded-t-lg text-black`}
        >
          <Icon type={"people"} className={" cursor-pointer text-2xl"} />
        </div>
      </div>
      {active === "search" && <SearchContact />}
      {active === "contacts" && <ContactList />}
    </div>
  );
};

const Home = () => {
  return (
    <PageContainer>
      <div className=" bg-white rounded p-2 w-[80%] shadow grid grid-cols-12 gap-8">
        <div className=" col-span-4">
          <Contacts />
        </div>
        <div className=" col-span-8">
          <ChatBody />
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;

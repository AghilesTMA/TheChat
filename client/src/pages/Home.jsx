import React, { useContext, useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import avatar1 from "../assets/avatar1.png";
import Icon from "../components/Icon";
import Avatar from "../components/Avatar";
import axios from "axios";
import { ChatContext } from "../context/ChatProvider";

const ChatBody = ({ userName }) => {
  const [msgs, setMsgs] = useState([
    { msg: "hello there!", sender: "achraf" },
    { msg: "hello, how are you doing?", sender: "aghiles" },
    { msg: "I'm fine, hope you're doing well too!", sender: "achraf" },
    { msg: "I'm good too, thanks for asking!", sender: "aghiles" },
  ]);

  const sendMessage = () => {
    if (msg === "") return;
    setMsgs((prev) => [...prev, { msg: msg, sender: "aghiles" }]);
    setMsg("");
  };

  const [msg, setMsg] = useState("");
  return (
    <div className=" flex flex-col gap-8">
      <div className=" flex gap-1 items-center bg-bg-primary p-1 rounded shadow">
        <img src={avatar1} alt="avatar" className=" w-12 h-12 rounded-full" />
        <span className=" font-semibold text-xl">{userName}</span>
      </div>

      <div className=" bg-bg-primary shadow rounded flex flex-col overflow-y-auto overflow-x-hidden max-h-60">
        {msgs.map((msg, idx) => (
          <div
            key={idx}
            className={`${
              msg.sender === "aghiles" ? " justify-end" : "justify-start"
            } flex p-1 font-medium`}
          >
            <span
              className={`${
                msg.sender === "aghiles"
                  ? "bg-blue-active text-white"
                  : " bg-white text-black"
              } p-2 rounded-xl  max-w-xs `}
            >
              {msg.msg}
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
    </div>
  );
};

const ContactCard = ({ avatar, userName, contact }) => {
  return (
    <div className=" flex gap-2 bg-white p-2 justify-between items-center">
      <div className=" flex gap-2 cursor-pointer">
        <Avatar avatar={avatar} className=" rounded-full w-12 h-1/2" />
        <span className=" font-semibold text-lg">{userName}</span>
      </div>
      <div>
        {contact ? (
          <Icon
            type={"removeContact"}
            className={" cursor-pointer text-xl hover:text-blue-active"}
          />
        ) : (
          <Icon
            type={"addContact"}
            className={" cursor-pointer text-xl hover:text-blue-active"}
          />
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
          <ChatBody userName={"Achraf Safi"} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
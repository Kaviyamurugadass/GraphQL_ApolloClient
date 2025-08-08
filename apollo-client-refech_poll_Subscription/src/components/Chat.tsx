import React, { useEffect, useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { MESSAGE_SUBSCRIPTION } from "../graphql/subscriptions";
import { SEND_MESSAGE } from "../graphql/mutations";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [sender, setSender] = useState("Kaviya");

  const { data: subData } = useSubscription(MESSAGE_SUBSCRIPTION, {
    onData: ({ data }) => {
      const msg = data?.data?.messageSent;
      if (msg) setMessages((prev) => [...prev, msg]);
    },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage({ variables: { content: text, sender } });
    setText("");
  };

  return (
    <div>
      <h2>Chat App</h2>
      <div style={{ height: 300, overflowY: "scroll", border: "1px solid black" }}>
        {messages.map((m, i) => (
          <div key={i}><b>{m.sender}:</b> {m.content}</div>
        ))}
      </div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

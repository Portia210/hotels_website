"use client";

import useTransStore from "@/store/useTransStore";
import { useEffect } from "react";

export default function TransConfig({ messages }) {
  const setMessages = useTransStore().setMessages;

  useEffect(() => {
    if (messages) setMessages(messages);
  }, [messages]);

  return <></>;
}

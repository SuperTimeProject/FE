"use client";

import { privateApi } from "@/api/axiosConfig";
import ChatRoom from "@/components/chat/chatRoom";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { getCookie } from "@/components/utils/setCookie";
import { CompatClient, Stomp, Message } from "@stomp/stompjs";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import GetUserInfo from "@/hook/getUserInfo";

export interface ChatMessage {
  type: string;
  content: string;
  sender: string;
  createdAt: string;
}

interface IChatRoom {
  roomCid: number;
  roomName: string;
  userCount: number;
}

export default function Chat() {
  const chatRoomRef = useRef<HTMLDivElement>(null);

  const [chatRoom, setChatRoom] = useState<IChatRoom>();
  const [message, setMessage] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [userCid, setUserCid] = useState<number>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  };

  useEffect(() => {
    const chatRoomDiv = chatRoomRef.current;
    if (chatRoomDiv) {
      chatRoomDiv.scrollTop = chatRoomDiv.scrollHeight;
    }
  }, [message]);

  // 유저가 소속되어 있는 채팅방
  useEffect(() => {
    const getChatRoom = async () => {
      try {
        const res = await privateApi.get(`/chatroom/`);
        setChatRoom(res.data.chatRoomList[0]);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            alert("참여중인 채팅방이 없습니다");
          }
          console.log(error.response?.data.message);
        }
      }
    };
    const setUserInfo = async () => {
      const res = await GetUserInfo();
      setUserCid(res.userCid);
    };
    getChatRoom();
    setUserInfo();
  }, []);

  // 채팅방을 불러왔을 시 채팅방 연결
  const client = useRef<CompatClient>();
  const connectHandler = (roomCid: number) => {
    client.current = Stomp.over(() => {
      const sock = new WebSocket("wss://supertime.site/ws");
      return sock;
    });
    client.current.connect(
      {
        token: getCookie(),
      },
      () => {
        //alert("연결이 성공적으로 이루어졌습니다.");
        client.current &&
          client.current.subscribe(`/sub/room/${roomCid}`, onMessageReceived, {
            token: getCookie()!,
          });
      }
    );
  };
  const onMessageReceived = (message: Message) => {
    const parsedMessage: ChatMessage = JSON.parse(message.body);
    const { type, content, sender, createdAt } = parsedMessage;

    const newMessage: ChatMessage = {
      type,
      content,
      sender,
      createdAt,
    };

    setMessage((pre) => [...pre, newMessage]);
  };

  // 채팅 보내기
  const sendHandler = (
    roomCid: number,
    userCid: number,
    chatMessage: string
  ) => {
    if (chatMessage === "") return;
    if (client.current) {
      client.current.send(
        `/pub/message/talk/${roomCid}`,
        {
          token: getCookie(),
        },
        JSON.stringify({
          userCid: userCid,
          content: chatMessage,
        })
      );
      setInputMessage("");
    }
  };

  useEffect(() => {
    if (chatRoom === undefined) return;

    connectHandler(chatRoom.roomCid);

    // 메시지 받아오는 함수
    const getOldMessage = async () => {
      try {
        const res = await privateApi.get(`/message/room/${chatRoom.roomCid}`);
        setMessage(res.data);
        console.log(res);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        }
      }
    };

    getOldMessage();
    return () => {
      disconnectHandler();
    };
  }, [chatRoom]);

  // 채팅창 나가기
  const disconnectHandler = () => {
    if (client.current) {
      console.log("연결해제");
      client.current.disconnect(() => {
        window.location.reload();
      });
    }
  };

  if (chatRoom === undefined || userCid === undefined)
    return <div>로딩중...</div>;

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-[767px] p-4 bg-white">
        <Header />
        <div className="w-full min-h-[600px] p-4 bg-white">
          <div className="flex justify-center text-lg font-bold pb-2 ">
            {chatRoom.roomName}
          </div>
          <div
            className="h-[450px] border-t-1 border-[#d1d5db] overflow-auto scrollbar-none mb-4"
            ref={chatRoomRef}
          >
            <ChatRoom messages={message} />
          </div>
          <div className="flex items-center justify-around">
            <Input
              type="text"
              value={inputMessage}
              onChange={handleChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendHandler(chatRoom.roomCid, userCid, inputMessage);
                }
              }}
              placeholder="메시지를 입력하세요"
              className="w-72"
              size="sm"
            />
            {/* <div onClick={() => sendHandler(chatRoom.roomCid, 1, inputMessage)}> */}
            <Button
              isIconOnly
              aria-label="post"
              className="bg-sub_purple float-right"
              onClick={() =>
                sendHandler(chatRoom.roomCid, userCid, inputMessage)
              }
            >
              {/* 메시지 테스트 */}
              <img src="/icons/up-arrow.png" width="25" />
            </Button>
            {/* </div> */}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

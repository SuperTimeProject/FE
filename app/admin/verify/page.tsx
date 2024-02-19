"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UsersInfo {
  userId: number;
  userName: string;
  userNickname: string;
  part: string;
  semester: { semesterCid: number; semesterDetailName: string; isFull: string };
}

export default function AdminVerify() {
  const router = useRouter();
  const pathname = usePathname();
  const [usersInfo, setUsersInfo] = useState<UsersInfo[]>([]);
  const [userStatus, setUserStatus] = useState<string>("");

  const status = ["PENDING", "DENIED", "COMPLETED", "NEEDED"];

  useEffect(() => {
    const getUsersInfo = async () => {
      try {
        const response = await privateApi.get("/admin/pendingUser", {
          params: {
            valified: userStatus,
          },
        });

        if (response.data.success) {
          setUsersInfo(response.data.userList);
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message);
        }
      }
    };

    getUsersInfo();
  }, []);

  const handleStatus = async (userId: number, statusOption: string) => {
    try {
      const response = await privateApi.put("/admin/verification", null, {
        params: {
          userId: userId,
          verificationState: statusOption,
        },
      });
      if (response.data.success) {
        alert("인증상태가 변경되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button
                size="sm"
                variant="light"
                onClick={() => router.back()}
                className="text-xl"
              >
                {"<"}
              </Button>
              <p className="text-l">인증 리스트</p>
            </div>
          </div>
          <Divider className="my-2" />
          <div className="flex flex-col p-2 m-1 gap-2">
            <div className="h-[430px] overflow-auto scrollbar-none">
              {usersInfo?.map((user) => (
                <div
                  key={user.userId}
                  className="flex flex-col border-1.5 rounded-md border-gray-300 p-2 m-1"
                >
                  <div className="flex flex-col gap-2">
                    <p>{user.userId}</p>
                    <p>{user.userName}</p>
                    <p>{user.userNickname}</p>
                    <p>{user.semester.semesterCid}</p>
                    <p>{user.semester.semesterDetailName}</p>
                    <p>{user.semester.isFull}</p>
                    <p>{user.part}</p>

                    <Dropdown>
                      <DropdownTrigger>
                        <Button size="sm" variant="ghost">
                          {userStatus || "인증 상태"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        {status.map((statusOption) => (
                          <DropdownItem
                            key={statusOption}
                            onClick={() =>
                              handleStatus(user.userId, statusOption)
                            }
                          >
                            {statusOption}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

"use client";

import { UserList, getPendingUsers } from "@/api/admin/adminVerify";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminVerify() {
  const router = useRouter();
  const pathname = usePathname();
  const [usersInfo, setUsersInfo] = useState<UserList[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getUsersInfo = async () => {
      try {
        const users = await getPendingUsers(page);
        setUsersInfo(users);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
        }
      }
    };

    getUsersInfo();
  }, []);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-[767px] p-4 bg-white">
        <Header />
        <div className="w-full min-h-[600px] p-4 bg-white">
          <div className="flex items-center pl-1 pr-1 mt-3 mb-2">
            <div
              className="flex-none cursor-pointer"
              onClick={() => router.back()}
            >
              <img
                src="/icons/back.png"
                width="30"
                height="30"
                className="flex-none"
              />
            </div>
            <div className="w-[100%] text-xl flex justify-center pl-3 pr-3">
              <p className="text-xl">인증 관리</p>
            </div>
          </div>
          <div className="flex flex-col p-2 m-1 gap-2">
            <div className="h-[500px] overflow-auto scrollbar-none">
              {usersInfo.length === 0 ? (
                <p className="text-center text-gray-500">
                  인증 요청 내역이 없습니다.
                </p>
              ) : (
                usersInfo.map((user) => (
                  <div
                    key={user.userId}
                    className="flex flex-col border-1.5 rounded-md border-gray-300 p-2 m-1 relative"
                    onClick={() => router.push(`${pathname}/${user.userId}`)}
                  >
                    <button>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center p-2">
                          <p className="text-sm">{user.userId}</p>
                          <p className="text-xs">{user.valified}</p>
                        </div>
                      </div>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider } from "@nextui-org/react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UsersData {
  userCid: number;
  userId: string;
  userName: string;
  userNickname: string;
  image: {
    authImageCid: number;
    authImageFileName: string;
    authImageFilePath: string;
  };
  semester: number;
  valified: string;
}

export default function AdminVerify() {
  const router = useRouter();
  const pathname = usePathname();
  const [usersInfo, setUsersInfo] = useState<UsersData[]>([]);
  const [page, setPage] = useState(1);
  console.log(usersInfo);

  useEffect(() => {
    const getUsersInfo = async () => {
      try {
        const response = await privateApi.get(`/admin/pendingUser/${page}`, {
          params: {
            valified: "PENDING",
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

  // useEffect(() => {
  //   const getUsersInfo = async () => {
  //     try {
  //       const response = await privateApi.get(`/admin/pendingUser/${page}`, {
  //         params: {
  //           valified: "NEEDED",
  //         },
  //       });

  //       if (response.data.success) {
  //         setUsersInfo(response.data.userList);
  //       } else {
  //         alert("유저 정보를 불러오는데 실패했습니다.");
  //       }
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         alert(error.response?.data.message);
  //       }
  //     }
  //   };

  //   getUsersInfo();
  // }, []);

  // useEffect(() => {
  //   const getUsersInfo = async () => {
  //     try {
  //       const response = await privateApi.get(`/admin/pendingUser/${page}`, {
  //         params: {
  //           valified: "DENIED",
  //         },
  //       });

  //       if (response.data.success) {
  //         setUsersInfo(response.data.userList);
  //       } else {
  //         alert("유저 정보를 불러오는데 실패했습니다.");
  //       }
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         alert(error.response?.data.message);
  //       }
  //     }
  //   };

  //   getUsersInfo();
  // }, []);

  // useEffect(() => {
  //   const getUsersInfo = async () => {
  //     try {
  //       const response = await privateApi.get(`/admin/pendingUser/${page}`, {
  //         params: {
  //           valified: "COMPLETED",
  //         },
  //       });

  //       if (response.data.success) {
  //         setUsersInfo(response.data.userList);
  //       } else {
  //         alert("유저 정보를 불러오는데 실패했습니다.");
  //       }
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         alert(error.response?.data.message);
  //       }
  //     }
  //   };

  //   getUsersInfo();
  // }, []);

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
              <p className="text-l">인증 요청</p>
            </div>
          </div>
          <Divider className="my-2" />
          <div className="flex flex-col p-2 m-1 gap-2">
            <div className="h-[500px] overflow-auto scrollbar-none">
              {usersInfo?.map((user) => (
                <div
                  key={user.userId}
                  className="flex flex-col border-1.5 rounded-md border-gray-300 p-2 m-1 relative"
                  onClick={() =>
                    router.push(`${pathname}/detail/${user.userId}`)
                  }
                >
                  <button>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center p-2">
                        <p>{user.userId}</p>
                        <p className="text-sm">{user.valified}</p>
                      </div>
                    </div>
                  </button>
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

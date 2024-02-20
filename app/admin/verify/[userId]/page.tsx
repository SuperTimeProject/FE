"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserDetail {
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

export default function AdminVerifyDetail({ params }: { params: { userId: string } }) {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState<UserDetail>();
  const status = ["PENDING", "DENIED", "COMPLETED", "NEEDED"];

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await privateApi.get(`/admin/pendingUser/detail/${params.userId}`);
        console.log(response.data);
        setUserDetail(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message);
        }
      }
    };

    getUserDetail();
  }, []);

  const handleStatus = async (valified: string) => {
    const userid = decodeURIComponent(params.userId);
    console.log(userid);
    try {
      const response = await privateApi.put("/admin/verification", null, {
        params: {
          userId: userid,
          valified: valified,
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

  if (userDetail === undefined) return <div>로딩중...</div>;

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <div className="w-96 h-[600px] m-2 p-4 border-1 border-[#d1d5db] bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button size="sm" variant="light" onClick={() => router.back()} className="text-xl">
                {"<"}
              </Button>
              <div>
                <p>{userDetail?.userName}</p>
                <p>{userDetail?.semester}</p>
              </div>
            </div>
          </div>
          <Divider className="my-2" />
          <div className="flex flex-col p-2 m-1 gap-2">
            <div className="h-[430px] overflow-auto scrollbar-none">
              {userDetail && (
                <>
                  <img className=" w-[200px] h-[150px]" src={userDetail?.image?.authImageFilePath} alt="" />

                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="sm" variant="ghost">
                        {userDetail?.valified || "인증 상태"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      {status.map((valified) => (
                        <DropdownItem key={valified} onClick={() => handleStatus(valified)}>
                          {valified}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

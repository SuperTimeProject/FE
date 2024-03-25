"use client";

import { privateApi } from "@/api/axiosConfig";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import axios from "axios";
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

export default function AdminVerifyDetail({
  params,
}: {
  params: { userId: string };
}) {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState<UserDetail>();
  const status = ["PENDING", "DENIED", "COMPLETED", "NEEDED"];

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await privateApi.get(
          `/admin/pendingUser/detail/${params.userId}`
        );
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
        router.back();
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
              <p className="text-xl">{userDetail.userName}</p>
            </div>
          </div>

          <div className="flex flex-col p-2 m-1 gap-2">
            <div className="h-[430px] overflow-auto scrollbar-none flex flex-col items-center justify-center">
              {userDetail && (
                <>
                  <img
                    src={userDetail?.image?.authImageFilePath}
                    alt=""
                    className="mb-4"
                  />

                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="sm" variant="ghost">
                        {userDetail?.valified || "인증 상태"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      {status.map((valified) => (
                        <DropdownItem
                          key={valified}
                          onClick={() => handleStatus(valified)}
                        >
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

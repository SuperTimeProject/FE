"use client";

import {
  UserList,
  getPendingUsersDetail,
  updateVerificationStatus,
} from "@/api/admin/adminVerify";
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

export default function AdminVerifyDetail({
  params,
}: {
  params: { userId: string };
}) {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState<UserList>();
  const status = ["PENDING", "DENIED", "COMPLETED", "NEEDED"];

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const detail = await getPendingUsersDetail(params.userId);
        setUserDetail(detail);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
        }
      }
    };

    fetchUserDetail();
  }, []);

  const handleStatus = async (valified: string) => {
    const userid = decodeURIComponent(params.userId);
    try {
      const success = await updateVerificationStatus(userid, valified);
      if (success) {
        alert("인증 상태가 변경되었습니다.");
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
    <div className="flex min-h-screen justify-center items-center">
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
              <p className="text-xl">{userDetail.userName}</p>
            </div>
          </div>

          <div className="flex flex-col p-2 m-1 gap-2">
            <div className="min-h-[430px] overflow-auto scrollbar-none flex flex-col items-center justify-center">
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

"use client";

import { getSemesterList } from "@/api/admin/semester";
import { Semester } from "@/api/user/profile";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminSemester() {
  const router = useRouter();
  const pathname = usePathname();

  const [page, setPage] = useState(1);
  const [semesters, setSemesters] = useState<Semester[]>([]);

  useEffect(() => {
    const getSemesters = async () => {
      try {
        const response = await getSemesterList();
        setSemesters(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
        }
      }
    };

    getSemesters();
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
              <p className="text-xl">기수 관리</p>
            </div>
            <Button
              isIconOnly
              className="bg-sub_purple"
              onClick={() => router.push(`${pathname}/create`)}
            >
              <img
                src="/icons/post.png"
                width="30"
                height="30"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Button>
          </div>
          <div className="flex flex-col p-2 m-1 gap-2">
            <div className="h-[500px] overflow-auto scrollbar-none">
              {semesters.length === 0 ? (
                <p className="text-center text-gray-500">
                  기수가 존재하지 않습니다.
                </p>
              ) : (
                semesters.map((semester) => (
                  <div
                    key={semester.semesterCid}
                    className="flex flex-col border-1.5 rounded-md border-gray-300 p-2 m-1 relative"
                    // onClick={() =>
                    //   router.push(`${pathname}/${semester.semesterCid}`)
                    // }
                  >
                    <button>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center p-2">
                          <p className="text-sm">
                            {semester.semesterDetailName}
                          </p>
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

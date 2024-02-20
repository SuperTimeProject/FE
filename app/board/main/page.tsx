import Footer from "@/components/footer";
import Header from "@/components/header";
import BoardComponent from "@/components/post/boardComponent";

export default function Main() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-[767px] flex flex-col items-center border-1 border-[#d1d5db] bg-white shadow-lg rounded-lg">
        <Header />
        <BoardComponent boardName={"전체 게시판"} />
        <Footer />
      </div>
    </div>
  );
}

// 페이지 3개가 동일함
// -> 페이지의 데이터값만 수정해서 같은 컴포넌트를 사용
// 게시판 데이터를 불러오기 위해서 필요한것들
// 1. boardCid -> UserBoard
// 2. boardName -> UserBoard
// 3. page -> state값으로 페이지 마다 보관
// 4. totalPage -> boardInfo

// 상위 컴포넌트 -> 헤더, 푸터, 현재 게시판 정보
// 메인페이지를 제외하고는 UserBoard정보를 넘겨받을수가 있음 (path값으로 받을수 있음)
// url에 게시판이름을 넣음 -> url에서 게시판 이름을 꺼내오고 userBoard에 있는 거랑 매치시켜서 cid를 가져옴
// 커뮤니티 = 커뮤니티 게시판, 2311기수 게시판 = 2311기수 게시판

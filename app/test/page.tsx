import Header from "@/components/header";
import TestContent from "@/components/test/testContent";
import TestFooter from "@/components/test/testFooter";

export default function TestComponent() {
  return (
    <div className=" h-full relative w-full">
      <Header />
      <TestContent />
      <TestFooter />
    </div>
  );
}

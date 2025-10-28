import { Loader2Icon } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="bg-black w-screen h-dvh">
      <div className="flex items-center justify-center w-full h-full gap-4">
        <Loader2Icon className="animate-spin size-10 md:size-32 stroke-white" />
        <p className="text-lg md:text-4xl text-white">Loading resource...</p>
      </div>
    </div>
  );
};

export { PageLoader };

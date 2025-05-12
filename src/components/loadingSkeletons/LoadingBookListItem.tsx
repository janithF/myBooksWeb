import { Skeleton } from "../ui/skeleton";
import type { ViewMode } from "@/features/UI/UISlice";

interface Props {
  viewMode: ViewMode;
}

const LoadingBookListItem = ({ viewMode: viwMode }: Props) => {
  if (viwMode === "list") {
    return <Skeleton className="h-24 rounded-xl bg-gray-300 max-w-[800px] mb-2" />;
  }

  return (
    <div className="space-y-3">
      <Skeleton className="h-60 rounded-xl bg-gray-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-300" />
        <Skeleton className="h-4 w-[200px] bg-gray-300" />
      </div>
    </div>
  );
};

export default LoadingBookListItem;

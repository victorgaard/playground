import { indexRoute } from "@/main";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function Index() {
  const { error } = indexRoute.useSearch<{ error: string }>();
  return (
    <div className="flex h-full flex-1 flex-col gap-4 p-8">
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-900 bg-red-950 p-3 text-red-200">
          <ExclamationCircleIcon className="h-5 w-5" /> Error: {error}
        </div>
      )}
      <h1>Welcome Home!</h1>
    </div>
  );
}

export default Index;

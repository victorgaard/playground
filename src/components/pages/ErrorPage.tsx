import { errorRoute } from "@/main";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function ErrorPage() {
  const { error } = errorRoute.useSearch<{ error: string }>();

  return (
    <div className="flex h-full flex-1 flex-col gap-4 p-8">
      <h1>There was an error</h1>
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-900 bg-red-950 p-3 text-red-200">
          <ExclamationCircleIcon className="h-5 w-5" /> Error: {error}
        </div>
      )}
    </div>
  );
}

export default ErrorPage;

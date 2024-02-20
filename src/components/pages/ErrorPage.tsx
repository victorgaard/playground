import { errorRoute } from "@/main";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Alert from "../ui/Alert/Alert";

function ErrorPage() {
  const { error } = errorRoute.useSearch<{ error: string }>();

  return (
    <div className="flex h-full flex-1 flex-col gap-4 p-8">
      {error && (
        <Alert
          variant="error"
          title="Error"
          message={error}
          icon={<ExclamationCircleIcon className="h-5 w-5" />}
        />
      )}
    </div>
  );
}

export default ErrorPage;

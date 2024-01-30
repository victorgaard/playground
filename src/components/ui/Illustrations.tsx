import { TrashIcon } from "@heroicons/react/24/outline";

export function DestructiveIllustration() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-b from-red-400 to-red-600">
      <TrashIcon className="h-8 w-8 text-white" />
    </div>
  );
}

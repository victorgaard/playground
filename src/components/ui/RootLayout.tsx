import { routes } from "@/static/routes";
import { Link, Outlet, ScrollRestoration } from "@tanstack/react-router";

function RootLayout() {
  return (
    <main className="flex h-screen text-sm">
      <div className="flex min-w-64 flex-col gap-1 overflow-auto border-r border-gray-800 bg-black p-8 ">
        {routes.map((route) => (
          <Link
            key={route.href}
            to="/$component"
            params={{ component: route.href }}
            className="rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-900"
            activeProps={{ className: "bg-gray-900 text-white" }}
            activeOptions={{
              includeSearch: false,
            }}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <ScrollRestoration />
      <Outlet />
    </main>
  );
}

export default RootLayout;

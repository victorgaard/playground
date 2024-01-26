import { routes } from "@/static/routes";
import { Link, Outlet } from "@tanstack/react-router";

function Layout() {
  return (
    <main className="flex h-screen text-sm">
      <div className="flex min-w-64 flex-col gap-1 overflow-auto border-r border-gray-800 bg-black p-8 ">
        <Link
          to="/"
          className="rounded px-4 py-2 hover:bg-gray-900"
          activeProps={{ className: "bg-gray-900" }}
        >
          Home
        </Link>
        {routes.map((route) => (
          <Link
            key={route.href}
            to="/$component"
            params={{ component: route.href }}
            className="rounded px-4 py-2 hover:bg-gray-900"
            activeProps={{ className: "bg-gray-900" }}
            activeOptions={{
              includeSearch: false,
            }}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <Outlet />
    </main>
  );
}

export default Layout;

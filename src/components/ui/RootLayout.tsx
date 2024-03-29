import { routes } from "@/static/routes";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Link,
  Outlet,
  ScrollRestoration,
  getRouteApi,
} from "@tanstack/react-router";
import { useState } from "react";
import Button from "./Button/Button";
import { Typography } from "./Typography";
import { isObjectEmpty } from "@/utils/isObjectEmpty";
import { useWidth } from "@/hooks/useWidth";

const route = getRouteApi("/$component");

function RootLayoutMobile() {
  const [isExpanded, setIsExpanded] = useState(false);
  const params = route.useParams();
  const [activeRoute] = isObjectEmpty(params)
    ? [routes[0]]
    : routes.filter((route) => route.href === params.component);
  return (
    <main className="flex h-dvh flex-col text-sm selection:bg-yellow-500 selection:text-black">
        {!isExpanded && (
          <div className="flex items-center gap-4 p-8 pb-1">
            <Button
              variant="secondary"
              onClick={() => setIsExpanded(true)}
              isIcon
            >
              <Bars3Icon className="h-5 w-5 shrink-0" />
            </Button>
            <Typography.Paragraph extraContrast>
              {activeRoute.label}
            </Typography.Paragraph>
            <div />
          </div>
        )}
        {isExpanded && (
          <div className="flex flex-col animate-in fade-in slide-in-from-top-2 p-8">
            <div className="flex items-center gap-4 pb-6">
              <Button
                variant="secondary"
                onClick={() => setIsExpanded(false)}
                isIcon
              >
                <XMarkIcon className="h-5 w-5 shrink-0" />
              </Button>
              <Typography.Paragraph>
                Pick a component
              </Typography.Paragraph>
            </div>
            {routes.map((route) => (
              <Link
                key={route.href}
                to="/$component"
                params={{ component: route.href }}
                className="rounded-lg p-5 text-gray-400 transition-all hover:bg-gray-900"
                activeProps={{ className: "bg-gray-900 text-white" }}
                activeOptions={{
                  includeSearch: false,
                }}
                onClick={() => setIsExpanded(false)}
              >
                {route.label}
              </Link>
            ))}
          </div>
        )}
      {!isExpanded && <Outlet />}
    </main>
  );
}

function RootLayout() {
  const isResponsiveLayout = useWidth() <= 1024;
  if (isResponsiveLayout) return <RootLayoutMobile />;
  return (
    <main className="flex h-screen text-sm selection:bg-yellow-500 selection:text-black">
      <div className="flex w-64 flex-col gap-1 overflow-auto border-r border-gray-800 bg-black p-8">
        <Typography.Paragraph extraContrast className="pb-4">Components</Typography.Paragraph>
        {routes.map((route) => (
          <Link
            key={route.href}
            to="/$component"
            params={{ component: route.href }}
            className="rounded-lg p-2 text-gray-300 transition-all hover:bg-gray-900"
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

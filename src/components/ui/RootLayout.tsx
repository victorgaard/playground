import { routes } from "@/static/routes";
import { Bars3Icon, Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Link,
  Outlet,
  ScrollRestoration,
  getRouteApi,
} from "@tanstack/react-router";
import { useState } from "react";
import Button from "./Button/Button";
import { Typography } from "./Typography";

const route = getRouteApi("__root__");

function RootLayoutMobile() {
  const [isExpanded, setIsExpanded] = useState(false);
  const params = route.useParams<{ component: string }>();
  const [activeRoute] = routes.filter(
    (route) => route.href === params.component,
  );
  return (
    <main className="flex h-screen flex-col text-sm selection:bg-yellow-500 selection:text-black">
      <div className="flex w-full flex-col gap-1 overflow-auto border-r border-gray-800 bg-black p-8 pb-1">
        {!isExpanded && (
          <div className="flex items-center justify-between lg:hidden">
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
            <Button variant="tertiary" isIcon>
              <Cog6ToothIcon className="h-5 w-5 shrink-0" />
            </Button>
          </div>
        )}
        {isExpanded && (
          <>
            <div className="flex items-center gap-4 pb-6">
              <Button
                variant="secondary"
                onClick={() => setIsExpanded(false)}
                isIcon
              >
                <XMarkIcon className="h-5 w-5 shrink-0" />
              </Button>
              <Typography.Paragraph
                extraContrast
              >
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
          </>
        )}
      </div>
      {!isExpanded && <Outlet />}
    </main>
  );
}

function RootLayout() {
  return (
    <>
      <main className="hidden h-screen text-sm selection:bg-yellow-500 selection:text-black lg:flex">
        <div className="flex w-64 flex-col gap-1 overflow-auto border-r border-gray-800 bg-black p-8">
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
      <RootLayoutMobile />
    </>
  );
}

export default RootLayout;

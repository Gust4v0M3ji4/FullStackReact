import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/Header";
import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white text-black dark:bg-zinc-900 dark:text-white">
        <Header />

        <main className="flex-grow bg-gray-100 dark:bg-gray-800">
          <Outlet />
        </main>

        <TanStackRouterDevtools />
        <TanStackQueryLayout />
      </div>
    </>
  ),
});

import Button from "@/components/ui/Button/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { capitalize } from "@/utils/capitalize";
import { generateCodeSnippet } from "@/utils/generateCodeSnippet";
import { isObjectEmpty } from "@/utils/isObjectEmpty";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Link, useNavigate } from "@tanstack/react-router";
import { PropsForm } from "./PropsForm";
import { componentViewerRoute } from "@/main";

export function Component() {
  const navigate = useNavigate();
  const propsFromParams = componentViewerRoute.useSearch();
  const { component, Component, config } = componentViewerRoute.useLoaderData();
  const props = { ...config.defaultProps, ...propsFromParams };

  function handlePropChange(propName: string, value: string | boolean) {
    navigate({
      to: "/$component",
      params: { component },
      search: (prev) => ({ ...prev, [propName]: value }),
    });
  }

  return (
    <div className="flex h-full flex-1">
      <div className="flex flex-1 flex-col">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center border-b border-gray-800 pl-5 text-xs text-gray-400">
            <Link
              to="/$component"
              params={{ component }}
              className="px-3 pb-5 pt-8 transition-transform active:scale-90"
              activeProps={{
                className:
                  "underline text-white underline-offset-[23px] decoration-2 decoration-gray-600",
              }}
              activeOptions={{
                exact: true,
              }}
            >
              Default
            </Link>
            {Object.keys(config.examples).map((example) => (
              <Link
                key={example}
                to="/$component"
                params={{ component }}
                search={config.examples[example]}
                className="px-3 pb-5 pt-8 transition-transform active:scale-90"
                activeProps={{
                  className:
                    "underline text-white underline-offset-[23px] decoration-2 decoration-gray-600",
                }}
                activeOptions={{
                  exact: true,
                }}
              >
                {capitalize(example)}
              </Link>
            ))}
          </div>
          <div className="flex h-full items-center justify-center px-8">
            <Component {...props} />
          </div>
          {!isObjectEmpty(props) && (
            <ScrollArea.Root className="group relative shrink-0 overflow-hidden border-t border-gray-800">
              <Button
                size="sm"
                className="animate-fade-in absolute bottom-[18px] right-3 z-10 hidden group-hover:block"
                onClick={() =>
                  navigator.clipboard.writeText(
                    generateCodeSnippet({
                      component,
                      props,
                    }),
                  )
                }
              >
                <ClipboardIcon className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-0 right-0 top-0 z-0 w-12 bg-gradient-to-l from-gray-950" />
              <div className="absolute bottom-0 left-0 top-0 z-0 w-8 bg-gradient-to-r from-gray-950" />
              <ScrollArea.Viewport className="flex items-center p-6">
                <CodeBlock className="language-jsx whitespace-nowrap">
                  {generateCodeSnippet({
                    component,
                    props,
                  })}
                </CodeBlock>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="flex touch-none select-none bg-transparent p-0.5 transition-colors ease-out hover:bg-gray-800 data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                orientation="horizontal"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-gray-500" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          )}
        </div>
      </div>
      <ScrollArea.Root className="w-96 overflow-hidden border-l border-gray-800 text-sm">
        <ScrollArea.Viewport className="h-full w-full p-8">
          <PropsForm
            component={component}
            propValues={props}
            variantProps={config.variantProps}
            onPropChange={handlePropChange}
          />
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex touch-none select-none bg-transparent p-0.5 transition-colors ease-out hover:bg-gray-800 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-gray-500" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}

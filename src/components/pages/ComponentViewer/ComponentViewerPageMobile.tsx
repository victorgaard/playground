import Navbar from "./Navbar";
import CodeViewer from "./CodeViewer";
import { Props, PropsObj } from "@/static/types";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/Drawer";
import { PropsForm } from "./PropsForm";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

type ComponentViewerPageMobileProps<T> = {
  component: string;
  Component: React.FunctionComponent<PropsObj>;
  config: Props<PropsObj>["config"];
  props: PropsObj;
  onPropChange: (propName: keyof T, value: string | boolean | number) => void;
};

function ComponentViewerPageMobile<T extends PropsObj>({
  component,
  Component,
  config,
  props,
  onPropChange,
}: ComponentViewerPageMobileProps<T>) {
  return (
      <div className="flex h-full flex-col justify-between">
        <Navbar component={component} config={config} />
        <div className="flex h-full items-center justify-center p-8">
          <Component {...props} />
        </div>
        <div className="flex flex-col">
          <div className="self-center">
            <Drawer>
              <DrawerTrigger className="bg-gray-800 text-sm px-4 py-2.5 flex items-center gap-2 rounded-t-lg">
                <AdjustmentsHorizontalIcon className="h-5 w-5 opacity-50" />
                Props
              </DrawerTrigger>
              <DrawerContent>
                <div className="overflow-auto px-8 pb-12 text-sm">
                  <PropsForm
                    component={component}
                    propValues={props}
                    variantProps={config.variantProps}
                    onPropChange={onPropChange}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <CodeViewer component={component} props={props} />
        </div>
      </div>
  );
}

export default ComponentViewerPageMobile;

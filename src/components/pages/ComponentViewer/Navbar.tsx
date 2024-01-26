import { Props, PropsObj } from "@/static/types";
import { capitalize } from "@/utils/capitalize";
import { Link } from "@tanstack/react-router";

type NavbarProps = {
  component: string;
  config: Props<PropsObj>["config"];
};

function Navbar({ component, config }: NavbarProps) {
  return (
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
  );
}

export default Navbar;

import { ModeToggleV2 } from "@/components/mode-toggle-v2/mode-toggle-v2";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <span className="font-bold tracking-widest text-xl">TODO</span>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ModeToggleV2 />
        </div>
      </nav>
    </header>
  );
};

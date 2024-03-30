/// <reference types="vite-plugin-svgr/client" />

import { Button } from "@/components/ui/button";
import { CircleUserRoundIcon, MenuIcon, PlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateTaskForm } from "./create-task/CreateTaskForm";
import { ModeToggle } from "../mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppSelector } from "@/redux/hooks";
import TasklyLogo from "@/assets/taskly-logo.svg?react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SideBar } from "@/features/sideBar/SideBar";

export const Navbar = () => {
  const { photoURL } = useAppSelector((state) => state.auth);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 max-w-screen-2xl justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="mr-4 hidden md:flex">
            {/* <span className="font-bold tracking-widest text-xl">TODO</span> */}
            <TasklyLogo fill="currentColor" className="w-20 h-20" />
          </div>
          <Sheet>
            <SheetTrigger className="md:hidden">
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-left">Tasks</SheetTitle>
                {/* <SheetDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </SheetDescription> */}
              </SheetHeader>
              <SideBar />
            </SheetContent>
          </Sheet>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <PlusIcon className="mr-2 w-4 h-4" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent overlayClassName="backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
              <DialogHeader>
                <DialogTitle>Create a task</DialogTitle>
                {/* <DialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </DialogDescription> */}
              </DialogHeader>
              <div>
                <CreateTaskForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center  space-x-2 md:justify-end">
          <ModeToggle />
          <Avatar>
            <AvatarImage src={photoURL} />
            <AvatarFallback>
              <CircleUserRoundIcon />
            </AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </header>
  );
};

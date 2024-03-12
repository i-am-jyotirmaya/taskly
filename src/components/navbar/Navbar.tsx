import { ModeToggleV2 } from "@/components/mode-toggle-v2/mode-toggle-v2";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateTaskForm } from "./create-task/CreateTaskForm";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center gap-2">
          <div className="mr-4 hidden md:flex">
            <span className="font-bold tracking-widest text-xl">TODO</span>
          </div>
          <Dialog>
            <DialogTrigger>
              <Button variant="default">
                <PlusIcon className="mr-2 w-4 h-4" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent overlayClassName="backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ModeToggleV2 />
        </div>
      </nav>
    </header>
  );
};

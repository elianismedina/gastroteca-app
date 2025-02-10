import avatarPlaceholder from "../assets/images/avatar_placeholder.png";
import { Lock, LogOut } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface UserButtonProps {
  user: User;
  onCloseNav?: () => void;
}

export default function UserButton({ user, onCloseNav }: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="flex-none rounded-full">
          <Image
            src={user.image || avatarPlaceholder}
            alt="User profile picture"
            width={50}
            height={50}
            className="aspect-square rounded-full bg-background object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.role === "ADMIN" && (
            <DropdownMenuItem asChild>
              <Link href="/admin" onClick={onCloseNav}>
                <Lock className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
              if (onCloseNav) onCloseNav();
            }}
            className="flex w-full items-center"
          >
            <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

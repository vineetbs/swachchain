import React, { useEffect, useState } from "react";
import RouterSafeLink from "./RouterSafeLink";
import { Button } from "@/components/ui/button";
import { Trophy, Camera, User } from "lucide-react";

const Header = ({ isLoggedIn = false }) => {

  let navItems = [];
  let homeRoute = "/";

  if (isLoggedIn) {
    navItems = [
      {
        name: "Upload",
        path: "/upload",
        icon: <Camera className="mr-1 h-4 w-4" />,
      },
      {
        name: "Leaderboard",
        path: "/leaderboard",
        icon: <Trophy className="mr-1 h-4 w-4" />,
      },
      {
        name: "Profile",
        path: "/profile",
        icon: <User className="mr-1 h-4 w-4" />,
      },
    ];
    homeRoute = "/home";
  }

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <RouterSafeLink to={homeRoute} className="flex items-center space-x-2">
          <div className="bg-primary rounded-full p-1">
            <Camera className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">SwachChain</span>
        </RouterSafeLink>
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <RouterSafeLink to={item.path}>
                  <Button variant="ghost" className="flex items-center">
                    {item.icon}
                    {item.name}
                  </Button>
                </RouterSafeLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReportCard from "@/components/ReportCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Award, Trophy, Image } from "lucide-react";
import { toast } from "sonner";
import { AuthContext } from "@/context/AuthContext";
import RouterSafeLink from "@/components/RouterSafeLink";
import { Navigate } from "react-router-dom";

// Mock data for user
const dummyUser = {
  name: "Alex Johnson",
  city: "New York",
  totalScore: 765,
  reports: 24,
  rank: 17,
  badges: [
    { name: "Gold", count: 3 },
    { name: "Silver", count: 7 },
    { name: "Bronze", count: 14 },
  ],
};

// Mock data for reports
const mockReports = [
  {
    id: 1,
    imageUrl:
      "/public/lovable-uploads/9cf767df-b983-48f8-be7c-6c95f895f08f.png",
    score: 95,
    city: "New York",
    date: new Date("2023-04-15"),
    badge: "Gold",
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51",
    score: 72,
    city: "New York",
    date: new Date("2023-04-10"),
    badge: "Silver",
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1504471478083-7f5f8714dd31",
    score: 68,
    city: "New York",
    date: new Date("2023-04-05"),
    badge: "Silver",
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18",
    score: 87,
    city: "New York",
    date: new Date("2023-03-28"),
    badge: "Gold",
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1526951521990-620dc14c214b",
    score: 52,
    city: "New York",
    date: new Date("2023-03-20"),
    badge: "Bronze",
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1575221666705-61010c9ed31a",
    score: 64,
    city: "New York",
    date: new Date("2023-03-15"),
    badge: "Silver",
  },
];

const Profile = () => {
  const { auth, logout } = useContext(AuthContext);
  if(!auth.isSignedIn){
    return <Navigate to="/" />
  }

  let mockUser = { ...dummyUser };

  const user = auth.user;
  if (user) {
    mockUser.name = user.name;
    mockUser.city = user.city;
  }

  const handleLogout = () => {
    toast.success("Logged out successfully");
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={auth.isSignedIn} />
      <main className="flex-1 py-12">
        <div className="container">
          {/* User Summary */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="bg-muted rounded-full p-8 w-24 h-24 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                  <p className="text-muted-foreground">{mockUser.city}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-3xl font-bold text-primary">
                        {mockUser.totalScore}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Score
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-3xl font-bold">
                        {mockUser.reports}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Reports
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-3xl font-bold">#{mockUser.rank}</div>
                      <div className="text-sm text-muted-foreground">
                        City Rank
                      </div>
                    </div>
                  </div>
                </div>
                <RouterSafeLink to="/">
                  <div>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </RouterSafeLink>
              </div>
            </CardContent>
          </Card>

          {/* Badges and Reports Tabs */}
          <Tabs defaultValue="reports">
            <div className="flex justify-center mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="reports">
                  <Image className="h-4 w-4 mr-2" />
                  My Reports
                </TabsTrigger>
                <TabsTrigger value="badges">
                  <Award className="h-4 w-4 mr-2" />
                  Badges
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="reports" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockReports.map((report) => (
                  <ReportCard
                    key={report.id}
                    imageUrl={report.imageUrl}
                    score={report.score}
                    city={report.city}
                    date={report.date}
                    badge={report.badge}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="badges">
              <Card>
                <CardHeader>
                  <CardTitle>My Badges</CardTitle>
                  <CardDescription>
                    Badges earned through your cleanup reports
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {mockUser.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center">
                        <Badge
                          className={`
                            mr-3 p-3 
                            ${
                              badge.name === "Gold"
                                ? "bg-yellow-400"
                                : badge.name === "Silver"
                                ? "bg-slate-300"
                                : "bg-amber-700"
                            }
                          `}
                        >
                          <Trophy className="h-5 w-5" />
                        </Badge>
                        <div>
                          <h4 className="font-medium">{badge.name} Badge</h4>
                          <p className="text-sm text-muted-foreground">
                            {badge.name === "Gold"
                              ? "Reports with score 80+"
                              : badge.name === "Silver"
                              ? "Reports with score 60-79"
                              : "Reports with score 40-59"}
                          </p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {badge.count}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;

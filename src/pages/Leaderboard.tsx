import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CityCard from "@/components/CityCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ArrowUp, ArrowDown } from "lucide-react";

// Mock data for cities
const initialCities = [
  { id: 1, name: "Bhopal", score: 9876, reports: 328, rank: 1 },
  { id: 2, name: "Indore", score: 8765, reports: 287, rank: 2 },
  { id: 3, name: "Ujjain", score: 7654, reports: 254, rank: 3 },
  { id: 4, name: "Jabalpur", score: 6543, reports: 212, rank: 4 },
  { id: 5, name: "Satna", score: 5432, reports: 187, rank: 5 },
  { id: 6, name: "Rewa", score: 4321, reports: 165, rank: 6 },
  { id: 7, name: "Sanchi", score: 3210, reports: 132, rank: 7 },
  { id: 8, name: "Vidisha", score: 2109, reports: 98, rank: 8 },
  { id: 9, name: "Itarshi", score: 1987, reports: 87, rank: 9 },
  { id: 10, name: "Jhanshi", score: 1876, reports: 76, rank: 10 },
  { id: 11, name: "Bhojpur", score: 1765, reports: 65, rank: 11 },
  { id: 12, name: "Chindwara", score: 1654, reports: 54, rank: 12 },
];

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [timeFrame, setTimeFrame] = useState("all-time");

  // Filter and sort cities
  const filteredCities = initialCities
    .filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "desc") {
        return b.score - a.score;
      } else {
        return a.score - b.score;
      }
    });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2 text-center">
            City Cleanup Leaderboard
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            See which cities are leading the charge in cleaning up their
            communities
          </p>

          <div className="max-w-5xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                  }
                  className="shrink-0"
                >
                  {sortOrder === "desc" ? (
                    <ArrowDown className="h-4 w-4" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                </Button>

                <Select value={timeFrame} onValueChange={setTimeFrame}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredCities.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">
                  No cities found matching your search.
                </p>
              </div>
            ) : (
              filteredCities.map((city) => (
                <CityCard
                  key={city.id}
                  rank={city.rank}
                  city={city.name}
                  score={city.score}
                  reportCount={city.reports}
                />
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;

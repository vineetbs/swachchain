import React, { useContext, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UploadForm from "@/components/UploadForm";
import ScoreDisplay from "@/components/ScoreDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RouterSafeLink from "@/components/RouterSafeLink";
import { AuthContext } from "@/context/AuthContext";
// import { Navigate } from "react-router-dom"; // No longer needed if we remove the redirect

const Upload = () => {
  // --- Authentication Check Temporarily Disabled ---
  // const { auth } = useContext(AuthContext);
  // if (!auth.isSignedIn) {
  //   return <Navigate to="/" />;
  // }
  // --- End Disabled Section ---

  // --- We still need auth for the Header, let's get it ---
  // --- If you remove the auth check entirely, make sure Header handles isLoggedIn potentially being undefined ---
  // --- Or provide a default value if AuthContext might not be ready ---
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext?.auth?.isSignedIn ?? false; // Safely access isSignedIn, default to false

  const [isUploaded, setIsUploaded] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    message: string;
  } | null>(null);

  const handleUploadSuccess = (result: { score: number; message: string }) => {
    setScoreResult(result);
    setIsUploaded(true);
  };

  const handleReset = () => {
    setIsUploaded(false);
    setScoreResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass the safely accessed logged-in status to Header */}
      <Header isLoggedIn={isLoggedIn} />
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {isUploaded ? "Report Submitted" : "Submit a Clean-Up Report"}
          </h1>

          <Card>
            <CardHeader className={isUploaded ? "pb-0" : ""}>
              {!isUploaded && (
                <>
                  <CardTitle className="text-xl">Upload Photo</CardTitle>
                </>
              )}
            </CardHeader>
            <CardContent className="pt-6">
              {isUploaded && scoreResult ? (
                <div>
                  <ScoreDisplay
                    score={scoreResult.score}
                    message={scoreResult.message}
                  />

                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
                    <Button onClick={handleReset}>Submit Another Report</Button>
                    <RouterSafeLink to="/leaderboard">
                      <Button variant="outline">Check Leaderboard</Button>
                    </RouterSafeLink>
                  </div>
                </div>
              ) : (
                // Pass any necessary props to UploadForm if it needs auth info
                <UploadForm onSuccess={handleUploadSuccess} />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Upload;

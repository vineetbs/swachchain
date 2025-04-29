import React, { useState } from "react"; // Import useState
import { Button } from "@/components/ui/button";
import RouterSafeLink from "@/components/RouterSafeLink";
import { Camera, Trophy, ArrowRight, Loader2 } from "lucide-react"; // Import Loader2
import StepCard from "@/components/StepCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  // --- State for iframe loading ---
  const [iframeLoading, setIframeLoading] = useState(true);

  // --- Handler for when iframe finishes loading ---
  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="hero-pattern py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
              Make Your City <span className="text-primary">Cleaner</span>, One
              Photo at a Time
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Join thousands of citizens documenting trash, earning points, and
              transforming communities through our gamified cleanup app.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <RouterSafeLink to="/upload">
                <Button size="lg" className="w-full sm:w-auto">
                  <Camera className="mr-2 h-5 w-5" />
                  Submit a Report
                </Button>
              </RouterSafeLink>
              <RouterSafeLink to="/leaderboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Trophy className="mr-2 h-5 w-5" />
                  View Leaderboard
                </Button>
              </RouterSafeLink>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="container">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join our community of environmental heroes in just three simple
              steps
            </p>
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* StepCard components remain the same */}
            <StepCard
              title="Upload Photo"
              description="Take a photo of trash in your area and upload it to our platform."
              icon={<Camera className="h-5 w-5" />}
              step={1}
            />
            <StepCard
              title="Get Scored"
              description="Our AI analyzes the trash and awards points based on identification."
              icon={<div className="font-bold text-lg">AI</div>}
              step={2}
            />
            <StepCard
              title="Compete"
              description="See your city climb the leaderboard and earn badges for your contributions."
              icon={<Trophy className="h-5 w-5" />}
              step={3}
            />
          </div>

          {/* Get Started Button */}
          <div className="text-center mt-12">
            <RouterSafeLink to="/upload">
              <Button>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </RouterSafeLink>
          </div>

          {/* --- Power BI Embed Section --- */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-6">
              Project Dashboard
            </h3>
            {/* Container maintaining aspect ratio */}
            <div className="aspect-video overflow-hidden rounded-lg shadow-xl border bg-muted/40 relative">
              {" "}
              {/* Added relative positioning and background */}
              {/* --- Loading Indicator --- */}
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground z-10">
                  {" "}
                  {/* Absolute positioning to overlay */}
                  <Loader2 className="h-8 w-8 animate-spin mb-3" />
                  <p>Loading dashboard...</p>
                </div>
              )}
              {/* --- Iframe (conditionally hidden by loader) --- */}
              <iframe
                title="Waste management project"
                width="100%"
                height="100%"
                src="https://app.powerbi.com/view?r=eyJrIjoiZTExZmEzMGQtYWMyYi00NjhhLTlmNWEtODMxZDcxYTQ3Mjc3IiwidCI6IjQ3NjYzYzA2LTZhMGQtNGYyNi05NmMyLTI4OGU4OWM0NGZjZCJ9"
                frameBorder="0"
                allowFullScreen
                onLoad={handleIframeLoad} // Call handler when loaded
                className={`block transition-opacity duration-500 ${
                  iframeLoading ? "opacity-0" : "opacity-100"
                }`} // Fade in iframe
              ></iframe>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Live dashboard showing project impact and statistics.
            </p>
          </div>
          {/* --- END: Power BI Embed Section --- */}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        {/* CTA content remains the same */}
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Join thousands of citizens who are already making their cities
              cleaner and more beautiful.
            </p>
            <RouterSafeLink to="/upload">
              <Button variant="secondary" size="lg">
                <Camera className="mr-2 h-5 w-5" />
                Start Cleaning Your City
              </Button>
            </RouterSafeLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

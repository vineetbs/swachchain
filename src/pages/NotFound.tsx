
import React from 'react';
import { Button } from '@/components/ui/button';
import RouterSafeLink from '@/components/RouterSafeLink';
import { Home } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md text-center">
          <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <RouterSafeLink to="/">
            <Button>
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </RouterSafeLink>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

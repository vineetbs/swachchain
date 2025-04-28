
import React from 'react';
import RouterSafeLink from './RouterSafeLink';

const Footer = () => {
  return (
    <footer className="border-t bg-muted mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SwachChain</h3>
            <p className="text-sm text-muted-foreground">
              Join the movement to clean up our cities, one photo at a time. Upload, score, and compete to make your city the cleanest!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><RouterSafeLink to="/" className="hover:text-primary transition-colors">Home</RouterSafeLink></li>
              <li><RouterSafeLink to="/upload" className="hover:text-primary transition-colors">Upload</RouterSafeLink></li>
              <li><RouterSafeLink to="/leaderboard" className="hover:text-primary transition-colors">Leaderboard</RouterSafeLink></li>
              <li><RouterSafeLink to="/profile" className="hover:text-primary transition-colors">Profile</RouterSafeLink></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>Made with ❤️ by SUDOCODE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

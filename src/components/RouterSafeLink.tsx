
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface RouterSafeLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A link component that safely handles routing both inside and outside Router context
 */
const RouterSafeLink: React.FC<RouterSafeLinkProps> = ({ to, children, className }) => {
  // Try to access router context - if this fails, we're outside Router context
  let isRouterAvailable = true;
  
  try {
    useLocation();
  } catch (e) {
    isRouterAvailable = false;
  }
  
  // If we're in a router context, use Link, otherwise use a regular anchor
  if (isRouterAvailable) {
    return (
      <RouterLink to={to} className={className}>
        {children}
      </RouterLink>
    );
  }
  
  // Fallback to regular anchor when outside router context
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
};

export default RouterSafeLink;

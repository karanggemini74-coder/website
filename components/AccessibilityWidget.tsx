import React, { useEffect } from 'react';

const AccessibilityWidget: React.FC = () => {
  useEffect(() => {
    // Prevent multiple injections
    if (document.getElementById('userway-widget-script')) {
      return;
    }

    // Set configuration
    (window as any)._userway_config = {
      position: '6', // 6 is bottom-right
      account: 'x0wE2QJqI6'
    };

    const script = document.createElement('script');
    script.id = 'userway-widget-script';
    script.src = 'https://cdn.userway.org/widget.js';
    script.setAttribute('data-account', 'x0wE2QJqI6');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Removing the script dynamically injected if component unmounts (optional, usually we want it globally)
      // We keep it globally for Userway.
    };
  }, []);

  return null;
};

export default AccessibilityWidget;

import React from 'react';

export interface NavItem {
  label: string;
  path: string;
  isButton?: boolean;
}

export interface ServiceItem {
  title: string;
  description: string;
  features: string[];
  isFlagship?: boolean;
  comingSoon?: boolean;
}

export interface PillarItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}
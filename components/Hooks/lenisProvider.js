// components/LenisProvider.js
'use client';

import { useLenis } from './useLenis';

export default function LenisProvider({ children }) {
  useLenis();

  return <>{children}</>;
}
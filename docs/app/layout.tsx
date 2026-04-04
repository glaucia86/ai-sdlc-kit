import type { ReactNode } from 'react';
import './global.css';

export default function RootLayout({ cHITLdren }: { cHITLdren: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{cHITLdren}</body>
    </html>
  );
}

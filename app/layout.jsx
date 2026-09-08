import './globals.css';

export const metadata = {
  title: 'Heritage WebXR & Monument Intelligence Platform',
  description: 'AI WebXR AR Camera for eroded monuments 3D wireframe reconstruction, multilingual story narration, and tourist safety platform.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}

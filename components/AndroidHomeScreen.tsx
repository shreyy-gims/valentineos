'use client';

import { useState } from 'react';
import PhoneFrame from './PhoneFrame';
import StatusBar from './StatusBar';
import AppGrid from './AppGrid';
import MessagesApp from './apps/MessagesApp';
import GalleryApp from './apps/GalleryApp';
import LoveNotesApp from './apps/LoveNotesApp';
import ValentineApp from './apps/ValentineApp';

type AppType = 'home' | 'messages' | 'gallery' | 'notes' | 'valentine';

export default function AndroidHomeScreen() {
  const [currentApp, setCurrentApp] = useState<AppType>('home');

  const renderApp = () => {
    switch (currentApp) {
      case 'messages':
        return <MessagesApp onBack={() => setCurrentApp('home')} />;
      case 'gallery':
        return <GalleryApp onBack={() => setCurrentApp('home')} />;
      case 'notes':
        return <LoveNotesApp onBack={() => setCurrentApp('home')} />;
      case 'valentine':
        return <ValentineApp onBack={() => setCurrentApp('home')} />;
      default:
        return (
          <>
            <StatusBar />
            <AppGrid onAppSelect={setCurrentApp} />
          </>
        );
    }
  };

  return (
    <PhoneFrame>
      {renderApp()}
    </PhoneFrame>
  );
}

"use client";
import dynamic from 'next/dynamic';
import * as React from 'react';

// Dynamically import the video call component to prevent SSR
const VideoCallContent = dynamic(() => import('../../components/VideoCallContent'), {
  ssr: false,
});

export default function VideoCallPage() {
  return <VideoCallContent />;
}
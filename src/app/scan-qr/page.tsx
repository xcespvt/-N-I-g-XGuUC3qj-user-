
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Zap, ZapOff, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export default function ScanQrPage() {
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        setStream(mediaStream);
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();

    return () => {
      // Cleanup: stop camera stream when component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFlashlight = async () => {
    if (stream) {
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();

      // @ts-ignore - torch is a valid capability but not in all TS libs
      if (!capabilities.torch) {
        toast({
          variant: 'destructive',
          title: 'Flashlight Not Supported',
          description: 'Your device does not support flashlight control.',
        });
        return;
      }

      try {
        await track.applyConstraints({
          // @ts-ignore
          advanced: [{ torch: !isFlashlightOn }],
        });
        setIsFlashlightOn(!isFlashlightOn);
      } catch (error) {
        console.error('Error toggling flashlight:', error);
        toast({
          variant: 'destructive',
          title: 'Flashlight Error',
          description: 'Could not toggle the flashlight.',
        });
      }
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-black text-white">
      <header className="absolute top-0 z-10 flex w-full items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/50 hover:bg-black/70"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/50 hover:bg-black/70"
          onClick={toggleFlashlight}
        >
          {isFlashlightOn ? (
            <ZapOff className="h-6 w-6" />
          ) : (
            <Zap className="h-6 w-6" />
          )}
        </Button>
      </header>
      
      <main className="relative flex-1 flex items-center justify-center">
        {!hasCameraPermission ? (
          <div className="p-4 w-full max-w-sm">
            <Alert variant="destructive" className="bg-red-900/50 border-red-500/50 text-white">
                <AlertTriangle className="h-4 w-4 !text-red-400" />
              <AlertTitle>Camera Access Denied</AlertTitle>
              <AlertDescription>
                Please enable camera permissions in your browser settings to use the QR scanner.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              autoPlay
              playsInline
              muted
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <div className="relative w-full max-w-xs aspect-square">
                 <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-2xl"></div>
                 <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-2xl"></div>
                 <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-2xl"></div>
                 <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-2xl"></div>
              </div>
               <p className="mt-8 text-lg font-semibold text-center drop-shadow-lg">
                Point your camera at a QR code
              </p>
              <p className="mt-2 text-sm text-center text-white/80 drop-shadow-md">
                Scan the QR code on your table to place a dine-in order.
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

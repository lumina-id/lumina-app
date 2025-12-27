import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, DrawingUtils } from "@mediapipe/tasks-vision";
import { createFaceLandmarker } from "../utils/mediapipe";
import { useGaze } from "../context/GazeContext";
import { OneEuroFilter } from "../utils/smoothing";

export const useFaceMesh = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);
  const requestRef = useRef<number>();
  const { setGaze, setIsFaceDetected, setFaceCenter } = useGaze();
  
  // Filters for smoothing
  const filterX = useRef(new OneEuroFilter(1.0, 0.0, 1.0));
  const filterY = useRef(new OneEuroFilter(1.0, 0.0, 1.0));
  const filterCenterX = useRef(new OneEuroFilter(1.0, 0.0, 1.0));
  const filterCenterY = useRef(new OneEuroFilter(1.0, 0.0, 1.0));

  useEffect(() => {
    const init = async () => {
      const landmarker = await createFaceLandmarker();
      setFaceLandmarker(landmarker);
    };
    init();
  }, []);

  const predictWebcam = () => {
    // Keep looping regardless of readiness
    requestRef.current = requestAnimationFrame(predictWebcam);

    if (!faceLandmarker || !videoRef.current || videoRef.current.readyState !== 4) {
      return;
    }

    const startTimeMs = performance.now();
    const results = faceLandmarker.detectForVideo(videoRef.current, startTimeMs);

    if (results.faceLandmarks && results.faceLandmarks.length > 0) {
      setIsFaceDetected(true);
      const landmarks = results.faceLandmarks[0];
      
      // Calculate Face Bounding Box Center
      let minX = 1, maxX = 0, minY = 1, maxY = 0;
      for (const lm of landmarks) {
        if (lm.x < minX) minX = lm.x;
        if (lm.x > maxX) maxX = lm.x;
        if (lm.y < minY) minY = lm.y;
        if (lm.y > maxY) maxY = lm.y;
      }
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      // Smooth the center position
      // Note: We invert X for the UI because of the mirror effect
      const smoothCenterX = filterCenterX.current.filter(startTimeMs, 1 - centerX);
      const smoothCenterY = filterCenterY.current.filter(startTimeMs, centerY);
      
      setFaceCenter({ x: smoothCenterX, y: smoothCenterY });

      // Simple Gaze Estimation Logic (Placeholder for Phase 2)
      // In a real app, you would use the iris landmarks (468-477)
      // and map them to screen coordinates using calibration matrix.
      
      // Example: Using nose tip (1) as a cursor for testing head movement control
      // This is just to prove the pipeline works.
      const noseTip = landmarks[1]; 
      
      // Invert X because webcam is mirrored
      const rawX = (1 - noseTip.x) * window.innerWidth;
      const rawY = noseTip.y * window.innerHeight;

      // Apply smoothing
      const smoothX = filterX.current.filter(startTimeMs, rawX);
      const smoothY = filterY.current.filter(startTimeMs, rawY);

      setGaze(smoothX, smoothY);
    } else {
      setIsFaceDetected(false);
    }
  };

  useEffect(() => {
    if (faceLandmarker && videoRef.current) {
      predictWebcam();
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [faceLandmarker, videoRef]);

  return { faceLandmarker };
};

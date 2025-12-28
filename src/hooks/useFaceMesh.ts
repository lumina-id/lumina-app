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
  
  // Blink State
  const blinkRef = useRef(false);

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

      // Head Tracking Logic (Vocable style)
      // Uses the nose tip (Landmark 1) to control the cursor.
      const noseTip = landmarks[1];
      
      // --- SENSITIVITY CONTROL ---
      // Increase this value to make the cursor move faster with less head movement.
      // 1.0 = 1:1 mapping (requires large movement)
      // 2.0 = 2x sensitivity (requires half the movement)
      // 2.5 = Recommended for accessibility
      const sensitivity = 2.5; 

      // 1. Get mirrored coordinates (0 to 1)
      const mirroredX = 1 - noseTip.x;
      const mirroredY = noseTip.y;

      // 2. Apply sensitivity scaling relative to center (0.5)
      // Formula: Center + (Offset * Sensitivity)
      let activeX = 0.5 + (mirroredX - 0.5) * sensitivity;
      let activeY = 0.5 + (mirroredY - 0.5) * sensitivity;

      // 3. Clamp values to stay within screen [0, 1]
      // This prevents the cursor from going off-screen
      activeX = Math.max(0, Math.min(1, activeX));
      activeY = Math.max(0, Math.min(1, activeY));
      
      // 4. Map to screen dimensions
      const rawX = activeX * window.innerWidth;
      const rawY = activeY * window.innerHeight;

      // Apply smoothing
      const smoothX = filterX.current.filter(startTimeMs, rawX);
      const smoothY = filterY.current.filter(startTimeMs, rawY);

      setGaze(smoothX, smoothY);

      // --- BLINK DETECTION ---
      const leftEyeUpper = landmarks[159];
      const leftEyeLower = landmarks[145];
      const leftEyeInner = landmarks[133];
      const leftEyeOuter = landmarks[33];

      const rightEyeUpper = landmarks[386];
      const rightEyeLower = landmarks[374];
      const rightEyeInner = landmarks[362];
      const rightEyeOuter = landmarks[263];

      // Helper to calculate distance
      const getDistance = (p1: any, p2: any) => {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
      };

      // Calculate Eye Aspect Ratio (Vertical / Horizontal)
      const leftVertical = getDistance(leftEyeUpper, leftEyeLower);
      const leftHorizontal = getDistance(leftEyeInner, leftEyeOuter);
      const leftRatio = leftVertical / leftHorizontal;

      const rightVertical = getDistance(rightEyeUpper, rightEyeLower);
      const rightHorizontal = getDistance(rightEyeInner, rightEyeOuter);
      const rightRatio = rightVertical / rightHorizontal;

      // Average ratio
      const avgRatio = (leftRatio + rightRatio) / 2;
      
      // Threshold for blink (usually around 0.1 to 0.15)
      // Adjust this if it triggers too easily or is too hard
      const BLINK_THRESHOLD = 0.12;

      if (avgRatio < BLINK_THRESHOLD) {
        if (!blinkRef.current) {
           // Start of blink
           blinkRef.current = true;
           
           // Trigger Click
           // We use the smoothed coordinates
           const element = document.elementFromPoint(smoothX, smoothY);
           if (element && element instanceof HTMLElement) {
             element.click();
             console.log("Blink Click Triggered at:", smoothX, smoothY);
           }
        }
      } else {
        // Eye is open
        blinkRef.current = false;
      }
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

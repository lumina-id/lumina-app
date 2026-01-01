"use client";

import { useEffect, useRef } from "react";

export default function ParticleWave() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = canvas.offsetWidth);
        let height = (canvas.height = canvas.offsetHeight);

        const particles: { x: number; y: number; baseY: number; speed: number; offset: number }[] = [];

        // Create particles in a grid
        const spacing = 20; // Back to 20 spatial spacing
        const rows = Math.ceil(height / spacing);
        const cols = Math.ceil(width / spacing);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                particles.push({
                    x: i * spacing,
                    y: j * spacing,
                    baseY: j * spacing,
                    speed: 0.02,
                    offset: i * 0.2 + j * 0.1, // Original offset logic
                });
            }
        }

        let animationFrameId: number;
        let time = 0;

        const render = () => {
            time += 0.01;
            ctx.clearRect(0, 0, width, height);

            // Gradient background - KEEPING #030830 as requested in previous turn
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, "#030830");
            gradient.addColorStop(1, "#0f172a");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            particles.forEach((p) => {
                // Original Simple Sine Wave Logic
                const waveX = Math.sin(time + p.offset) * 10;
                const waveY = Math.cos(time + p.offset * 0.5) * 10;

                // Render
                const size = 1.5;
                // Simple opacity
                const alpha = 0.4 + Math.sin(time + p.offset) * 0.2;
                ctx.fillStyle = `rgba(100, 150, 255, ${alpha})`;

                ctx.beginPath();
                ctx.arc(p.x + waveX, p.y + waveY, size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: "#030830" }}
        />
    );
}

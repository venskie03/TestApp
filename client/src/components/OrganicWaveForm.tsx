import React, { useEffect, useRef } from 'react';

export type WaveformState = 'idle' | 'active' | 'processing' | 'muted';

interface OrganicWaveformProps {
    width?: number;
    height?: number;
    state?: WaveformState;
}

export function OrganicWaveform({
    width = 600,
    height = 600,
    state = 'idle'
}: OrganicWaveformProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>(0);
    const timeRef = useRef(0);
    const targetIntensityRef = useRef(0);
    const currentIntensityRef = useRef(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (state !== 'active') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate distance from center
        const centerX = width / 2;
        const centerY = height / 2;
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDistance = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));

        // Closer to center = higher intensity
        const intensity = 1 - Math.min(distance / maxDistance, 1);
        targetIntensityRef.current = intensity;
    };

    const handleMouseEnter = () => {
        if (state === 'active') {
            targetIntensityRef.current = 0.5;
        }
    };

    const handleMouseLeave = () => {
        targetIntensityRef.current = 0;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size with device pixel ratio for crisp rendering
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        const centerX = width / 2;
        const centerY = height / 2 - 30; // Move up by positioning above center

        // Create organic flowing shape with contour lines
        const drawOrganicShape = () => {
            ctx.clearRect(0, 0, width, height);

            // Smooth interpolation towards target intensity
            currentIntensityRef.current += (targetIntensityRef.current - currentIntensityRef.current) * 0.1;
            const intensity = currentIntensityRef.current;

            // Define parameters based on state
            let numLayers = 45;
            let opacity = 0.7;
            let waveAmplitude = 1;
            let morphSpeed = 1;

            switch (state) {
                case 'idle':
                    numLayers = 40;
                    opacity = 0.6;
                    waveAmplitude = 1;
                    morphSpeed = 0.8;
                    break;
                case 'active':
                    numLayers = 45 + Math.floor(intensity * 15);
                    opacity = 0.7 + intensity * 0.2;
                    waveAmplitude = 1 + intensity * 0.8;
                    morphSpeed = 1 + intensity * 1.5;
                    break;
                case 'processing':
                    numLayers = 50;
                    opacity = 0.8;
                    waveAmplitude = 1.3;
                    morphSpeed = 1.8;
                    break;
                case 'muted':
                    numLayers = 30;
                    opacity = 0.3;
                    waveAmplitude = 0.6;
                    morphSpeed = 0.5;
                    break;
            }

            const time = timeRef.current * morphSpeed;

            // Calculate padding and max radius to fit waveform
            const padding = 60; // Padding on all sides
            const maxRadius = Math.min(width, height) / 2 - padding;
            const layerSpacing = maxRadius / numLayers;

            for (let layer = 0; layer < numLayers; layer++) {
                const progress = layer / numLayers;

                // Create gradient: off white → gray → electric cyan (#7DF9FF)
                let r, g, b;
                if (progress < 0.5) {
                    // Off white (245, 245, 245) to gray (150, 150, 150)
                    const t = progress * 2; // 0 to 1
                    r = Math.round(245 - (245 - 150) * t);
                    g = Math.round(245 - (245 - 150) * t);
                    b = Math.round(245 - (245 - 150) * t);
                } else {
                    // Gray (150, 150, 150) to electric cyan (125, 249, 255)
                    const t = (progress - 0.5) * 2; // 0 to 1
                    r = Math.round(150 - (150 - 125) * t);
                    g = Math.round(150 + (249 - 150) * t);
                    b = Math.round(150 + (255 - 150) * t);
                }

                ctx.beginPath();
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(0.4 + progress * 0.5) * opacity})`;
                ctx.lineWidth = 1.2;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                // Create organic blob-like shape using multiple control points
                const numPoints = 6;
                const baseRadius = layerSpacing * layer;

                // Calculate max wave offset to ensure it fits
                const maxWaveOffset = 40 + 60 + 30 + 25; // Sum of all wave amplitudes
                const scaledWaveAmplitude = waveAmplitude * Math.min(1, (maxRadius - baseRadius) / maxWaveOffset);

                // Generate smooth closed curve
                const points: { x: number; y: number }[] = [];

                for (let i = 0; i <= numPoints * 20; i++) {
                    const angle = (i / (numPoints * 20)) * Math.PI * 2;

                    // Create flowing organic shape with multiple sine waves
                    const wave1 = Math.sin(angle * 3 + time * 0.3 + layer * 0.1) * 40 * scaledWaveAmplitude;
                    const wave2 = Math.sin(angle * 2 - time * 0.2 + layer * 0.05) * 60 * scaledWaveAmplitude;
                    const wave3 = Math.sin(angle * 4 + time * 0.15 + layer * 0.08) * 30 * scaledWaveAmplitude;
                    const wave4 = Math.cos(angle * 5 - time * 0.25 + progress * 2) * 25 * scaledWaveAmplitude;

                    // Combine waves for complex organic motion
                    const radiusOffset = wave1 + wave2 + wave3 + wave4;
                    const r = baseRadius + radiusOffset;

                    // Add subtle rotation and morphing
                    const rotationOffset = Math.sin(time * 0.1 + layer * 0.02) * 0.3;
                    const morphedAngle = angle + rotationOffset;

                    const x = centerX + Math.cos(morphedAngle) * r;
                    const y = centerY + Math.sin(morphedAngle) * r;

                    points.push({ x, y });
                }

                // Draw smooth curve through points
                if (points.length > 0) {
                    ctx.moveTo(points[0].x, points[0].y);

                    for (let i = 1; i < points.length - 2; i++) {
                        const xc = (points[i].x + points[i + 1].x) / 2;
                        const yc = (points[i].y + points[i + 1].y) / 2;
                        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
                    }

                    // Close the path smoothly
                    ctx.quadraticCurveTo(
                        points[points.length - 2].x,
                        points[points.length - 2].y,
                        points[points.length - 1].x,
                        points[points.length - 1].y
                    );

                    ctx.closePath();
                }

                // Add subtle glow to outer layers (electric cyan)
                if (layer > numLayers * 0.7) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = `rgba(125, 249, 255, ${0.4 * opacity})`;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.stroke();
                ctx.shadowBlur = 0;
            }
        };

        const animate = () => {
            // Define animation speed based on state
            let animationSpeed = 0.008;

            switch (state) {
                case 'idle':
                    animationSpeed = 0.005;
                    break;
                case 'active':
                    const intensity = currentIntensityRef.current;
                    animationSpeed = 0.008 + intensity * 0.015;
                    break;
                case 'processing':
                    animationSpeed = 0.015;
                    break;
                case 'muted':
                    animationSpeed = 0.003;
                    break;
            }

            timeRef.current += animationSpeed;
            drawOrganicShape();
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [width, height, state]);

    return (
        <canvas
            ref={canvasRef}
            className="rounded-lg cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
    );
}
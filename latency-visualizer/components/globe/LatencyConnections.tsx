'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '@/lib/stores/appStore';
import { getLatencyColor } from '@/lib/utils/latency';

// Convert lat/lng to 3D coordinates
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Create a curved line between two points
function createCurve(start: THREE.Vector3, end: THREE.Vector3): THREE.QuadraticBezierCurve3 {
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const distance = start.distanceTo(end);
  mid.normalize().multiplyScalar(100 + distance * 0.3); // Arc height

  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

interface ConnectionProps {
  fromId: string;
  toId: string;
  latency: number;
}

function Connection({ fromId, toId, latency }: ConnectionProps) {
  const lineRef = useRef<THREE.Line>(null);
  const pulseRef = useRef<THREE.Points>(null);
  const { exchanges } = useAppStore();

  const fromExchange = exchanges.find((e) => e.id === fromId);
  const toExchange = exchanges.find((e) => e.id === toId);

  const { curve, color } = useMemo(() => {
    if (!fromExchange || !toExchange) {
      return { curve: null, color: '#ffffff' };
    }

    const start = latLngToVector3(
      fromExchange.coordinates.lat,
      fromExchange.coordinates.lng,
      102
    );
    const end = latLngToVector3(
      toExchange.coordinates.lat,
      toExchange.coordinates.lng,
      102
    );

    return {
      curve: createCurve(start, end),
      color: getLatencyColor(latency),
    };
  }, [fromExchange, toExchange, latency]);

  // Animate pulse along the curve
  useFrame((state) => {
    if (pulseRef.current && curve) {
      const positions = pulseRef.current.geometry.attributes.position;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < positions.count; i++) {
        const t = ((time * 0.2 + i * 0.1) % 1);
        const point = curve.getPoint(t);
        positions.setXYZ(i, point.x, point.y, point.z);
      }

      positions.needsUpdate = true;
    }
  });

  if (!curve) return null;

  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // Create pulse points
  const pulseCount = 5;
  const pulseGeometry = new THREE.BufferGeometry();
  const pulsePositions = new Float32Array(pulseCount * 3);
  pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));

  return (
    <group>
      {/* Connection line */}
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          linewidth={2}
        />
      </line>

      {/* Animated pulse */}
      <points ref={pulseRef} geometry={pulseGeometry}>
        <pointsMaterial
          size={2}
          color={color}
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
}

export default function LatencyConnections() {
  const { latencyData, updateLatencyData, selectedProviders, latencyRange } =
    useAppStore();

  useEffect(() => {
    // Initialize latency data
    updateLatencyData();

    // Update every 5 seconds
    const interval = setInterval(() => {
      updateLatencyData();
    }, 5000);

    return () => clearInterval(interval);
  }, [updateLatencyData]);

  const filteredConnections = useMemo(() => {
    return latencyData.filter((data) => {
      // Filter by latency range
      if (data.latency < latencyRange[0] || data.latency > latencyRange[1]) {
        return false;
      }

      return true;
    });
  }, [latencyData, latencyRange]);

  // Only show a subset of connections to avoid clutter
  const visibleConnections = useMemo(() => {
    // Show top 20 connections based on interesting latency values
    return filteredConnections.slice(0, 20);
  }, [filteredConnections]);

  return (
    <group>
      {visibleConnections.map((data) => (
        <Connection
          key={`${data.fromId}-${data.toId}`}
          fromId={data.fromId}
          toId={data.toId}
          latency={data.latency}
        />
      ))}
    </group>
  );
}

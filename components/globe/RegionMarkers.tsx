'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '@/lib/stores/appStore';
import { CLOUD_REGIONS, PROVIDER_COLORS } from '@/lib/data/exchanges';
import { CloudRegion } from '@/types';

// Convert lat/lng to 3D coordinates
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

interface RegionMarkerProps {
  region: CloudRegion;
}

function RegionMarker({ region }: RegionMarkerProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const position = useMemo(
    () => latLngToVector3(region.coordinates.lat, region.coordinates.lng, 98),
    [region.coordinates]
  );

  // Rotate ring
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  });

  const regionColor = PROVIDER_COLORS[region.provider];

  return (
    <group position={position}>
      {/* Ring marker for region */}
      <mesh
        ref={ringRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <ringGeometry args={[3, 4, 32]} />
        <meshBasicMaterial
          color={regionColor}
          transparent
          opacity={hovered ? 0.8 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Area glow */}
      <mesh>
        <sphereGeometry args={[5, 16, 16]} />
        <meshBasicMaterial
          color={regionColor}
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Info on hover */}
      {hovered && (
        <Html distanceFactor={10} position={[0, 8, 0]}>
          <div className="bg-white/95 dark:bg-gray-800/95 px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm min-w-[180px]">
            <div className="text-xs font-semibold text-gray-900 dark:text-white">
              {region.provider} Region
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {region.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Code: {region.code}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              Servers: {region.serverCount}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function RegionMarkers() {
  const { selectedProviders } = useAppStore();

  const filteredRegions = useMemo(() => {
    return CLOUD_REGIONS.filter((region) =>
      selectedProviders.includes(region.provider)
    );
  }, [selectedProviders]);

  return (
    <group>
      {filteredRegions.map((region) => (
        <RegionMarker key={region.id} region={region} />
      ))}
    </group>
  );
}

'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '@/lib/stores/appStore';
import { ExchangeServer } from '@/types';
import { PROVIDER_COLORS } from '@/lib/data/exchanges';

// Convert lat/lng to 3D coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

interface MarkerProps {
  exchange: ExchangeServer;
  onClick: () => void;
  isSelected?: boolean;
}

function Marker({ exchange, onClick, isSelected = false }: MarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const position = useMemo(
    () => latLngToVector3(exchange.coordinates.lat, exchange.coordinates.lng, 100),
    [exchange.coordinates]
  );

  // Pulse animation
  useFrame((state) => {
    if (meshRef.current) {
      const baseScale = isSelected ? 1.3 : 1;
      const scale = hovered ? baseScale * 1.3 : baseScale + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const markerColor = isSelected ? '#FFD700' : PROVIDER_COLORS[exchange.provider];

  return (
    <group position={position}>
      {/* Marker sphere */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Pillar/beam effect */}
      <mesh position={[0, -50, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 100, 8]} />
        <meshBasicMaterial
          color={markerColor}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Info label on hover */}
      {hovered && (
        <Html distanceFactor={10} position={[0, 5, 0]}>
          <div className="bg-white/95 dark:bg-gray-800/95 px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm min-w-[150px]">
            <div className="text-xs font-semibold text-gray-900 dark:text-white">
              {exchange.name}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {exchange.location}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {exchange.provider} - {exchange.region}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function ExchangeMarkers() {
  const {
    exchanges,
    selectedProviders,
    selectedExchanges,
    searchQuery,
    selectedConnection,
    setSelectedConnection,
    clearSelectedConnection,
    setShowHistorical,
  } = useAppStore();

  const [firstSelected, setFirstSelected] = useState<ExchangeServer | null>(null);

  const filteredExchanges = useMemo(() => {
    return exchanges.filter((exchange) => {
      // Filter by provider
      if (!selectedProviders.includes(exchange.provider)) {
        return false;
      }

      // Filter by selected exchanges
      if (
        selectedExchanges.length > 0 &&
        !selectedExchanges.includes(exchange.name)
      ) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          exchange.name.toLowerCase().includes(query) ||
          exchange.location.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [exchanges, selectedProviders, selectedExchanges, searchQuery]);

  const handleMarkerClick = (exchange: ExchangeServer) => {
    if (!firstSelected) {
      // First exchange selected
      setFirstSelected(exchange);
    } else if (firstSelected.id === exchange.id) {
      // Same exchange clicked, deselect
      setFirstSelected(null);
      clearSelectedConnection();
    } else {
      // Second exchange selected, create connection
      setSelectedConnection(firstSelected, exchange);
      setShowHistorical(true);
      setFirstSelected(null);
    }
  };

  return (
    <group>
      {filteredExchanges.map((exchange) => (
        <Marker
          key={exchange.id}
          exchange={exchange}
          onClick={() => handleMarkerClick(exchange)}
          isSelected={firstSelected?.id === exchange.id}
        />
      ))}
    </group>
  );
}

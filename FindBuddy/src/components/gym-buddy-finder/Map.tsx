import { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { webRTCService } from "@/services/webRTC";

interface MapProps {
  location: GeolocationPosition;
  onUserSelect: (userId: string) => void;
}

export const Map: FC<MapProps> = ({ location, onUserSelect }) => {
  const [nearbyUsers, setNearbyUsers] = useState<any[]>([]);

  useEffect(() => {
    console.log('Map mounted, getting initial users');
    setNearbyUsers(webRTCService.getNearbyUsers());

    const handlePeerConnected = (event: CustomEvent) => {
      console.log('Peer connected event:', event.detail);
      setNearbyUsers(webRTCService.getNearbyUsers());
    };

    const handlePeerDisconnected = (event: CustomEvent) => {
      console.log('Peer disconnected event:', event.detail);
      setNearbyUsers(webRTCService.getNearbyUsers());
    };

    window.addEventListener('peer-connected', handlePeerConnected as EventListener);
    window.addEventListener('peer-disconnected', handlePeerDisconnected as EventListener);

    const interval = setInterval(() => {
      const users = webRTCService.getNearbyUsers();
      console.log('Periodic refresh, found users:', users);
      setNearbyUsers(users);
    }, 2000);

    return () => {
      window.removeEventListener('peer-connected', handlePeerConnected as EventListener);
      window.removeEventListener('peer-disconnected', handlePeerDisconnected as EventListener);
      clearInterval(interval);
    };
  }, []);

  console.log('Rendering map with nearby users:', nearbyUsers);

  return (
    <MapContainer
      center={[location.coords.latitude, location.coords.longitude]}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Current user's location */}
      <Marker position={[location.coords.latitude, location.coords.longitude]}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Nearby users */}
      {nearbyUsers.map((user) => (
        <Marker
          key={user.id}
          position={[user.location.latitude, user.location.longitude]}
          eventHandlers={{
            click: () => onUserSelect(user.id),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{user.profile.workoutType}</h3>
              <p className="text-sm">{user.profile.experienceLevel}</p>
              <button
                onClick={() => onUserSelect(user.id)}
                className="mt-2 text-blue-500 hover:text-blue-700"
              >
                Chat
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

import { useEffect, useState, useRef } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc
} from "firebase/firestore";
import DeviceCard from "../components/DeviceCard";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const binUnsubs = useRef({}); // 🔑 her device için listener tut

  useEffect(() => {
    if (!auth.currentUser) return;

    const userDevicesRef = collection(
      db,
      "users",
      auth.currentUser.uid,
      "devices"
    );

    const unsubDevices = onSnapshot(userDevicesRef, (snapshot) => {
      const currentIds = snapshot.docs.map((d) => d.id);

      // 🔥 SİLİNENLERİ STATE’TEN KALDIR
      setDevices((prev) =>
        prev.filter((d) => currentIds.includes(d.id))
      );

      snapshot.docs.forEach((snap) => {
        const deviceId = snap.id;
        const customName = snap.data().customName || "";

        // Eğer zaten varsa tekrar listener açma
        if (binUnsubs.current[deviceId]) return;

        // İlk kez ekleniyorsa state’e koy
        setDevices((prev) => [
          ...prev,
          { id: deviceId, customName, percentage: 0 },
        ]);

        const binRef = doc(db, "bin", deviceId);

        binUnsubs.current[deviceId] = onSnapshot(
          binRef,
          (binSnap) => {
            let percentage = 0;

            if (binSnap.exists()) {
              const distance = binSnap.data().distanceCm;
              const capacity = 50;
              const filled = capacity - distance;

              percentage = Math.round((filled / capacity) * 100);
              percentage = Math.min(100, Math.max(0, percentage));
            }

            setDevices((prev) =>
              prev.map((d) =>
                d.id === deviceId
                  ? { ...d, percentage }
                  : d
              )
            );
          }
        );
      });

      // 🔥 SİLİNEN DEVICE’LARIN LISTENER’INI KAPAT
      Object.keys(binUnsubs.current).forEach((id) => {
        if (!currentIds.includes(id)) {
          binUnsubs.current[id]();
          delete binUnsubs.current[id];
        }
      });
    });

    return () => {
      unsubDevices();
      Object.values(binUnsubs.current).forEach((u) => u());
    };
  }, []);

  const deleteDevice = async (id) => {
    await deleteDoc(
      doc(db, "users", auth.currentUser.uid, "devices", id)
    );
  };

  return (
    <div className="page-container">
      <h2>My Bins</h2>

      {devices.length === 0 && <p>No bins added yet.</p>}

      {devices.map((d) => (
        <div key={d.id} style={{ position: "relative" }}>
          <DeviceCard
            id={d.id}
            customName={d.customName}
            percentage={d.percentage}
          />

          <button
            onClick={() => deleteDevice(d.id)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              padding: "6px 10px",
              borderRadius: "6px",
              border: "none",
              background: "red",
              color: "white",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import DeviceCard from "../components/DeviceCard";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [loadingDevices, setLoadingDevices] = useState(true); // 🔹 Loading state
  const binUnsubs = useRef({});

  // MODAL STATE
  const [modal, setModal] = useState({
    open: false,
    deviceId: null,
  });

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

      // Silinenleri state'ten kaldır
      setDevices((prev) => prev.filter((d) => currentIds.includes(d.id)));

      snapshot.docs.forEach((snap) => {
        const deviceId = snap.id;
        const customName = snap.data().customName || "";

        if (binUnsubs.current[deviceId]) return;

        // Yeni cihaz eklendiğinde state'e ekle
        setDevices((prev) => [...prev, { id: deviceId, customName, percentage: 0 }]);

        const binRef = doc(db, "bin", deviceId);

        // Her cihaz için canlı güncelleme
        binUnsubs.current[deviceId] = onSnapshot(binRef, (binSnap) => {
          let percentage = 0;

          if (binSnap.exists()) {
            const distance = binSnap.data().distanceCm;
            const capacity = 50;
            const filled = capacity - distance;

            percentage = Math.round((filled / capacity) * 100);
            percentage = Math.min(100, Math.max(0, percentage));
          }

          setDevices((prev) =>
            prev.map((d) => (d.id === deviceId ? { ...d, percentage } : d))
          );
        });
      });

      // Cihazlar yüklendi → Loading kapat
      setLoadingDevices(false);

      // Silinen cihazların listener'ını kapat
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

  const confirmDelete = (id) => {
    setModal({ open: true, deviceId: id });
  };

  const deleteDevice = async () => {
    await deleteDoc(
      doc(db, "users", auth.currentUser.uid, "devices", modal.deviceId)
    );
    setModal({ open: false, deviceId: null });
  };

  return (
    <div className="page-container">
      <h2>My Bins</h2>

      {/* Loading göstergesi */}
      {loadingDevices ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <span style={{ fontSize: "18px", color: "#4a5568" }}>
            Loading devices...
          </span>
        </div>
      ) : devices.length === 0 ? (
        <div className="empty-state">
          <p>No bins added yet.</p>
          <p>Add your first Smart Bin to start tracking.</p>
        </div>
      ) : (
        devices.map((d) => (
          <div key={d.id} className="device-wrapper">
            <DeviceCard
              id={d.id}
              customName={d.customName}
              percentage={d.percentage}
            />

            <button
              className="delete-btn"
              onClick={() => confirmDelete(d.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}

      {/* CONFIRM MODAL */}
      {modal.open && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Bin</h3>
            <p>
              Are you sure you want to remove this bin?
              <br />
              This action cannot be undone.
            </p>
            <div style={{ marginTop: 16 }}>
              <button className="modal-btn" onClick={deleteDevice}>
                Yes, Delete
              </button>
              <button
                className="modal-btn"
                style={{
                  marginLeft: 10,
                  background: "#ccc",
                  color: "#333",
                }}
                onClick={() => setModal({ open: false, deviceId: null })}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

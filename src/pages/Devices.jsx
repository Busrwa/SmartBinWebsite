import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, onSnapshot, doc, getDoc, deleteDoc } from "firebase/firestore";
import DeviceCard from "../components/DeviceCard";

export default function Devices() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const userDevicesRef = collection(db, "users", auth.currentUser.uid, "devices");

    const unsub = onSnapshot(userDevicesRef, async (snapshot) => {
      const list = [];

      for (const snap of snapshot.docs) {
        const deviceId = snap.id;
        const customName = snap.data().customName || "";

        // Read ultrasonic distance
        const binRef = doc(db, "bin", deviceId);
        const binSnap = await getDoc(binRef);

        let percentage = 0;
        if (binSnap.exists()) {
          const distance = binSnap.data().distanceCm;
          const capacity = 50;
          const filled = capacity - distance;

          percentage = Math.round((filled / capacity) * 100);
          if (percentage < 0) percentage = 0;
          if (percentage > 100) percentage = 100;
        }

        list.push({ id: deviceId, customName, percentage });
      }

      setDevices(list);
    });

    return unsub;
  }, []);

  const deleteDevice = async (id) => {
    const ref = doc(db, "users", auth.currentUser.uid, "devices", id);
    await deleteDoc(ref);
    alert("Bin removed.");
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

import { useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function AddDevice() {
  const [deviceId, setDeviceId] = useState("");
  const [customName, setCustomName] = useState("");

  const saveDevice = async () => {
    if (deviceId.length !== 10) {
      return alert("Device ID must be 10 digits");
    }

    const binRef = doc(db, "bin", deviceId);
    const binSnap = await getDoc(binRef);

    if (!binSnap.exists()) {
      return alert("No bin found with this Device ID");
    }

    await setDoc(
      doc(db, "users", auth.currentUser.uid, "devices", deviceId),
      {
        deviceId,
        customName,
        addedAt: new Date()
      }
    );

    alert("Bin added successfully!");
    setDeviceId("");
    setCustomName("");
  };

  return (
    <div className="page-container">
      <h2>Add Bin</h2>

      <input
        className="input"
        placeholder="Enter 10-digit Bin ID"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
      />

      <input
        className="input"
        placeholder="Enter a custom name (optional)"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
      />

      <button className="button" onClick={saveDevice}>
        Add Bin
      </button>
    </div>
  );
}

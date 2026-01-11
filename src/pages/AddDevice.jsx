import { useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function AddDevice() {
  const [deviceId, setDeviceId] = useState("");
  const [customName, setCustomName] = useState("");

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
  });

  const openModal = (title, message) => {
    setModal({ open: true, title, message });
  };

  const closeModal = () => {
    setModal({ open: false, title: "", message: "" });
  };

  const saveDevice = async () => {
    if (deviceId.length !== 10) {
      openModal("Invalid Device ID", "Device ID must be exactly 10 digits.");
      return;
    }

    try {
      setLoading(true);

      const binRef = doc(db, "bin", deviceId);
      const binSnap = await getDoc(binRef);

      if (!binSnap.exists()) {
        openModal(
          "Bin Not Found",
          "No bin was found with this Device ID."
        );
        return;
      }

      await setDoc(
        doc(db, "users", auth.currentUser.uid, "devices", deviceId),
        {
          deviceId,
          customName,
          addedAt: new Date(),
        }
      );

      openModal("Success", "Bin added successfully!");
      setDeviceId("");
      setCustomName("");
    } catch (err) {
      openModal(
        "Error",
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-decor">
        <div className="bg-circle left" />
        <div className="bg-circle right" />
      </div>

      <div className="page-container">
        <div className="form-card">
          <h2 className="form-title">Add New Bin</h2>

          <input
            className="input"
            placeholder="Enter 10-digit Bin ID"
            value={deviceId}
            maxLength={10}
            onChange={(e) =>
              setDeviceId(e.target.value.replace(/\D/g, ""))
            }
          />

          <input
            className="input"
            placeholder="Custom name (optional)"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />

          <button
            className="button"
            onClick={saveDevice}
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Adding..." : "Add Bin"}
          </button>
        </div>
      </div>

      {/* MODAL */}
      {modal.open && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{modal.title}</h3>
            <p>{modal.message}</p>
            <button className="modal-btn" onClick={closeModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

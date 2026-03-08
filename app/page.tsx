"use client";

import { useState, useEffect } from "react";
import { submitForm } from "./actions/submitForm";

export default function Home() {

  const [step, setStep] = useState(1);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState("");

  useEffect(() => {
    const draft = localStorage.getItem("draft");
    if (draft) {
      setData(JSON.parse(draft));
    }
  }, []);

  const saveDraft = () => {
    localStorage.setItem("draft", JSON.stringify(data));
    alert("Draft Saved");
  };

  const submit = async () => {
    try {
      await submitForm(data);
      localStorage.removeItem("draft");
      alert("Submitted Successfully");
    } catch (err) {
      setError("Validation failed. Please check inputs.");
    }
  };

  return (
    <div style={{ width: "400px", margin: "50px auto", fontFamily: "Arial" }}>
      
      <h2 style={{ textAlign: "center" }}>Request Form</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* STEP 1 */}

      {step === 1 && (
        <>
          <input
            style={{ width: "100%", padding: "8px" }}
            placeholder="Name"
            value={data.name || ""}
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
          />

          <br /><br />

          <input
            style={{ width: "100%", padding: "8px" }}
            placeholder="Email"
            value={data.email || ""}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />
        </>
      )}

      {/* STEP 2 */}

      {step === 2 && (
        <>
          <input
            style={{ width: "100%", padding: "8px" }}
            placeholder="Subject"
            value={data.subject || ""}
            onChange={(e) =>
              setData({ ...data, subject: e.target.value })
            }
          />

          <br /><br />

          <textarea
            style={{ width: "100%", padding: "8px" }}
            placeholder="Description"
            rows={4}
            value={data.description || ""}
            onChange={(e) =>
              setData({ ...data, description: e.target.value })
            }
          />
        </>
      )}

      {/* STEP 3 REVIEW */}

      {step === 3 && (
        <>
          <h3>Review</h3>

          <p><b>Name:</b> {data.name}</p>
          <p><b>Email:</b> {data.email}</p>
          <p><b>Subject:</b> {data.subject}</p>
          <p><b>Description:</b> {data.description}</p>
        </>
      )}

      <br />

      {/* BUTTONS */}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        
        {step > 1 && (
          <button onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}

        {step < 3 && (
          <button onClick={() => setStep(step + 1)}>
            Next
          </button>
        )}

        <button onClick={saveDraft}>
          Save Draft
        </button>

        {step === 3 && (
          <button onClick={submit}>
            Submit
          </button>
        )}

      </div>

    </div>
  );
}
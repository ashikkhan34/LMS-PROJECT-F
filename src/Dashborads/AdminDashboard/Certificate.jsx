import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaPenFancy } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";
import { PiCertificateFill } from "react-icons/pi";
import { LiaCertificateSolid } from "react-icons/lia";

export default function Certificate() {
  const [form, setForm] = useState({
    name: "Your Name",
    course: "Web Development Course",
    date: new Date().toLocaleDateString(),
    instructor: "Gaurav Shrimali",
    certificateId: "CERT-00123",
  });

  const previewRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const generatePDF = async () => {
    try {
      setLoading(true);
      const el = previewRef.current;

      // High-resolution canvas for better PDF quality
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      // PDF dimensions based on canvas size
      const pdf = new jsPDF({
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

      // Download PDF
      pdf.save(`${form.name.replace(/\s+/g, "_")}_certificate.pdf`);
    } catch (err) {
      console.error("generatePDF error:", err);
      alert("Failed to generate PDF. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Certificate Generator</h2>

      <div className=" gap-6">
        {/* Form */}
        <div className="p-4 rounded-lg shadow">
          <div className="space-y-4">
            {["name", "course", "date", "instructor", "certificateId"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-sm font-medium">
                    {field === "name"
                      ? "Full Name"
                      : field === "course"
                      ? "Course"
                      : field === "date"
                      ? "Completion Date"
                      : field === "instructor"
                      ? "Instructor"
                      : "Certificate ID"}
                  </label>
                  <input
                    name={field}
                    value={form[field]}
                    onChange={onChange}
                    className="mt-1 block w-full border rounded px-3 py-2"
                  />
                </div>
              )
            )}

            {/* Download PDF Button */}
            <div className="flex mt-4">
              <button
                onClick={generatePDF}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
              >
                {loading ? "Generating..." : "Download Certificate PDF"}
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div
          ref={previewRef}
          className="relative w-[900px] h-[620px] bg-white shadow-2xl rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url('/certificate-template.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Outer Gradient Border (html2canvas compatible hex colors) */}
          <div
            className="absolute inset-0 rounded-xl p-4"
            style={{
              background: "linear-gradient(to right, #facc15, #fde68a, #eab308)",
            }}
          >
            <div className="w-full h-full bg-white rounded-lg relative overflow-hidden">
              {/* Inner Border */}
              <div
                className="absolute inset-[12px] border-2"
                style={{ borderColor: "#eab308", borderRadius: "0.5rem" }}
              ></div>

              {/* Icons at top */}
              <div className="pt-10 ml-8">
                <div className="flex justify-between px-7">
                  <PiCertificateFill
                    className="text-5xl"
                    style={{ color: "#facc15" }}
                  />
                  <LiaCertificateSolid
                    className="text-5xl"
                    style={{ color: "#facc15" }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
                <h1
                  className="text-4xl font-bold tracking-widest text-gray-900 uppercase"
                  style={{ fontFamily: "Georgia, serif", letterSpacing: "5px" }}
                >
                  Certificate of Completion
                </h1>

                <p className="mt-2 text-sm text-gray-500 italic">
                  This is to certify that
                </p>

                <h2
                  className="mt-5 text-5xl font-semibold text-gray-800"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {form.name}
                </h2>

                <p className="mt-4 text-gray-700 text-lg">
                  has successfully completed the <br />
                  <span className="font-semibold text-gray-900">
                    {form.course}
                  </span>
                </p>

                <div className="mt-10 flex items-center justify-center gap-16 text-gray-700">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{form.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Instructor</p>
                    <p className="font-medium">{form.instructor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Certificate ID</p>
                    <p className="font-medium">{form.certificateId}</p>
                  </div>
                </div>

                {/* Signature */}
                <div className="absolute bottom-8 right-20 flex flex-col items-center">
                  <FaPenFancy className="text-gray-800 text-3xl mb-1" />
                  <p className="text-sm text-gray-500">Director</p>
                  <p className="font-semibold text-gray-800">Gaurav Shrimali</p>
                </div>

                {/* Gold Seal */}
                <div className="absolute bottom-4 left-20 w-24 h-24 flex items-center justify-center">
                  <GiLaurelsTrophy className="text-yellow-500 text-6xl shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

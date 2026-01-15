// app/components/PwaInstall.jsx
export default function PwaInstall() {
  return (
    <section className="py-12 bg-white text-black rounded-lg ">
      <h2 className="text-3xl font-bold text-center  mb-6">
        Install EMI Mitra as an App
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto text-center mb-6">
        Get quick access to EMI Mitra by installing it as a Progressive Web App
        (PWA) on your device.
      </p>
      <div className="space-y-4 max-w-3xl mx-auto">
        <p>
          <strong>Chrome (Desktop):</strong> Click the &quot;Install&quot; icon
          in the address bar or go to Menu {">"} Install App.
        </p>
        <p>
          <strong>Chrome/Safari (Mobile):</strong> Tap &quot;Add to Home
          Screen&quot; from the browser menu.
        </p>
        <p>
          <strong>Edge:</strong> Click the &quot;App available&quot; icon in the
          address bar or go to Menu {">"} Apps {" >"} Install EMI Mitra.
        </p>
      </div>
    </section>
  );
}

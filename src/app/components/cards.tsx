// app/page.tsx
export default function Cards() {
  return (
    <>
      <div className="card">
        <div style={{ fontSize: 50, color: "#7b4eff" }}>📷</div>
        <strong>Reportar</strong>
        <p style={{ fontSize: 12, textAlign: "center", margin: 0 }}>
          Generar nuevo reporte con captura y ve los ya reportados
        </p>
      </div>

      {/* Repite para los demás */}
    </>
  );
}

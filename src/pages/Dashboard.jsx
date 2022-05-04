export default function Dashboard() {
  return (
    <div className="mx-auto p-4 mt-5 w-50">
      <h1>Portal Optica Madero</h1>
      <p>Para accesar al portal inicia session aqui: </p>
      <button
        onClick={() => {
          window.location.href = "/login";
        }}
        type="button"
      >
        Acceder
      </button>
    </div>
  );
}

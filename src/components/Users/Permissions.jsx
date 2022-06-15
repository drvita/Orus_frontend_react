export default function PermissionsComponent({ data: currentUser }) {
  return (
    <div className="card card-primary card-outline mt-4">
      <div className="card-header">
        <h5 className="card-title text-primary">Tipo y permisos</h5>
      </div>
      <div className="card-body">
        <span className="badge badge-dark m-1">{currentUser.role}</span>
        {currentUser.data?.permissions?.map((permission, i) => (
          <span className="badge badge-primary m-1" key={i}>
            {permission}
          </span>
        ))}
      </div>
    </div>
  );
}

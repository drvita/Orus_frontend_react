export default function PermissionsComponent({ data }) {
  return (
    <div className="card card-primary card-outline mt-4">
      <div className="card-header">
        <h5 className="card-title text-primary">Tipo y permisos</h5>
      </div>
      <div className="card-body">
        <span className="badge badge-dark m-1">{data?.role ?? '--'}</span>
        {data?.permissions?.map((permission, i) => (
          <span className="badge badge-primary m-1" key={i}>
            {permission}
          </span>
        ))}
      </div>
    </div>
  );
}

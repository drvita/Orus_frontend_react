import moment from "moment";
export default function ActivitysComponents(props) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-muted text-bold w-100 mb-4 text-left">
          <i className="fas fa-bars mr-1"></i>
          Actividad
        </h5>

        {props.data.map((ac, i) => {
          const { data, type } = ac;

          return (
            <p className="card-text border-bottom text-left" key={i}>
              <span
                className={
                  type !== "deleted"
                    ? type === "created"
                      ? "badge badge-success text-uppercase"
                      : "badge badge-primary text-uppercase"
                    : "badge badge-danger text-uppercase"
                }
              >
                {type}
              </span>
              <span className="mx-2 text-uppercase">
                {moment(data.datetime).format("DD-MMMM-YYYY HH:mm")}
              </span>
              <span className="text-bold text-capitalize">
                {data.user?.name.toLowerCase()}
              </span>

              {Boolean(Object.keys(data.inputs).length) && (
                <span className="px-2">
                  {Object.keys(data.inputs).map((input, i) => (
                    <span
                      key={i}
                      className="badge badge-light text-uppercase mx-1"
                    >
                      {input} / {data.inputs[input]}
                    </span>
                  ))}
                </span>
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}

import Navtop from "../components/Layouts/navtop";
import Breadcrumb from "../components/Layouts/breadcrumb";
import Menu from "../components/Layouts/menu";

export default function Main({ children }) {
  const data = {};

  return (
    <div className="wrapper" >
      <Navtop logOut={() => {}} data={data} page={() => {}} />
      
      <Menu
        companyName={"company"}
        user={data}
        page={() => {}}
        logOut={() => {}}
        active={"active"}
      />

      <div className="content-wrapper">
        <Breadcrumb />
        <div className="content">
          <div className="container-fluid">
            <div className="row" style={{minHeight:'100vh'}}>
              <div className="col-lg-12">{children}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

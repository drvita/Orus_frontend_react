import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
//Components
import Main from "../../../layouts/list_inbox";
//Actions
import { contactActions } from "../../../redux/contact";
import { examActions } from "../../../redux/exam";
import helper from "../helpers";

function PendingOrdersComponent(props) {
  //Vars
  const {
    _getContact,
    _getExam,
    _setContact,
    _setExam,
    handleChangePanel: _handleChangePanel,
  } = props;
  //States
  const [data, setData] = useState([]),
    [load, setLoad] = useState(true),
    [item, setItem] = useState(0);
  //Functions
  const handleDeleteItem = () => {
      const callback = () => setLoad(true);
      helper.removeDataTemporary(item.id, callback);
      setItem(0);
    },
    handleSelectItem = ({ checked }, item) => {
      if (!checked) item = { id: 0 };
      setItem(item);
    },
    handleUseItem = () => {
      if (item.contact.id) {
        _getContact(item.contact.id);
      }
      if (item.exam_id) {
        _getExam(item.exam_id);
      }
      setItem(0);
      _handleChangePanel(null, 2);
    };

  useEffect(() => {
    if (load) {
      setData(helper.getDataTemporary(true));
      setLoad(false);
      _setContact();
      _setExam();
    }
    // eslint-disable-next-line
  }, [load]);
  //console.log("[DEBUG] Render data", data);

  return (
    <Main
      title="Examenes sin orden"
      icon="notes-medical"
      color="info"
      itemSelected={item}
      handleDeleteItem={handleDeleteItem}
      handleEditItem={handleUseItem}
    >
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Paciente</th>
            <th>Examen</th>
            <th>Productos</th>
            <th>Session</th>
            <th>Creado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((temp, i) => {
            return (
              <tr key={i}>
                <td>
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      className="form-check-input mt-4"
                      id={"exam_" + temp.id}
                      checked={temp.id === item.id ? true : false}
                      onChange={({ target }) => handleSelectItem(target, temp)}
                    />
                    <label
                      htmlFor={"exam_" + temp.id}
                      className="sr-only"
                    ></label>
                  </div>
                </td>
                <th className="text-truncate">
                  <span className="text-capitalize">{temp.contact.name}</span>
                </th>
                <td># {temp.exam_id}</td>
                <td className="text-right">
                  <span className="badge badge-dark">{temp.items.length}</span>
                </td>
                <td style={{ maxWidth: "250px" }}>
                  <p className="text-truncate">
                    <span>{temp.session}</span>
                  </p>
                </td>
                <td>{moment(temp.created_at).fromNow()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Main>
  );
}

const mapStateToProps = ({ contact, exam }) => {
    return {
      contact: contact.contact,
      exam: exam.exam,
    };
  },
  mapActionsToProps = {
    _getContact: contactActions.getContact,
    _setContact: contactActions.setContact,
    _getExam: examActions.getExam,
    _setExam: examActions.setExam,
  };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PendingOrdersComponent);

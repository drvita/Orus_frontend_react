const verifyItem = (item) => {
  if (item.cant <= 0) {
    window.Swal.fire({
      title: "Verificacion",
      text: "La cantidad debe de ser un valor valido",
      icon: "warning",
    });
    return false;
  }
  if (!item.store_items_id) {
    window.Swal.fire({
      title: "Verificacion",
      text: "No se selecciono un producto valido",
      icon: "warning",
    });
    return false;
  }
  if (!item.price) {
    window.Swal.fire({
      title: "Verificacion",
      text: "El precio no es valido",
      icon: "warning",
    });
    return false;
  }

  return true;
};
const handleVerifyData = (data, codeRef) => {
  const {
    category_id,
    category_id1,
    category_id2,
    category_id4,
    supplier,
    brand_id,
    code,
  } = data;

  if (!category_id) {
    window.Swal.fire(
      "Verificación",
      "Selecione una categoria primero",
      "warning"
    );
    return false;
  }

  if (category_id) {
    if (category_id1 === 1 && category_id4 !== category_id) {
      window.Swal.fire(
        "Verificación",
        "Selecione una categoria valida para lentes",
        "warning"
      );
      return false;
    } else if (category_id1 === 2 && category_id2 !== category_id) {
      window.Swal.fire(
        "Verificación",
        "Selecione una categoria valida para armazones",
        "warning"
      );
      return false;
    }
  }

  if (category_id1 === 2 && !supplier) {
    window.Swal.fire(
      "Verificación",
      "Selecione un PROVEEDOR valido primero",
      "warning"
    );
    return false;
  }
  if (category_id1 === 2 && !brand_id) {
    window.Swal.fire(
      "Verificación",
      "Selecione una MARCA valida primero",
      "warning"
    );
    return false;
  }
  if (!code && !codeRef.current.value) {
    window.Swal.fire(
      "Verificación",
      "Escriba una CODIGO para este producto",
      "warning"
    );
    return false;
  }

  return true;
};
const handleDeleteItem = (item, options, _delete, text) => {
  if (item.id) {
    //Check text
    if (!text) text = `¿Esta seguro de eliminar el producto ${item.code}?`;
    //delete confirm
    window.Swal.fire({
      text,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (!dismiss && _delete) {
        _delete({
          id: item.id,
          options,
        });
        return true;
      }
    });
    return false;
  }
};
const handleSaveItem = (id, data, options, _save, _close, text) => {
  if (!text) {
    text = id
      ? "¿Esta seguro de actualizar el producto?"
      : "¿Esta seguro de crear un nuevo producto?";
  }
  window.Swal.fire({
    title: "Almacenamiento",
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#007bff",
    confirmButtonText: id ? "Actualizar" : "Crear",
    cancelButtonText: "Cancelar",
    showLoaderOnConfirm: true,
  }).then(({ dismiss }) => {
    if (!dismiss && _save) {
      //Save
      _save({
        id,
        data,
        options,
      });
      //close
      if (_close) _close();
    }
  });
};
const handleCatOne = (data) => ({
    category_id: data.id,
    category_id1: data.id,
    category_id2: 0,
    category_list2: data.hijos,
    category_id3: 0,
    category_list3: [],
    category_id4: 0,
    category_list4: [],
    supplier: 0,
  }),
  handleCatTwo = (data) => ({
    category_id: data.id,
    category_id2: data.id,
    category_id3: 0,
    category_list3: data.hijos,
    category_id4: 0,
    category_list4: [],
  }),
  handleCatTree = (data) => ({
    category_id: data.id,
    category_id3: data.id,
    category_id4: 0,
    category_list4: data.hijos,
  });
const handleCodeString = ( stringcode = "armazon", category, brand, code = "") => { 


    stringcode += category !== null ? " " + category.trim() : "";

    stringcode += brand !== null  ? " " + brand.trim().replace(/\s/gim, ""): "";

    if (code) {
      stringcode += " " + code.replace(/[-\s]+/gm, "");
    }

    return stringcode.toLowerCase();
    //console.log(stringcode.toLowerCase());
  },


  codeLentString = (string) => {
    switch (string) {
      case "monofocales":
        return "MF";
      case "bifocales":
        return "BF";
      case "progresivo basico":
      case "progresivo-basico":
        return "PB";
      case "progresivo digital":
      case "progresivo-digital":
        return "PD";
      case "plastico":
        return "CR";
      case "policarbonato":
        return "PL";
      case "hi-index":
      case "hi index":
        return "HI";
      case "antirreflejantes":
        return "AR";
      case "photo":
        return "PH";
      case "ar & photo":
      case "antirreflejante-photo":
        return "ARPH";
      case "blanco":
        return "BL";
      case "polarizado":
        return "PO";
      case "bifocal invisible":
      case "bifocal-invisible":
        return "BI";
      case "monofocal drivesafe":
      case "monofocal-drivesafe":
      case "monofocal digital drivesafe":
      case "monofocal digital DriveSafe":
        return "MDSF";
      case "monofocal superb":
      case "monofocal-superb":
      case "monofocal digital superb":
        return "MDSU";
      case "monofocal individual":
      case "monofocal-individual":
      case "monofocal digital individual":
        return "MDIN";
      default:
        return "XX";
    }
  },
  handleCodeLent = (grad, category1, category2, category3) => {
    if (!category1 || !category2 || !category3) {
      return "";
    }

    let stringcode =
      category1 !== null
        ? codeLentString(
            category1
              .trim()
              .toLowerCase()
          )
        : "";
    stringcode +=
      category2 !== null
        ? codeLentString(
            category2
              .trim()
              .toLowerCase()
          )
        : "";
    stringcode +=
      category3 !== null
        ? codeLentString(
            category3
              .trim()
              .toLowerCase()
          )
        : "";

    return stringcode + grad.toString().trim().replace(/\s/gim, "");
  },


  handleNameLent = (grad, category1, category2, category3) => {
    if (!category1 || !category2 || !category3) {
      return "";
    }

    let stringcode = "";

    stringcode +=
      category1 !== null
        ? category1.trim()
        : "";
      
    stringcode +=
      category2 !== null
        ? " " +
          category2.trim()
        : "";


    stringcode +=
      category3 !== null
        ? " " +
          category3.trim()
        : "";

    stringcode += " " + grad.toString();

    return stringcode.toLowerCase();

  };

const toExport = {
  verifyItem,
  handleDeleteItem,
  handleVerifyData,
  handleSaveItem,
  handleCatOne,
  handleCatTwo,
  handleCatTree,
  handleCodeString,
  handleCodeLent,
  codeLentString,
  handleNameLent,
};

export default toExport;

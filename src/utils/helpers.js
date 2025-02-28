const getSession = () => {
    return (
      Math.random().toString(36).substring(2, 16) +
      Math.random().toString(36).substring(2, 16) +
      Math.random().toString(36).substring(2, 16) +
      Math.random().toString(36).substring(2, 16) +
      Math.random().toString(36).substring(2, 16) +
      Math.random().toString(36).substring(2, 16) +
      Math.random().toString(10)
    );
  };


  const toExport = {
      getSession
  }


  export default toExport;
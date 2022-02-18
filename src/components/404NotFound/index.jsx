/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { defaultActions } from "../../redux/default";

export default function NotFoundComponent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(defaultActions.changeNamePage(""));
  }, []);

  return (
    <div className="container text-center font-weight-bold d-flex justify-content-center mt-5">
      <h1>404 Not Found</h1>
    </div>
  );
}

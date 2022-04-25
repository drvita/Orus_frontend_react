import { api, setUrl } from "../utils/url";

export default function useExam() {
  const getExams = async (options) => {
    if (!options) return null;

    const url = setUrl("exams", null, options);

    return await api(url, "GET")
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when get contacts list in hook:",
          err.message
        );

        return null;
      });
  };
  const getExam = async (id) => {
    if (!id) return false;

    const url = setUrl("exams", id);

    return await api(url, "GET")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when get contact in hook:",
          err.message
        );

        return {};
      });
  };
  const deleteExam = async (id) => {
    if (!id) return false;

    const url = setUrl("exams", id);

    return await api(url, "DELETE")
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when delete contact in hook:",
          err.message
        );

        return false;
      });
  };
  const saveExam = async (data) => {
    if (!data) return;
    const { id } = data;
    delete data.id;

    if (id) {
      const url = setUrl("exams", id);

      return await api(url, "PUT", data)
        .then((res) => {
          // console.log("[DEBUG] exam hook:", res);
          return res.data;
        })
        .catch((err) => {
          console.error(
            "[Orus System] Catch when save contact in hook:",
            err.message
          );

          return null;
        });
    } else {
      const url = setUrl("exams");

      return await api(url, "POST", data)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.error(
            "[Orus System] Catch when save contact in hook:",
            err.message
          );

          return null;
        });
    }
  };

  return {
    getExams,
    getExam,
    deleteExam,
    saveExam,
  };
}

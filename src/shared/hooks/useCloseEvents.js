import { useEffect } from "react";

const useCloseEvents = (refs, callback) => {
  useEffect(() => {
    const clickHandler = (e) => {
      refs.reduce(
        (result, ref) =>
          ref.current?.contains(e.target) ? (result = false) : result,
        true
      ) && callback();
    };

    const keydownHandler = (e) => {
      e.key === "Escape" && callback();
    };

    document.addEventListener("mousedown", clickHandler);
    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [refs, callback]);
};

export default useCloseEvents;

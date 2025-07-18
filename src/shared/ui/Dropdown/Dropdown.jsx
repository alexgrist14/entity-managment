import styles from "./Dropdown.module.css";
import { useMemo, useState, useRef } from "react";
import useCloseEvents from "../../hooks/useCloseEvents";
import { SvgChevron } from "../SvgChevron/SvgChevron";

const Dropdown = ({ selectedId, list, onSelect }) => {
  const wrapperRef = useRef(null);
  const selectedItem = useMemo(
    () => list.find((item) => item.id === selectedId),
    [list, selectedId]
  );

  const [isActive, setIsActive] = useState(false);

  useCloseEvents([wrapperRef], () => setIsActive(false));

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.field} onClick={() => setIsActive(!isActive)}>
        <div className={styles.input}>
          {selectedItem?.content || selectedItem?.id || ""}
        </div>
        <SvgChevron
          className={styles.svg}
          style={{ rotate: isActive ? "180deg" : "0deg" }}
        />
      </div>
      {isActive && (
        <ul className={styles.dropdown}>
          {list.map((item) => (
            <li
              className={styles.dropdown__item}
              key={item.id}
              onClick={() => {
                onSelect(item.id);
                setIsActive(false);
              }}
            >
              {item.content || item.id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

import styles from "./Table.module.css";
import classNames from "classnames";

const Table = ({ headers, rows }) => {
  const headerKeys = Object.keys(headers);

  return (
    <div className={styles.table}>
      {headerKeys.map((key, i) => (
        <div key={`${key}_${i}`} className={styles.table__column}>
          {[headers, ...rows].map((row, i) => {
            const cell = row[key];

            return (
              <div
                key={i}
                className={classNames(
                  styles.table__cell,
                  i === 0 && styles.table__cell_header
                )}
              >
                {typeof cell === "string" ? <p>{cell}</p> : cell}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Table;

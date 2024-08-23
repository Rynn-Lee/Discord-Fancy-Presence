import type { ComponentProps } from "react";
import styles from "./select.module.scss";

type SelectProps = ComponentProps<"select">;

export default function Select({ children, ...props }: SelectProps) {
  return (
    <select {...props} className={styles.select}>
      {children}
    </select>
  );
}

Select.Option = function Option({ c }) {
  return <option value=""></option>;
};

import styles from "./input.module.scss";

type InputProps = React.ComponentProps<"input">;

export default function Input(props: InputProps) {
  return <input {...props} className={styles.input} />;
}

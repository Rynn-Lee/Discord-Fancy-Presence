import styles from './input.module.sass'

interface InputProps extends React.ComponentProps<"input"> {
  inputProps?: string;
}

const Input: React.FunctionComponent<InputProps> = ({...inputProps}) => {
  return (
    <input {...inputProps} className={styles.input}/>
  );
};

export default Input;

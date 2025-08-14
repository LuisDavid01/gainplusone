
interface IButtonProps {
  buttonClass?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
}

const Button = (props: IButtonProps) => {
  return (
    <>
      <button onClick={props.handleClick} className={props.buttonClass}>
        {props.children}
      </button>
    </>
  );
};

export default Button;
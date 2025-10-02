interface ButtonProps {
  label: string;
  color?: string;
  onClick: () => void;
}

const Button = ({ label, onClick, color = "white" }: ButtonProps) => {
  return (
    <button style={{ backgroundColor: "red", color }} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;

interface IButton {
    children: JSX.Element
    onClick?: ()=> void;
    onMouseOver?: ()=> void;
    disabled?: boolean;
}

function Button({
    children,
    disabled=false,
    onClick = () => {},
    onMouseOver = () => {},
    ...props
}: IButton) {
  return (
    <button disabled={disabled} className="  text-lg cursor-pointer bg-[#ffe3e1] text-[#e67373] shadow-[1px_1px_2px_#ff9494] transition-[0.3s] mb-5 m-2.5 px-5 py-2.5 rounded-xl  hover:bg-[#ff9494] hover:text-[#ffe3e1] hover:shadow-[1px_1px_2px_#ffe3e1] hover:border-2 hover:border-solid hover:border-[#ff9494] border-[2px] border-solid border-[#ff9494]" onClick={onClick} onMouseOver={onMouseOver} {...props}>
      {children}
    </button>
  );
}

export default Button;

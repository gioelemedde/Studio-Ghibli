import React from "react";

interface ButtonProps {
    transparent:boolean
    children?: React.ReactNode;
  }

const Button :React.FC<ButtonProps> = ({children, transparent})=> {
    const classTransparent = 'border-2 border-sky-600 py-2 px-4 text-sky-500 rounded-xl hover:bg-sky-500 hover:text-white'
    const classNormal = 'py-2 px-4 border-2 border-sky-600 bg-sky-600 rounded-xl hover:bg-transparent hover:text-sky-500 '
    return ( 
        <button className={transparent ? classTransparent : classNormal}>
            {children}
        </button>
     );
}

export default Button;
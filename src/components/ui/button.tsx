import clsx from "clsx";
import { FC, HTMLProps } from "react";

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    type: HTMLButtonElement["type"]
}

export const Button: FC<ButtonProps> = ({children, disabled, ...props}) => {
    return <button className={clsx(`
        bg-purple 
        px-3 
        py-2 
        rounded-md 
        text-sm 
        font-semibold 
        hover:bg-purple-light
        focus-visible:outline-2 
        focus-visible:outline-offset-4
        focus-visible:outline-purple
        text-grey`,
        disabled && "cursor-default opacity-50",
        )}
        {...props}
    >{children}</button>
}
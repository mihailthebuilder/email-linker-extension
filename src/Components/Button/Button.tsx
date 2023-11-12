import { InputHTMLAttributes, ReactNode } from 'react';

interface Props extends InputHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

function Button({ type, children, ...props }: Props) {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5 focus:outline-none focus:shadow-outline"
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
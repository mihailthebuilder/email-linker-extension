import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    type: string;
}

function TextInput({ type, ...props }: Props) {
    return (
        <input
            className="mb-5 p-2 text-black border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type={type}
            name={type}
            id={type}
            placeholder={type}
            {...props}
        />
    )
}

export default TextInput
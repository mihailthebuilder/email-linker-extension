import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> { }

function TextInput({ ...props }: Props) {
    return (
        <input
            className="mb-5 p-2 text-black border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
            {...props}
        />
    )
}

export default TextInput
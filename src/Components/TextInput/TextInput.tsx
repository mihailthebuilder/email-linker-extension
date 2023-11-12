import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    type: string;
}

function TextInput({ type, ...props }: Props) {
    return (
        <input
            className="mb-5 p-1 text-black"
            type={type}
            name={type}
            id={type}
            placeholder={type}
            {...props}
        />
    )
}

export default TextInput
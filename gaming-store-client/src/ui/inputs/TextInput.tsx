import TextField from '@mui/material/TextField';
import React, { FC, HTMLInputTypeAttribute, useCallback } from 'react';

interface Props {
    value?: string;
    type?: HTMLInputTypeAttribute;
    title?: string;
    onChange?: (value: string) => void;
}

export const TextInput: FC<Props> = ({ onChange, type = 'text', value, title }) => {
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
        },
        [onChange],
    );

    return (
        <TextField
            className="text-input"
            label={title}
            value={value}
            onChange={handleChange}
            type={type}
            variant="standard"
        />
    );
};

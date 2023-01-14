import TextField from '@mui/material/TextField';
import React, { FC, HTMLInputTypeAttribute, useCallback } from 'react';
import classNames from 'classnames';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    value?: string;
    type?: HTMLInputTypeAttribute;
    title?: string;
    outline?: boolean;
    className?: string;
    onChange?: (value: string) => void;
}

export const TextInput: FC<Props> = ({
    onChange,
    className,
    type = 'text',
    value,
    title,
    outline,
}) => {
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
        },
        [onChange],
    );

    return (
        <TextField
            className={classNames('text-input', className)}
            label={title}
            value={value}
            onChange={handleChange}
            type={type}
            variant={!outline ? 'standard' : undefined}       
            InputProps={{ startAdornment:(<InputAdornment position="end"><SearchIcon/></InputAdornment>),}}
        />
    );
};

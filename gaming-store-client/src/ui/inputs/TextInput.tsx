import TextField from '@mui/material/TextField';
import React, { FC, HTMLInputTypeAttribute, useCallback } from 'react';
import classNames from 'classnames';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    value?: string;
    type?: HTMLInputTypeAttribute;
    title?: string;
    outline?: boolean;
    className?: string;
    addSearchIcon?: boolean;
    onChange?: (value: string) => void;
}

export const TextInput: FC<Props> = ({
    onChange,
    className,
    type = 'text',
    value,
    title,
    outline,
    addSearchIcon,
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
            InputProps={
                addSearchIcon
                    ? {
                          endAdornment: <SearchIcon />,
                      }
                    : undefined
            }
        />
    );
};

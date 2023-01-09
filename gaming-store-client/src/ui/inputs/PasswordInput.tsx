import { VisibilityOff, Visibility } from '@mui/icons-material';
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import { FC, useCallback, useState } from 'react';

interface Props {
    value?: string;
    title?: string;
    onChange?: (value: string) => void;
}

export const PasswordInput: FC<Props> = ({ value, title, onChange }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    }, []);

    return (
        <FormControl className="password-input text-input" variant="standard">
            <InputLabel>{title ?? 'Password'}</InputLabel>
            <Input
                value={value}
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

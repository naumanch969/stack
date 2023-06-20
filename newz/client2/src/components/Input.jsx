import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material'

const Input = ({ name, label, value, handleChange, handleShowPassword, autoFocus, type, half }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12} >
            <TextField
                name={name}
                label={label}
                value={value}
                required
                onChange={handleChange}
                variant="outlined"
                fullWidth
                autoFocus={autoFocus}
                type={type}
                InputProps={name === "password" ? {
                    endAdornment: (              // textfield k akir pe ane wala icon
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShowPassword}>
                                {type === "password" ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    )
}

export default Input
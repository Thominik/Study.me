import {FormControl, MenuItem, TextField} from "@mui/material";


interface Props {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}
const title = "Sortowanie";

export default function SelectGroup({options, onChange, selectedValue}: Props) {
    return (
            <FormControl component="fieldset" sx={{mr: 5, ml: 5, mt: 3, minWidth: 150}}>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Sortowanie"
                    value={selectedValue}
                    onChange={onChange}
                >
                    {options.map(({value, label}) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
    )
}
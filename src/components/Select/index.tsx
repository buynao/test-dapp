import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

type Props = {
  label: string;
  value?: any;
  setValue?: React.SetStateAction<any>;
  list: {
    name: string;
    value: string;
  }[];
};
export default function SelectSmall({ label, value, setValue, list }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <>
      <FormControl
        sx={{
          m: 1,
          minWidth: '90%',
          margin: 0,
          marginBottom: '10px',
        }}
        size="small"
      >
        <InputLabel id="select-small-label">{label}</InputLabel>
        <Select
          labelId="select-small-label"
          value={value}
          label={label}
          onChange={handleChange}
          size="small"
        >
          {label === 'Select Spender Address' && (
            <MenuItem value={''}>Custom</MenuItem>
          )}
          {list.map((item) => {
            return (
              <MenuItem key={item.value + label} value={item.value}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}

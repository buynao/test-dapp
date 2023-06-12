import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type Props = {
  label: string | undefined;
  value?: any;
  setValue?: React.SetStateAction<any>;
};
export default function InputSmall({ label, value, setValue }: Props) {
  return (
    <Box
      component="form"
      sx={{
        marginBottom: '10px',
      }}
    >
      <TextField
        sx={{
          minWidth: '90%',
        }}
        size="small"
        defaultValue={value}
        onBlur={(e) => setValue(e.target.value)}
        placeholder={`输入${label}`}
        label={label}
        variant="outlined"
      />
    </Box>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type Props = {
  label: string | undefined;
  value?: any;
  rows?: number;
  setValue?: React.SetStateAction<any>;
};
export default function TextArea({ label, value, setValue, rows }: Props) {
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
        rows={rows || 12}
        size="small"
        defaultValue={value}
        onBlur={(e) => setValue(e.target.value)}
        placeholder={`输入${label}`}
        label={label}
        variant="outlined"
        multiline
      />
    </Box>
  );
}

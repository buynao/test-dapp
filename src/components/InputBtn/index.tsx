import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { AddBoxOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';

type Props = {
  value: string;
  label: string | undefined;
  setValue?: React.SetStateAction<any>;
  saveValue?: () => void;
};
export default function InputBtn({ value, setValue, saveValue, label }: Props) {
  return (
    <Box
      component="form"
      sx={{
        marginBottom: '10px',
      }}
    >
      <TextField
        sx={{
          minWidth: '82%',
        }}
        size="small"
        defaultValue={value}
        placeholder={label}
        onBlur={(e) => setValue(e.target.value)}
        label={label}
        variant="outlined"
      />
      <IconButton
        onClick={() => {
          saveValue?.();
        }}
        type="button"
        sx={{}}
        aria-label="add"
      >
        <AddBoxOutlined />
      </IconButton>
    </Box>
  );
}

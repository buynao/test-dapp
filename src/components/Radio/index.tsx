import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

type Radios<T> = {
  value: T;
  name: string;
}[];
type Props<T extends string> = {
  radios: Radios<T>;
  value: T;
  setValue: (val: T) => void;
};
export default function RadioButtons({
  radios,
  value,
  setValue,
}: Props<string>) {
  return (
    <FormControl>
      <RadioGroup
        value={value}
        onChange={(e) => setValue(e.target.value)}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {radios.map((item) => {
          return (
            <FormControlLabel
              key={item.name}
              value={item.value}
              control={<Radio />}
              label={item.name}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

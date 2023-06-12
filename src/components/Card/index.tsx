import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SelectSmall from '../Select';
import InputSmall from '../Input';
import Radio from '../Radio';
import TextArea from '../TextArea';
import InputBtn from '../InputBtn';

export type List = {
  type:
    | 'title'
    | 'content'
    | 'select'
    | 'input'
    | 'radio'
    | 'textArea'
    | 'inputBtn'
    | '';
  title?: string;
  content?: any;
  list?: { name: string; value: any }[];
  label?: string;
  value?: any;
  setValue?: React.Dispatch<React.SetStateAction<any>>;
  rows?: number;
  saveValue?: () => void;
};
type Props = {
  list: List[];
  buttons?: {
    disabled?: boolean;
    name: string;
    loading?: boolean;
    onClick?: () => void;
  }[];
};

export default function BasicCard({ buttons, list }: Props) {
  return (
    <Card
      sx={{
        textAlign: 'left',
      }}
    >
      <CardContent>
        {list?.map((item) => {
          if (item.type === 'title') {
            return (
              <Typography
                key={item.title}
                variant="h5"
                component="div"
                sx={{ marginBottom: '10px', wordWrap: 'break-word' }}
              >
                {item.title}
              </Typography>
            );
          }
          if (item.type === 'content') {
            return (
              <Typography
                key={item.title}
                variant="body2"
                color="text.secondary"
                sx={{
                  marginTop: '20px',
                  marginBottom: '20px',
                  wordWrap: 'break-word',
                }}
              >
                {item.title || 'message'}: {item.content}
              </Typography>
            );
          }
          if (item.type === 'select' && item.list && item.label) {
            return (
              <SelectSmall
                key={item.value + item.label}
                list={item.list}
                label={item.label}
                value={item.value}
                setValue={item.setValue}
              />
            );
          }
          if (item.type === 'input') {
            return (
              <InputSmall
                key={item.value + item.label}
                label={item.label}
                value={item.value}
                setValue={item.setValue}
              />
            );
          }
          if (item.type === 'textArea') {
            return (
              <TextArea
                key={item.value + item.label}
                label={item.label}
                value={item.value}
                setValue={item.setValue}
                rows={item.rows}
              />
            );
          }
          if (item.type === 'radio' && item.list && item.setValue) {
            return (
              <Radio
                key={item.value}
                value={item.value}
                radios={item.list}
                setValue={item.setValue}
              />
            );
          }
          if (item.type === 'inputBtn') {
            return (
              <InputBtn
                key={item.label}
                value={item.value}
                label={item.label}
                setValue={item.setValue}
                saveValue={item.saveValue}
              />
            );
          }
        })}
      </CardContent>
      <CardActions>
        {buttons?.map((button, index) => {
          return (
            <Button
              key={index}
              disabled={button.disabled ?? false}
              size="small"
              variant="outlined"
              onClick={button.onClick}
            >
              {button.name}
            </Button>
          );
        })}
      </CardActions>
    </Card>
  );
}

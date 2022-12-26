import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

export default function MyButton({ label, clickHandler }) {
  return (
    <Button
      sx={{ m: 0.5, borderRadius: 3 }}
      variant="contained"
      startIcon={<Avatar src={`${label}.png`} />}
      onClick={clickHandler}
    >
      {label}
    </Button>
  );
}

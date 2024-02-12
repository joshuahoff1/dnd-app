import { Monster } from '@/app/_apis/dnd5eTypings';
import Dialog from '@mui/material/Dialog';

export interface SimpleDialogProps {
    open: boolean;
    monsterInfo: Monster;
    onClose: () => void;
  }  

export const MonsterInfoDialog = (props: SimpleDialogProps) => {
  const { onClose, monsterInfo, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <pre>{JSON.stringify(monsterInfo, undefined, 2)}</pre>
    </Dialog>
  );
}
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;
  message: string;
  title: string;
  cancelText: string;
  continueText: string;
  onClose: () => void;
  onCancel: () => void;
}

const AppAlertDialog = ({ onClose, message, title, open, onCancel, cancelText = "Cancel", continueText = "Continue" }: Props) => {
  const onCountinue = () => {
    onCancel();
    onClose();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" onClick={onCancel}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer bg-app-secondary hover:bg-app-secondary-dark text-black" onClick={onCountinue}>
            {continueText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppAlertDialog;

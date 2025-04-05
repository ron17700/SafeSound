import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CustomNeutralIcon from '../assets/icons/natural';
import { InProgressIcon } from '../assets/icons/in_progress';

export const getClassIcon = (className: string | undefined) => {
  switch (className) {
    case 'Good':
      return <CheckCircleIcon style={{ color: 'green' }} />;
    case 'Bad':
      return <ErrorIcon style={{ color: 'red' }} />;
    case 'Natural':
      return <CustomNeutralIcon />;
    case 'In Progress':
      return <InProgressIcon />;
    default:
      return null;
  }
};

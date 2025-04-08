import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CustomNeutralIcon from '../assets/icons/natural';
import { InProgressIcon } from '../assets/icons/in_progress';
import { Class, Status } from '../../../server/models/chunk.model';

export const getClassIcon = (className: Class, status: Status) => {
  if (status && status === Status.InProgress) {
    return <InProgressIcon />;
  }

  switch (className) {
    case 'Good':
      return <CheckCircleIcon style={{ color: 'green' }} />;
    case 'Bad':
      return <ErrorIcon style={{ color: 'red' }} />;
    case 'Natural':
      return <CustomNeutralIcon />;
    default:
      return null;
  }
};

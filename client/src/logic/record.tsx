import CustomNeutralIcon from '../assets/icons/natural';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export const getClassIcon = (className: string | undefined) => {
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

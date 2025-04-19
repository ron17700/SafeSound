import CustomNeutralIcon from '../assets/icons/natural';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

export const getClassIcon = (
  className: string | undefined,
  isEmpty = false
) => {
  if (isEmpty) {
    return <VolumeOffIcon style={{ color: 'gray' }} />;
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

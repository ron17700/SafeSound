import React from 'react';

import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { BoxWrapper, RecordsContainer } from '../shared/styles/wrappers';
import { RecordsImage } from '../shared/styles/images';
import { AddRecordButton } from '../shared/styles/buttons';
import RecordsList from './list/RecordsList';

const SafeSoundLogo = new URL(
  '../../assets/images/SafeSound.png',
  import.meta.url
).href;

const RecordsPage: React.FC = () => {
  const noRecords: JSX.Element = (
    <BoxWrapper>
      <RecordsImage src={SafeSoundLogo} alt="SafeSound Logo" />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        No Data Available
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Tap the plus button to start
      </Typography>
      <AddRecordButton
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => alert('Add Record Logic')}
      >
        Add Record
      </AddRecordButton>
    </BoxWrapper>
  );

  return (
    <RecordsContainer>
      <RecordsList />
    </RecordsContainer>
  );
};

export default RecordsPage;

import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import api from '../../api/apiService';
import RecordsList from './list/RecordsList';
import { AddRecordButton } from '../shared/styles/buttons';
import RecordDialog from './dialog/RecordDialog';
import { ListWrapper, PaddedBox } from '../shared/styles/wrappers';

const RecordsPage: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await api.get('/record');
        setRecords(response.data);
      } catch (error) {
        console.error('Failed to fetch records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleDialogOpen = () => setDialogOpen(true);

  const handleDialogClose = () => setDialogOpen(false);

  const handleEditRecord = (record: any) => {
    setIsEditing(true);
    setCurrentRecord(record);
    setDialogOpen(true);
  };

  const handleSaveRecord = async (recordData: any) => {
    if (isEditing && currentRecord) {
      await api.put(`/record/${currentRecord._id}`, recordData);
    } else {
      await api.post('/record', recordData);
    }

    const response = await api.get('/record');
    setRecords(response.data);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box width="100%" style={{ paddingTop: '12vh' }}>
      <PaddedBox>
        <Typography variant="h5" gutterBottom>
          My Records
        </Typography>
        <AddRecordButton
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleDialogOpen}
        >
          Add Record
        </AddRecordButton>
      </PaddedBox>
      <ListWrapper>
        {records.length === 0 ? (
          <Typography>No records available</Typography>
        ) : (
          <RecordsList
            records={records}
            setRecords={setRecords}
            handleEditRecord={handleEditRecord}
          />
        )}
      </ListWrapper>
      <RecordDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={handleSaveRecord}
        isEditing={isEditing}
        currentRecord={currentRecord}
      />
    </Box>
  );
};

export default RecordsPage;

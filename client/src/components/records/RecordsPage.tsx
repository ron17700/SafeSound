import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import api from '../../api/apiService';
import RecordsList, { Record } from './list/RecordsList';
import { AddRecordButton } from '../shared/styles/buttons';
import RecordDialog, { RecordData } from './dialog/RecordDialog';
import { ListWrapper, PaddedBox } from '../shared/styles/wrappers';
import { splitMp3IntoChunks } from '../../utils/audioUtils';
import { showSwal } from '../shared/Swal';

const RecordsPage: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Record | null>(null);

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

  const handleAddRecord = (): void => {
    setIsEditing(false);
    handleDialogOpen();
  };

  const handleEditRecord = (record: Record) => {
    setIsEditing(true);
    setCurrentRecord(record);
    setDialogOpen(true);
  };

  const handleSaveRecord = async (recordData: RecordData) => {
    const { name, isPublic, photo, audio } = recordData;
    const userId = localStorage.getItem('userId') || '';

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('userId', userId);
      formData.append('isPublic', JSON.stringify(isPublic));
      if (photo) {
        formData.append('file', photo);
      }

      let createdRecord;
      if (isEditing && currentRecord) {
        await api.put(`/record/${currentRecord._id}`, formData);
        createdRecord = currentRecord;
        showSwal('Record updated successfully!');
      } else {
        const recordResponse = await api.post('/record', formData);
        createdRecord = recordResponse.data;
      }

      if (audio) {
        try {
          const chunks = await splitMp3IntoChunks(audio, 10 * 60);

          let accumulatedTime = 0;

          for (const { file, duration } of chunks) {
            const chunkStartTime = accumulatedTime * 1000;
            const chunkEndTime = (accumulatedTime + duration) * 1000;

            const chunkFormData = new FormData();
            chunkFormData.append('file', file);
            chunkFormData.append(
              'startTime',
              new Date(chunkStartTime).toISOString()
            );
            chunkFormData.append(
              'endTime',
              new Date(chunkEndTime).toISOString()
            );

            await api.post(`/record/${createdRecord._id}/chunk`, chunkFormData);

            accumulatedTime += duration;
          }

          showSwal('Record added successfully!');
        } catch (error) {
          console.error('Error while splitting and uploading chunks:', error);
        }
      }

      const response = await api.get('/record');
      setRecords(response.data);
    } catch (error) {
      console.error('Error creating or updating record:', error);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        margin="auto"
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
          onClick={handleAddRecord}
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

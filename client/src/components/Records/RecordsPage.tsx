import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import api from '../../api/apiService';
import RecordsList from './list/RecordsList';
import { splitMp3IntoChunks } from '../../utils/audioUtils';
import { Checkbox, FormControlLabel } from '@mui/material';

const RecordsPage: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);

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
  const handleDialogClose = () => {
    setDialogOpen(false);
    setName('');
    setIsPublic(false);
    setPhoto(null);
    setAudio(null);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setPhoto(event.target.files[0]);
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setAudio(event.target.files[0]);
  };

  const handleAddRecord = async () => {
    if (!name) {
      alert('Name is required');
      return;
    }

    const userId = localStorage.getItem('userId') || '';

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('userId', userId);
      formData.append('isPublic', JSON.stringify(isPublic));
      if (photo) {
        formData.append('file', photo);
      }

      const recordResponse = await api.post('/record', formData);

      const createdRecord = recordResponse.data;

      if (audio) {
        try {
          // Split the audio into chunks
          const chunks = await splitMp3IntoChunks(audio, 10 * 60);

          // Iterate over each chunk and upload
          for (const [index, chunk] of chunks.entries()) {
            const chunkStartTime =
              new Date().getTime() + index * 10 * 60 * 1000;
            const chunkEndTime = chunkStartTime + 10 * 60 * 1000;

            const formData = new FormData();
            formData.append('file', chunk);
            formData.append(
              'startTime',
              new Date(chunkStartTime).toISOString()
            );
            formData.append('endTime', new Date(chunkEndTime).toISOString());

            const response = await api.post(
              `/chunk/${createdRecord._id}`,
              formData
            );

            if (response.status === 201) {
              console.log(`Chunk ${index + 1} uploaded successfully.`);
            } else {
              console.error(`Failed to upload chunk ${index + 1}.`);
            }
          }
        } catch (error) {
          console.error('Error while splitting and uploading chunks:', error);
        }
      }

      setRecords((prevRecords) => [...prevRecords, createdRecord]);
      handleDialogClose();
    } catch (error) {
      console.error('Error creating record or uploading chunks:', error);
    }
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
    <Box width="100%" padding="16px" style={{ paddingTop: '12vh' }}>
      <Typography variant="h5" gutterBottom>
        My Records
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleDialogOpen}
        style={{ marginBottom: '16px' }}
      >
        Add Record
      </Button>
      <Box style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
        {records.length === 0 ? (
          <Typography>No records available</Typography>
        ) : (
          <RecordsList records={records} setRecords={setRecords} />
        )}
      </Box>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Record</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <Box mt={2}>
            <Typography variant="subtitle1">Photo (optional)</Typography>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1">MP3 File (optional)</Typography>
            <input
              type="file"
              accept="audio/mp3"
              onChange={handleAudioUpload}
            />
          </Box>
          <Box mt={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPublic}
                  onChange={(e: any) => setIsPublic(e.target.checked)}
                />
              }
              label="Make Public"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddRecord}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RecordsPage;

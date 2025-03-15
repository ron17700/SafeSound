import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { showSwal } from '../../shared/Swal';
import {
  StyledActiveButton,
  StyledPassiveButton,
} from '../../shared/styles/buttons';
import { DialogWrapper } from '../../shared/styles/wrappers';

interface RecordDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (recordData: RecordData) => Promise<void>;
  isEditing: boolean;
  currentRecord: any;
}

interface RecordData {
  name: string;
  isPublic: boolean;
  photo: File | null;
  audio: File | null;
}

const RecordDialog: React.FC<RecordDialogProps> = ({
  open,
  onClose,
  onSave,
  isEditing,
  currentRecord,
}) => {
  const [name, setName] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);

  useEffect(() => {
    if (isEditing && currentRecord) {
      setName(currentRecord.name || '');
      setIsPublic(currentRecord.public || false);
      setPhoto(null);
    } else {
      setName('');
      setIsPublic(false);
      setPhoto(null);
      setAudio(null);
    }
  }, [isEditing, currentRecord]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setPhoto(event.target.files[0]);
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setAudio(event.target.files[0]);
  };

  const handleSave = async () => {
    if (!name) {
      showSwal('Name is required', 'error');
      return;
    }

    if(!isEditing && !audio) {
      showSwal('Audio mp3 file is required', 'error');
      return;
    }

    const recordData: RecordData = {
      name,
      isPublic,
      photo,
      audio,
    };

    try {
      await onSave(recordData);
      onClose();
    } catch (error) {
      console.error('Failed to save record:', error);
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogWrapper>
        <DialogTitle>
          {isEditing ? 'Update Record' : 'Add New Record'}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            sx={{ marginTop: 1, backgroundColor: 'white' }}
          />
          <Box mt={2}>
            <Typography variant="subtitle1">Photo (optional)</Typography>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          </Box>
          {!isEditing && (
            <Box mt={2}>
              <Typography variant="subtitle1">MP3 File</Typography>
              <input
                type="file"
                accept="audio/mp3"
                onChange={handleAudioUpload}
                required
              />
            </Box>
          )}
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
          <StyledPassiveButton onClick={onClose}>Cancel</StyledPassiveButton>
          //TODO: fix updating will be without audio
          <StyledActiveButton variant="contained" onClick={handleSave}>
            {isEditing ? 'Update' : 'Save'}
          </StyledActiveButton>
        </DialogActions>
      </DialogWrapper>
    </Dialog>
  );
};

export default RecordDialog;

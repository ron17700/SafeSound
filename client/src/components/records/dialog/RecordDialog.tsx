import React, { useState, useEffect } from 'react';
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import { showSwal } from '../../shared/Swal';
import {
  ConfirmButton,
  SmallActiveButton,
  StyledPassiveButton,
} from '../../shared/styles/buttons';
import { DialogWrapper } from '../../shared/styles/wrappers';
import { FileText, TransparentInputField } from '../../shared/styles/inputs';
import { Record } from '../list/RecordsList';
import { StyledDialog } from '../../shared/styles/Dialogs';

interface RecordDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (recordData: RecordData) => Promise<void>;
  isEditing: boolean;
  currentRecord: Record | null;
}

export interface RecordData {
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
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleClosingDialog = (): void => {
    setName('');
    setIsPublic(false);
    setPhoto(null);
    setAudio(null);
    onClose();
  };

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

    if (!isEditing && !audio) {
      showSwal('Audio mp3 file is required', 'error');
      return;
    }

    const recordData: RecordData = {
      name,
      isPublic,
      photo,
      audio,
    };

    setLoading(true);
    try {
      await onSave(recordData);
      handleClosingDialog();
    } catch (error) {
      console.error('Failed to save record:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <StyledDialog open={open} onClose={handleClosingDialog}>
      <DialogWrapper>
        <DialogTitle>
          {isEditing ? 'Update Record' : 'Add New Record'}
        </DialogTitle>
        <DialogContent>
          <TextField
            disabled={loading}
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            sx={{ marginTop: 1, backgroundColor: 'white' }}
          />
          <Box mt={2}>
            <Typography variant="subtitle1">Photo (optional)</Typography>
            <TransparentInputField
              type="file"
              accept="image/*"
              id="photo-upload"
              onChange={handlePhotoUpload}
              disabled={loading}
            />
            <label htmlFor="photo-upload">
              <SmallActiveButton
                disabled={loading}
                variant="contained"
                component="span"
              >
                Choose file
              </SmallActiveButton>
              <FileText variant="body2">
                {photo?.name || 'No photo chosen'}
              </FileText>
            </label>
          </Box>
          {!isEditing && (
            <Box mt={2}>
              <Typography variant="subtitle1">MP3 File</Typography>
              <TransparentInputField
                type="file"
                accept="audio/mp3"
                onChange={handleAudioUpload}
                id="audio-upload"
                required
                disabled={loading}
              />
              <label htmlFor="audio-upload">
                <SmallActiveButton
                  disabled={loading}
                  variant="contained"
                  component="span"
                >
                  Choose file
                </SmallActiveButton>
              </label>
              <FileText variant="body2">
                {audio?.name || 'No audio chosen'}
              </FileText>
            </Box>
          )}
          <Box mt={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPublic}
                  onChange={(e: any) => setIsPublic(e.target.checked)}
                  disabled={loading}
                />
              }
              label="Make Public"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <StyledPassiveButton disabled={loading} onClick={handleClosingDialog}>
            Cancel
          </StyledPassiveButton>
          <ConfirmButton
            disabled={loading}
            variant="contained"
            onClick={handleSave}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : isEditing ? (
              'Update'
            ) : (
              'Save'
            )}
          </ConfirmButton>
        </DialogActions>
      </DialogWrapper>
    </StyledDialog>
  );
};

export default RecordDialog;

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/apiService';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import image from '../../../assets/images/defaultRecord.png';

const defaultRecordImage = new URL(
  '../../../assets/images/defaultRecord.png',
  import.meta.url
).href;

interface Record {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  public?: boolean;
  image?: string | null;
  class?: string;
}

interface RecordsListProps {
  records: Record[];
  setRecords: (records: Record[]) => void;
}

const getClassIcon = (className: string | undefined) => {
  switch (className) {
    case 'Good':
      return <CheckCircleIcon style={{ color: 'green' }} />;
    case 'Bad':
      return <ErrorIcon style={{ color: 'red' }} />;
    case 'Natural':
      return <StarHalfIcon />;
    default:
      return null;
  }
};

const RecordsList: React.FC<RecordsListProps> = ({ records, setRecords }) => {
  const navigate = useNavigate();

  const handleDelete = async (e: any, recordId: string): Promise<void> => {
    try {
      e.stopPropagation();
      await api.delete(`/record/${recordId}`);
      setRecords(records.filter((record) => record._id !== recordId));
    } catch (error) {
      console.error(`Failed to delete record: ${recordId}`, error);
    }
  };

  return (
    <Box padding="16px">
      <Typography variant="h5" gutterBottom>
        My Records
      </Typography>
      <List>
        {records?.map((record: Record) => (
          <Card
            key={record._id}
            style={{
              marginBottom: '16px',
              cursor: 'pointer',
              backgroundColor: '#f5f5f5',
            }}
          >
            <CardContent>
              <ListItem>
                <ListItemAvatar>{getClassIcon(record.class)}</ListItemAvatar>
                <img
                  src={
                    record?.image &&
                    record.image !== 'default-files/default-record-image.png'
                      ? record.image
                      : defaultRecordImage
                  }
                  
                  draggable="false"
                  alt="Record Image"
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: '16px',
                  }}
                />

                <ListItemText
                  primary={record.name}
                  secondary={`Created: ${new Date(
                    record.createdAt
                  ).toLocaleDateString()}`}
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    // Navigate to edit page or handle editing
                    navigate(`/records/${record._id}/edit`);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={(e) => handleDelete(e, record._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
};

export default RecordsList;

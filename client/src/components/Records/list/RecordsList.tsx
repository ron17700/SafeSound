import React from 'react';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import api, { API_BASE_URL } from '../../../api/apiService';
import CustomIcon from '../../../assets/icons/natural';

interface Record {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  public?: boolean;
  image?: string | null;
  recordClass?: string;
  isFavorite?: boolean;
}

interface RecordsListProps {
  records: Record[];
  setRecords: (records: Record[]) => void;
  handleAddFavorite?: (e: any, recordId: string) => Promise<void>;
  handleEditRecord?: (record: Record) => void; // Add new prop
}

const getClassIcon = (className: string | undefined) => {
  switch (className) {
    case 'Good':
      return <CheckCircleIcon style={{ color: 'green' }} />;
    case 'Bad':
      return <ErrorIcon style={{ color: 'red' }} />;
    case 'Natural':
      return <CustomIcon />;
    default:
      return null;
  }
};

const RecordsList: React.FC<RecordsListProps> = ({
  records,
  setRecords,
  handleAddFavorite,
  handleEditRecord,
}) => {
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
              <ListItem onClick={() => navigate(`/records/${record._id}`)}>
                <ListItemAvatar>
                  {getClassIcon(record.recordClass)}
                </ListItemAvatar>
                <img
                  src={`${API_BASE_URL}/${(record.image || '').replace(
                    /\\/g,
                    '/'
                  )}`}
                  crossOrigin="anonymous"
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
                {!handleAddFavorite && (
                  <>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        if (handleEditRecord) handleEditRecord(record); // Call edit handler
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={(e) => handleDelete(e, record._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
                {handleAddFavorite && (
                  <IconButton onClick={(e) => handleAddFavorite(e, record._id)}>
                    {record.isFavorite ? (
                      <StarIcon style={{ color: '#FFD700' }} />
                    ) : (
                      <StarBorderIcon style={{ color: '#FFD700' }} />
                    )}
                  </IconButton>
                )}
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
};

export default RecordsList;
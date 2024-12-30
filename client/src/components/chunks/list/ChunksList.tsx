import React, { useEffect, useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import api from '../../../api/apiService';

interface Chunk {
  _id: string;
  startTime: string;
  endTime: string;
  audioFilePath: string;
  status: string;
}

const getClassIcon = (status: string) => {
  switch (status) {
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

const ChunksList: React.FC = () => {
  const { id: recordId } = useParams<{ id: string }>();
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChunks = async () => {
      try {
        const response: any = await api.get(`/chunk/${recordId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.status === 200) {
          setChunks(response.data);
        } else {
          console.error('Failed to fetch chunks');
        }
      } catch (error) {
        console.error('Error fetching chunks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChunks();
  }, [recordId]);

  return (
    <Box padding="16px">
      <Typography variant="h5" gutterBottom>
        Chunks for Record {recordId}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : chunks.length === 0 ? (
        <Typography>No chunks available</Typography>
      ) : (
        <List>
          {chunks.map((chunk) => (
            <Card
              key={chunk._id}
              style={{
                marginBottom: '8px',
                backgroundColor: '#f5f5f5',
              }}
            >
              <CardContent>
                <ListItem>
                  <ListItemAvatar>{getClassIcon(chunk.status)}</ListItemAvatar>
                  <ListItemText
                    primary={`Start: ${new Date(chunk.startTime).toLocaleString()} - End: ${new Date(chunk.endTime).toLocaleString()}`}
                    secondary={`Status: ${chunk.status}`}
                  />
                </ListItem>
              </CardContent>
            </Card>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ChunksList;

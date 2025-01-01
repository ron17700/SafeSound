import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  CircularProgress,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
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
  chunkClass: string;
  name: string;
  summary: string;
}

const getClassIcon = (chunkClass: string) => {
  switch (chunkClass) {
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
  const navigate = useNavigate();

  const { id: recordId } = useParams<{ id: string }>();
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [recordName, setRecordName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecordName = async () => {
      try {
        const response = await api.get(`/record/${recordId}`);

        if (response.status === 200) {
          setRecordName(response.data.name);
        } else {
          console.error('Failed to fetch record details');
        }
      } catch (error) {
        console.error('Error fetching record details:', error);
      }
    };

    if (recordId) fetchRecordName();
  }, [recordId]);

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

    if (recordId) fetchChunks();
  }, [recordId]);

  const handleChunkClick = (chunkId: string) => {
    navigate(`/records/${recordId}/chunks/${chunkId}`);
  };

  return (
    <Box marginLeft="2vw" marginTop="12vh">
      <Typography variant="h5" gutterBottom>
        Chunks for Record {recordName || recordId}
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
                width: '50vw',
              }}
              onClick={() => handleChunkClick(chunk._id)}
            >
              <CardContent>
                <ListItem>
                  <ListItemAvatar>
                    {getClassIcon(chunk.chunkClass)}
                  </ListItemAvatar>
                  <ListItemText
                    primary={chunk.name}
                    secondary={`${new Date(chunk.startTime).toLocaleTimeString(
                      'en-GB',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      }
                    )} - ${new Date(chunk.endTime).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}`}
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

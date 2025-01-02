import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/apiService';
import { StatusCodes } from 'http-status-codes';
import { getClassIcon } from '../../../logic/record';
import { ListWrapper, PageWrapper } from '../../shared/styles/wrappers';

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

        if (response.status === StatusCodes.OK) {
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
        const response: any = await api.get(`/record/${recordId}/chunk`);

        if (response.status === StatusCodes.OK) {
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
    <PageWrapper>
      <Typography variant="h5" gutterBottom>
        Chunks for Record: {recordName}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : chunks.length === 0 ? (
        <Typography>No chunks available</Typography>
      ) : (
        <ListWrapper
          style={{
            paddingLeft: 0,
            marginLeft: 0,
          }}
        >
          {chunks.map((chunk) => (
            <Card
              key={chunk._id}
              sx={{
                marginBottom: '8px',
                backgroundColor: '#f5f5f5',
                maxHeight: '80vh',
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
        </ListWrapper>
      )}
    </PageWrapper>
  );
};

export default ChunksList;

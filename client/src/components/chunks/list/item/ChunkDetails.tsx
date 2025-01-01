import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import api, { API_BASE_URL } from '../../../../api/apiService';

const ChunkDetails: React.FC = () => {
  const { recordId, chunkId } = useParams<{
    chunkId: string;
    recordId: string;
  }>();
  const [chunk, setChunk] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChunkDetails = async () => {
      try {
        const response = await api.get(`/record/${recordId}/chunk/${chunkId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.status === 200) {
          setChunk(response.data);
        } else {
          console.error('Failed to fetch chunk details');
        }
      } catch (error) {
        console.error('Error fetching chunk details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (chunkId && recordId) fetchChunkDetails();
  }, [chunkId, recordId]);

  return (
    <Box marginLeft="2vw" marginTop="12vh">
      {loading ? (
        <CircularProgress />
      ) : chunk ? (
        <Card style={{ padding: '20px' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {chunk.name}
            </Typography>
            <audio crossOrigin="anonymous" controls style={{ width: '100%' }}>
              <source
                src={`${API_BASE_URL}/${chunk.audioFilePath.replace(
                  /\\/g,
                  '/'
                )}`}
                type="audio/mp3"
              />
              Your browser does not support the audio element.
            </audio>
            <Typography variant="body1" marginTop="20px">
              <strong>Summary:</strong> {chunk.summary}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>No chunk data found</Typography>
      )}
    </Box>
  );
};

export default ChunkDetails;

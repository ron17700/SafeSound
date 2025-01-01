import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  CircularProgress,
  CardContent,
} from '@mui/material';
import api, { API_BASE_URL } from '../../../../api/apiService';
import { PageWrapper } from '../../../shared/styles/wrappers';
import { ChunkDetailsCard } from '../../../shared/styles/cards';
import { StyledAudio } from '../../../shared/styles/audio';
import { PaddedTitle } from '../../../shared/styles/inputs';

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
        const response = await api.get(`/record/${recordId}/chunk/${chunkId}`);

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
    <PageWrapper>
      {loading ? (
        <CircularProgress />
      ) : chunk ? (
        <ChunkDetailsCard>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {chunk.name}
            </Typography>
            <StyledAudio crossOrigin="anonymous" controls>
              <source
                src={`${API_BASE_URL}/${chunk.audioFilePath.replace(
                  /\\/g,
                  '/'
                )}`}
                type="audio/mp3"
              />
              Your browser does not support the audio element.
            </StyledAudio>
            <PaddedTitle variant="body1">
              <strong>Summary:</strong> {chunk.summary}
            </PaddedTitle>
          </CardContent>
        </ChunkDetailsCard>
      ) : (
        <Typography>No chunk data found</Typography>
      )}
    </PageWrapper>
  );
};

export default ChunkDetails;

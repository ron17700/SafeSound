import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/apiService';
import { StatusCodes } from 'http-status-codes';
import { getClassIcon } from '../../../logic/record';
import { ListWrapper, PageWrapper } from '../../shared/styles/wrappers';
import { UserProfile } from '../../user/UserProfilePage';

export interface Message {
  _id: string;
  sender: UserProfile;
  status: string;
  content: string;
  createdAt: Date;
}

export interface Chunk {
  _id: string;
  startTime: string;
  endTime: string;
  audioFilePath: string;
  status: string;
  chunkClass: string;
  name: string;
  numberOfComments: number;
  recordId: string;
  summary: string;
  messages: Message[];
}

const ChunksList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { recordName = '', isPublic = '' } = location.state;

  const { id: recordId } = useParams<{ id: string }>();
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const handleChunkClick = (chunk: Chunk) => {
    navigate(`/records/${recordId}/chunks/${chunk._id}`, {
      state: { chunkName: chunk.name, isPublic: isPublic },
    });
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
              onClick={() => handleChunkClick(chunk)}
            >
              <CardContent>
                <ListItem>
                  <ListItemAvatar>
                    {getClassIcon(chunk.chunkClass)}
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Chunk ${chunk.name} (${chunk.numberOfComments})`}
                    secondary={
                      <>
                        <div>{`${new Date(chunk.startTime).toLocaleTimeString(
                          'en-GB',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          }
                        )} - ${new Date(chunk.endTime).toLocaleTimeString(
                          'en-GB',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          }
                        )}`}</div>
                        <div>{`Comments: ${chunk.numberOfComments}`}</div>
                      </>
                    }
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

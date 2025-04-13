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
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

  const groupChunks = (chunks: Chunk[]) => {
    const grouped: Array<
      Chunk | { startTime: string; endTime: string; empty: true }
    > = [];

    let tempEmptyGroup: Chunk[] = [];

    for (const chunk of chunks) {
      const isEmpty = chunk.summary === 'No meaningful audio detected';
      if (isEmpty) {
        tempEmptyGroup.push(chunk);
      } else {
        if (tempEmptyGroup.length > 1) {
          grouped.push({
            startTime: tempEmptyGroup[0].startTime,
            endTime: tempEmptyGroup[tempEmptyGroup.length - 1].endTime,
            empty: true,
          });
        } else if (tempEmptyGroup.length === 1) {
          grouped.push(tempEmptyGroup[0]);
        }
        tempEmptyGroup = [];
        grouped.push(chunk);
      }
    }

    if (tempEmptyGroup.length > 1) {
      grouped.push({
        startTime: tempEmptyGroup[0].startTime,
        endTime: tempEmptyGroup[tempEmptyGroup.length - 1].endTime,
        empty: true,
      });
    } else if (tempEmptyGroup.length === 1) {
      grouped.push(tempEmptyGroup[0]);
    }

    return grouped;
  };

  return (
    <PageWrapper>
      <IconButton onClick={() => navigate(-1)} aria-label="Go back">
        <ArrowBackIcon />
      </IconButton>
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
          {groupChunks(chunks).map((chunkOrGroup, index) => {
            const isGroup = 'empty' in chunkOrGroup;

            if (isGroup) {
              return (
                <Card
                  key={`empty-${index}`}
                  sx={{
                    marginBottom: '8px',
                    backgroundColor: '#dddddd',
                    opacity: 0.8,
                    pointerEvents: 'none',
                  }}
                >
                  <CardContent>
                    <ListItem>
                      <ListItemAvatar>
                        {getClassIcon(undefined, true)}
                      </ListItemAvatar>
                      <ListItemText
                        primary={`No meaningful audio detected`}
                        secondary={`${new Date(
                          chunkOrGroup.startTime
                        ).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          timeZone: 'UTC',
                        })} - ${new Date(
                          chunkOrGroup.endTime
                        ).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          timeZone: 'UTC',
                        })}`}
                      />
                    </ListItem>
                  </CardContent>
                </Card>
              );
            }

            return (
              <Card
                key={chunkOrGroup._id}
                sx={{
                  marginBottom: '8px',
                  backgroundColor: '#f5f5f5',
                  maxHeight: '80vh',
                  cursor:
                    chunkOrGroup.summary === 'No meaningful audio detected'
                      ? 'default'
                      : 'pointer',
                }}
                onClick={() =>
                  chunkOrGroup.summary !== 'No meaningful audio detected' &&
                  handleChunkClick(chunkOrGroup)
                }
              >
                <CardContent>
                  <ListItem>
                    <ListItemAvatar>
                      {getClassIcon(
                        chunkOrGroup.chunkClass,
                        chunkOrGroup.summary === 'No meaningful audio detected'
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Chunk ${chunkOrGroup.name} (${chunkOrGroup.numberOfComments})`}
                      secondary={
                        <>
                          <div>
                            {`${new Date(
                              chunkOrGroup.startTime
                            ).toLocaleTimeString('en-GB', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                              timeZone: 'UTC',
                            })} - ${new Date(
                              chunkOrGroup.endTime
                            ).toLocaleTimeString('en-GB', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                              timeZone: 'UTC',
                            })}`}
                          </div>
                          <div>{`Comments: ${chunkOrGroup.numberOfComments}`}</div>
                        </>
                      }
                    />
                  </ListItem>
                </CardContent>
              </Card>
            );
          })}
        </ListWrapper>
      )}
    </PageWrapper>
  );
};

export default ChunksList;

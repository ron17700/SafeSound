import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  CircularProgress,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { API_BASE_URL } from '../../../../api/apiService';
import { PageWrapper, SummaryWrapper } from '../../../shared/styles/wrappers';
import {
  ChunkContent,
  ChunkDetailsCard,
  CommentsCard,
  CommentsContent,
} from '../../../shared/styles/cards';
import { StyledAudio } from '../../../shared/styles/audio';
import api from '../../../../api/apiService';
import { StatusCodes } from 'http-status-codes';
import { Chunk } from '../ChunksList';
import { AddRecordButton } from '../../../shared/styles/buttons';

const ChunkDetails: React.FC = () => {
  const { recordId, chunkId } = useParams<{
    recordId: string;
    chunkId: string;
  }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { chunkName = '', isPublic = false } = location.state;
  const [chunk, setChunk] = useState<Chunk | null>(null);
  const [newComment, setNewComment] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChunks = async () => {
      try {
        const response: any = await api.get(
          `/record/${recordId}/chunk/${chunkId}`
        );

        if (response.status === StatusCodes.OK) {
          setChunk(response.data);
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
  }, [recordId, chunkId]);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleSendComment = async () => {
    if (!newComment.trim()) return;

    setSending(true);
    try {
      const response = await api.post(
        `/record/${chunk?.recordId}/chunk/${chunk?._id}/comment`,
        {
          userId: localStorage.getItem('userId'),
          comment: newComment.trim(),
        }
      );

      if (response.status === StatusCodes.OK) {
        setChunk(response.data);
        setNewComment('');
      } else {
        console.error('Failed to send comment');
      }
    } catch (error) {
      console.error('Error sending comment:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <PageWrapper>
      <IconButton onClick={() => navigate(-1)} aria-label="Go back">
        <ArrowBackIcon />
      </IconButton>
      {loading ? (
        <CircularProgress />
      ) : chunk ? (
        <>
          <ChunkDetailsCard>
            <ChunkContent>
              <Typography variant="h4" gutterBottom>
                Chunk {chunkName} ({chunk.numberOfComments})
              </Typography>
              <StyledAudio crossOrigin="anonymous" controls>
                <source
                  src={`${API_BASE_URL}/${chunk.audioFilePath?.replace(
                    /\\/g,
                    '/'
                  )}`}
                  type="audio/mp3"
                />
                Your browser does not support the audio element.
              </StyledAudio>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  marginTop: 2,
                  marginBottom: 1,
                }}
              >
                Summary:
              </Typography>
              <SummaryWrapper>
                <Typography variant="body2">{chunk.summary}</Typography>
              </SummaryWrapper>
            </ChunkContent>
          </ChunkDetailsCard>

          {isPublic && (
            <CommentsCard>
              <CommentsContent>
                <Typography variant="h5" gutterBottom>
                  Comments
                </Typography>
                <List
                  sx={{
                    height: '15vh',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#888',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: '#555',
                    },
                  }}
                >
                  {chunk.messages.length === 0 ? (
                    <Typography>No comments yet.</Typography>
                  ) : (
                    chunk.messages.map((message) => (
                      <ListItem key={message._id}>
                        <ListItemText
                          primary={message.content}
                          secondary={`By ${
                            message.sender?.userName
                          } on ${new Date(
                            message.createdAt
                          ).toLocaleDateString()} at ${new Date(
                            message.createdAt
                          ).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}`}
                        />
                      </ListItem>
                    ))
                  )}
                </List>
                <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                  Add a new comment
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={handleCommentChange}
                  disabled={sending}
                  multiline
                  rows={2}
                  sx={{ marginBottom: 1 }}
                />
                <AddRecordButton
                  variant="contained"
                  color="primary"
                  onClick={handleSendComment}
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send'}
                </AddRecordButton>
              </CommentsContent>
            </CommentsCard>
          )}
        </>
      ) : (
        <Typography>No chunk data found</Typography>
      )}
    </PageWrapper>
  );
};

export default ChunkDetails;

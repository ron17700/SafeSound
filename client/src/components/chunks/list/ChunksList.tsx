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

interface Chunk {
  id: string;
  startTime: string;
  endTime: string;
  audio: string;
}

const ChunksList: React.FC = () => {
  const { recordId } = useParams<{ recordId: string }>();
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChunks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/chunk/${recordId}`,
          {
            headers: {
              Authorization: `Bearer <YOUR_ACCESS_TOKEN>`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setChunks(data);
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
              key={chunk.id}
              style={{
                marginBottom: '8px',
                backgroundColor: '#f5f5f5',
              }}
            >
              <CardContent>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      {/* Add audio icon or other visualization */}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Start: ${chunk.startTime} - End: ${chunk.endTime}`}
                    secondary="Tap to play the audio"
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

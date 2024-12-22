import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';

const ChunksPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [chunks, setChunks] = useState<any[]>([]); // Replace `any` with your chunk type.
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate fetching chunks for a record
  useEffect(() => {
    const fetchChunks = async () => {
      try {
        // Replace with your API call logic
        const fetchedChunks = [
          {
            id: 1,
            name: 'Chunk #1',
            time: '12:05 - 12:10',
            icon: <InfoIcon />,
          },
          {
            id: 2,
            name: 'Chunk #2',
            time: '12:10 - 12:15',
            icon: <InfoIcon />,
          },
          {
            id: 3,
            name: 'Chunk #3',
            time: '12:15 - 12:20',
            icon: <InfoIcon />,
          },
        ];
        setChunks(fetchedChunks);
      } catch (error) {
        console.error('Failed to fetch chunks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChunks();
  }, [id]);

  if (loading) {
    return <Typography>Loading chunks...</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Back Button */}
      <IconButton onClick={() => window.history.back()}>
        <ArrowBackIcon />
      </IconButton>

      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Chunks for Record #{id}
      </Typography>

      {/* Chunks List */}
      <List>
        {chunks.map((chunk) => (
          <ListItem
            key={chunk.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '10px',
              padding: '10px',
            }}
          >
            {/* Icon */}
            <ListItemIcon>{chunk.icon}</ListItemIcon>

            {/* Chunk Details */}
            <ListItemText
              primary={chunk.name}
              secondary={chunk.time}
              style={{ marginRight: 'auto' }}
            />

            {/* Action Buttons */}
            <IconButton edge="end" aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="share">
              <ShareIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ChunksPage;

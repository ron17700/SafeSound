import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const chunks = [
  { id: 1, name: 'Chunk #1', time: '12:05 - 12:10' },
  { id: 2, name: 'Chunk #2', time: '12:10 - 12:15' },
  { id: 3, name: 'Chunk #3', time: '12:15 - 12:20' },
];

const ChunksList = () => {
  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Record Details
      </Typography>
      <List>
        {chunks.map((chunk) => (
          <Card key={chunk.id} style={{ marginBottom: '8px' }}>
            <CardContent>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary={chunk.name} secondary={chunk.time} />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </div>
  );
};

export default ChunksList;

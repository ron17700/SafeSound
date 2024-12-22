import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom';

const records = [
  { id: 1, title: 'My first Record', date: '08/11/2024', icon: <FolderIcon /> },
  { id: 2, title: 'Record #2', date: '08/11/2024', icon: <FolderIcon /> },
  { id: 3, title: 'Record #3', date: '08/11/2024', icon: <FolderIcon /> },
];

const RecordsList = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h5" gutterBottom>
        My Records
      </Typography>
      <List>
        {records.map((record) => (
          <Card
            key={record.id}
            style={{ marginBottom: '8px' }}
            onClick={() => navigate(`/records/${record.id}`)}
          >
            <CardContent>
              <ListItem>
                <ListItemIcon>{record.icon}</ListItemIcon>
                <ListItemText primary={record.title} secondary={record.date} />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </div>
  );
};

export default RecordsList;

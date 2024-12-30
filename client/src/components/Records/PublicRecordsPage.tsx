import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import api from '../../api/apiService';
import RecordsList from './list/RecordsList';

const PublicRecordsPage: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await api.get('/record');

        console.log('response.data:', response.data);
        setRecords(response.data.filter((record: any) => record.public));
      } catch (error) {
        console.error('Failed to fetch records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  return (
    <Box
      width="100%"
      margin="auto"
      padding="16px"
      style={{ paddingTop: '50px' }}
    >
      <Typography variant="h5" gutterBottom>
        Public Records
      </Typography>

      <Box style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
        {records.length === 0 ? (
          <Typography>No records available</Typography>
        ) : (
          <RecordsList records={records} setRecords={setRecords} />
        )}
      </Box>
    </Box>
  );
};

export default PublicRecordsPage;

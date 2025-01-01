import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import api from '../../api/apiService';
import RecordsList from './list/RecordsList';
import { parseAccessTokenToPayload } from '../../logic/user';

const PublicRecordsPage: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecords = async () => {
    try {
      const response = await api.get('/record/public');
      setRecords(response.data);
    } catch (error) {
      console.error('Failed to fetch records:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleAddFavorite = async (e: any, recordId: string): Promise<void> => {
    try {
      e.stopPropagation();
      await api.post(`/record/${recordId}/like`, {
        userId: parseAccessTokenToPayload(
          localStorage.getItem('accessToken') || ''
        ).userId,
        id: recordId,
      });
      await fetchRecords();
    } catch (error) {
      console.error(`Failed to add record to favorite: ${recordId}`, error);
    }
  };

  return (
    <Box width="100%" padding="16px" style={{ paddingTop: '12vh' }}>
      <Typography variant="h5" gutterBottom>
        Public Records
      </Typography>

      <Box style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
        {records.length === 0 ? (
          <Typography>No records available</Typography>
        ) : (
          <RecordsList
            records={records}
            setRecords={setRecords}
            handleAddFavorite={handleAddFavorite}
          />
        )}
      </Box>
    </Box>
  );
};

export default PublicRecordsPage;

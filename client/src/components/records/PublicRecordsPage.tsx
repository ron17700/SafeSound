import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import api from '../../api/apiService';
import RecordsList, { Record } from './list/RecordsList';
import { parseAccessTokenToPayload } from '../../logic/user';
import { ListWrapper, PaddedBox } from '../shared/styles/wrappers';

const PublicRecordsPage: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
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
      <PaddedBox>
        <Typography variant="h5" gutterBottom>
          Public Records
        </Typography>
      </PaddedBox>
      <ListWrapper sx={{ maxHeight: 'calc(100vh - 215px)' }}>
        {records.length === 0 ? (
          <Typography>No records available</Typography>
        ) : (
          <RecordsList
            records={records}
            setRecords={setRecords}
            handleAddFavorite={handleAddFavorite}
          />
        )}
      </ListWrapper>
    </Box>
  );
};

export default PublicRecordsPage;

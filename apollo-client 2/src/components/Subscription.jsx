import React from 'react';
import { gql, useSubscription } from '@apollo/client';
import { OPERATION_SCHEDULED_SUB } from '../graphql/requestreponse'; // Adjust the import path as necessary


function OperationStatus() {
  const { data, loading, error } = useSubscription(OPERATION_SCHEDULED_SUB);

  if (loading) return <p>⏳ Waiting for updates...</p>;
  if (error) return <p>⚠️ Error: {error.message}</p>;

  return <p>📢 Latest: {data.operationScheduled}</p>;
}

export default OperationStatus;

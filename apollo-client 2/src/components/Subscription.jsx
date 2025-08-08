import React from 'react';
import { gql, useSubscription } from '@apollo/client';

const OPERATION_SCHEDULED_SUB = gql`
  subscription {
    operationScheduled
  }
`;

function OperationStatus() {
  const { data, loading, error } = useSubscription(OPERATION_SCHEDULED_SUB);

  if (loading) return <p>⏳ Waiting for updates...</p>;
  if (error) return <p>⚠️ Error: {error.message}</p>;

  return <p>📢 Latest: {data.operationScheduled}</p>;
}

export default OperationStatus;

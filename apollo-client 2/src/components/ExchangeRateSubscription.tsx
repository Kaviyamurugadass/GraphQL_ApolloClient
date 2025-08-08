// ExchangeRateSubscription.js
import { gql, useSubscription } from '@apollo/client';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

const EXCHANGE_RATE_SUB = gql`
  subscription {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export default function ExchangeRateSubscription() {
  const { data, loading } = useSubscription(EXCHANGE_RATE_SUB);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {data.rates.map((r: { currency: string; rate: string }) => (
        <li key={r.currency}>
          {r.currency}: {r.rate}
        </li>
      ))}
    </ul>
  );
}

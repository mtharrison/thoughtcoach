import { Table } from 'sst/node/table';
import { ApiHandler } from 'sst/node/api';
import { useSession } from 'sst/node/auth';

export const handler = ApiHandler(async () => {
  const session = useSession();

  console.log(session);

  // Check user is authenticated
  if (session.type !== 'user') {
    throw new Error('Not authenticated');
  }

  return {
    statusCode: 200,
  };
});

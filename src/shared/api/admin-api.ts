import axios from 'axios';

export async function readApplyForms(accessToken: string) {
  const res = await axios.get(`api/apply-forms/read`, {
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: (status) => {
      return status < 500;
    },
  });

  if (!res.data.success) {
    throw new Error(res.data.message);
  }
  return res.data;
}

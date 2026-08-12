import { getAccessToken } from './auth';

const FILE_NAME = 'hsc_gpa_data.json';

export async function saveToDrive(data: any): Promise<void> {
  const accessToken = await getAccessToken();
  if (!accessToken) throw new Error('No access token');

  // Find if file already exists in appDataFolder
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=name='${FILE_NAME}' and 'appDataFolder' in parents&spaces=appDataFolder`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const searchData = await searchRes.json();
  const file = searchData.files && searchData.files.length > 0 ? searchData.files[0] : null;

  const fileContent = JSON.stringify(data);
  const metadata = {
    name: FILE_NAME,
    parents: ['appDataFolder']
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', new Blob([fileContent], { type: 'application/json' }));

  if (file) {
    // Update existing file
    await fetch(`https://www.googleapis.com/upload/drive/v3/files/${file.id}?uploadType=multipart`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: form
    });
  } else {
    // Create new file
    await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: form
    });
  }
}

export async function loadFromDrive(): Promise<any | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) throw new Error('No access token');

  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=name='${FILE_NAME}' and 'appDataFolder' in parents&spaces=appDataFolder`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const searchData = await searchRes.json();
  const file = searchData.files && searchData.files.length > 0 ? searchData.files[0] : null;

  if (!file) return null;

  const getRes = await fetch(`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!getRes.ok) throw new Error('Failed to download file');

  return await getRes.json();
}

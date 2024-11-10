import path from 'path';
import { readFile } from 'fs/promises';

export default async function readJsonFile(filePath: string, fileName: string) {
  const file = path.join(process.cwd(), filePath, fileName);
  try {
    const jsonData = await readFile(file);
    return JSON.parse(jsonData.toString()) as unknown;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error reading JSON file:', error);
    return [];
  }
}

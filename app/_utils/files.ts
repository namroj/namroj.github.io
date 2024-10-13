import path from 'path';
import { readFile } from 'fs/promises';

export default async function readJsonFile(filePath: string, fileName: string) {
  const file = path.join(process.cwd(), filePath, fileName);
  const jsonData = await readFile(file);

  return JSON.parse(jsonData.toString());
}

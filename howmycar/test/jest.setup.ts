import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeAll(async () => {
  await rm(join(__dirname, '..', 'test.sqlite'), { force: true });
});

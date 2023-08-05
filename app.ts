import express from 'express';
import bodyParser from 'body-parser';
import { router } from './src/routes/notes';
const app = express();

app.use(bodyParser.json());

app.use('/notes', router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

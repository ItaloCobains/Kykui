import './lib/db';
import { app, port } from './middlewares/express.middleware';

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

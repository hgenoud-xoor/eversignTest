import express, { json, Router } from 'express';
import { eversignWebhookHandler } from './controllers/webhook';
import { eversignDocumentHandler } from './controllers/document';
import { eversignTemplateHandler } from './controllers/template';

const port = 5000;
const app = express();
app.use(json());
const router = Router();
router.post('/eversign/webhook', eversignWebhookHandler);

router.get('/eversign/template', eversignTemplateHandler);

router.get('/eversign/document', eversignDocumentHandler);

app.use(router);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  return console.log(`Server running on port ${port}`);
});

import { RequestHandler } from 'express';
import { Client, Document as EversignDocument } from 'eversign';
import { createDocument } from '../utils/document';
import { config } from '~/config';

const eversign = new Client(config.eversignApiKey, config.eversignBusinessId );

export const eversignDocumentHandler: RequestHandler = async (req, res) => {
  try {
    const documentObject = new EversignDocument({
      title: 'testing',
      message: 'A ver qué pasa',
    });
    const document = createDocument(documentObject);
    const response = await eversign.createDocument(document);
    // eslint-disable-next-line no-console
    console.log(response.toObject());
    res.sendStatus(200);
  } catch (e) {
  // eslint-disable-next-line no-console
    console.log('ERROR: ', e);
    res.send(500);
  }
};

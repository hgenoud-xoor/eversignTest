import { RequestHandler } from 'express';
import crypto from 'crypto';
import { EventCallbackBody } from '../interfaces/eventCallbackBody';
import { EversignEvent } from '../interfaces/event.enum';
import { config } from '~/config';

export const eversignWebhookHandler: RequestHandler = async (req, res) => {
  const body = req.body as EventCallbackBody;
  const {
    event_hash: hash,
    event_time: time,
    event_type: type,
    // meta,
    // signer,
  } = body;
  const hmac = crypto.createHmac('sha256', config.eversignApiKey);
  const signed = hmac.update(Buffer.from(`${time}${type}`, 'utf-8')).digest('hex');
  if (signed !== hash) {
    res.status(400);
    const error = {
      status: 404,
      message: 'INVALID_EVENT_HASH',
    };
    res.send(error);
    throw new Error;
  }

  // const { related_document_hash, related_user_id } = meta;
  // const { email, name, role, order, id } = signer;

  // eslint-disable-next-line no-console
  console.log(`Eversign event: ${type}`);
  switch (type) {
    case EversignEvent.DOCUMENT_COMPLETED:
      // Handle DOCUMENT_COMPLETED
      break;
    case EversignEvent.DOCUMENT_DECLINED:
      // Handle DOCUMENT_DECLINED
      break;
    case EversignEvent.DOCUMENT_EXPIRED:
      // Handle DOCUMENT_EXPIRED
      break;
    case EversignEvent.DOCUMENT_SENT:
      // Handle DOCUMENT_SENT
      break;
    case EversignEvent.DOCUMENT_SIGNED:
      // Handle DOCUMENT_SIGNED
      break;
    case EversignEvent.DOCUMENT_VIEWED:
      // Handle DOCUMENT_VIEWED
      break;
    default:
      break;
  }

  res.sendStatus(200);
};

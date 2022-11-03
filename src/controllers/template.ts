import { RequestHandler } from 'express';
import { Client } from 'eversign';

import { createTemplate } from '../utils/template';
import { config } from '~/config';

const eversign = new Client(config.eversignApiKey, config.eversignBusinessId );

export const eversignTemplateHandler: RequestHandler = async (req, res) => {
  const templateList = await eversign.getTemplates();
  if (templateList && templateList.length > 0) {
    const template = await createTemplate(
      templateList[0].getTemplateId(),
      {
        email: 'hernan.genoud@xoor.io',
        name: 'Hernán',
        role: 'signer',
        id: 1,
      }, {} );

    const document = await eversign.createDocumentFromTemplate(template);
    // eslint-disable-next-line no-console
    console.log(document.toObject());
    res.send(200);
    return;
  }
  res.send(300);
};

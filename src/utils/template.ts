import { Field, Signer, Template } from 'eversign';

interface SignerInfo {
  role: string;
  name: string;
  email: string;
  id: number;
}

interface CustomTemplateInfo {
  sandbox?: boolean;
  message?: string;
  requesterName?: string;
  redirect?: string;
  redirectDecline?: string;
}

const replaceFields = (params: CommonJSON, template: Template) => {
  const arrayKeys = Object.keys(params);
  arrayKeys.map(key => {
    const field = new Field();
    field.setIdentifier(key);
    field.setValue(params[key]);
    template.appendField(field);
  });
  return template;
};

export const createSigner = (signerData: SignerInfo) => {
  const signer = new Signer(signerData);
  return signer;
};

export const createTemplate = async (
  templateId: string,
  signerData: SignerInfo,
  fields: CommonJSON,
  customInfo?: CustomTemplateInfo,
) => {
  const templateObject = new Template(templateId);
  const signer = createSigner(signerData);
  templateObject.appendSigner(signer);
  const template = replaceFields(fields, templateObject );
  template.setSandbox(true);
  if (customInfo) {
    const { sandbox, message, redirect, redirectDecline, requesterName } = customInfo;
    template.setSandbox(sandbox || false);
    if (message) {
      template.setMessage(message);
    }
    if (requesterName) {
      template.setCustomRequesterName(requesterName);
    }
    if (redirect) {
      template.setRedirect(redirect);
    }
    if (redirectDecline) {
      template.setRedirectDecline(redirectDecline);
    }
  }
  return template;
};

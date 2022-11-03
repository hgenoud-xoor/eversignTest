import { Document as EversignDocument, SignatureField, Signer, File as EversignFile } from 'eversign';

export const createDocument = (document: EversignDocument) => {
  document.setSandbox(true);
  document.setRequesterEmail('xoor@xoor.io');
  document.setIsDraft(false);
  document.setRedirect('https://eversign.com/?success');
  document.setRedirectDecline('https://eversign.com/?declined');
  document.setCustomRequesterName('Xoor Requester');

  const signer = new Signer({
    name: 'Signer',
    email: 'hernan.genoud@xoor.io',
    role: 'signer',
    id: 2,
  });
  document.appendSigner(signer);

  const cc = new Signer({
    name: 'CC',
    email: 'genucomu@gmail.com',
    role: 'cc',
    id: 1,
  });
  document.appendSigner(cc);

  const file = new EversignFile({
    name: 'My File',
    filePath: __dirname + '/recibo.pdf',
  });
  document.appendFile(file);

  const signatureField = new SignatureField({
    page: 1,
    required: true,
    x: 30,
    y: 150,
    signer: 1,
    fileIndex: 0,
  });
  document.appendFormField(signatureField);

  return document;
};

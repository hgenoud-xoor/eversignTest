export interface EventCallbackBody {
  'event_time': number,
  'event_type': string,
  'event_hash': string,
  'meta': {
    'related_document_hash': string,
    'related_user_id': string,
    'related_business_id': string,
    'related_app_id'?: string
  },
  'signer'?: {
    'id': string,
    'name': string,
    'email': string,
    'role': string,
    'order': string
  }
}

import { type SchemaTypeDefinition } from 'sanity';
import project from './project'; 
import mail from './mail'; 

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, mail],
};

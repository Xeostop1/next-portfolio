import { Rule } from 'sanity'; // Rule 타입 임포트

export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    {
      name: 'id',
      type: 'number',
      title: 'ID',
      validation: (Rule: Rule) => Rule.required(), // Rule 타입 지정
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: Rule) => Rule.required(), // Rule 타입 지정
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'skills',
      type: 'array',
      title: 'Skills',
      of: [{ type: 'string' }],
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: () => new Date().toISOString(),
    },
  ],
};

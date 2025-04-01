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
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'path',
      type: 'string',
      title: 'Path (이미지 경로나 URL)',
      description: '예: my-first-project → public/images/my-first-project.jpg 또는 /projects/my-first-project',
      validation: (Rule: Rule) =>
        Rule.required().regex(/^[a-z0-9\-]+$/, '소문자, 숫자, 하이픈(-)만 사용할 수 있어요.'),
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

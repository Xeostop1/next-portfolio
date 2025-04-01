// 📂 sanity/schemaTypes/mail.ts
export default {
    name: 'mail',
    type: 'document',
    title: 'Mail Log',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: '이름',
      },
      {
        name: 'email',
        type: 'string',
        title: '이메일',
      },
      {
        name: 'message',
        type: 'text',
        title: '내용',
      },
      {
        name: 'createdAt',
        type: 'datetime',
        title: '보낸 날짜',
        initialValue: () => new Date().toISOString(),
      },
    ],
  };
  
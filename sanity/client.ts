// import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId } from './env'

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
// })




// sanity/client.ts
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'tcztnyfh',          // Sanity에서 발급받은 값
  dataset: 'production',                 // 일반적으로 production
  apiVersion: '2025-02-06',              // 사용하는 버전에 맞게
  useCdn: false,                         // 쓰기 작업을 위해 반드시 false
  token: process.env.SANITY_API_WRITE_TOKEN, // 쓰기용 토큰
})

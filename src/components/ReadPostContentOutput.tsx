'use client'

import CustomCodeRenderer from '@/components/renderers/CustomCodeRenderer'
import CustomImageRenderer from '@/components/renderers/CustomImageRenderer'
import { FC } from 'react'
import dynamic from 'next/dynamic'
// import { Poppins} from 'next/font/google'; 
// const poppins = Poppins({
//   variable: '--font-poppins',
//   weight: '100'
// });
const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
)

interface EditorOutputProps {
  content: any
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,

}

const style = {
  paragraph: {
    fontSize: '1.2rem',
    lineHeight: '1.8rem',
    fontFamily: 'poopins',
    paddingBottom: '8px',


  },


}

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    // @ts-expect-error
    <Output
      style={style}
      className={` `}

      renderers={renderers}
      data={content}
    />
  )
}

export default EditorOutput

import dynamic from 'next/dynamic'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'

import styles from '../../styles/notion-block.module.css'

const Mermaid = dynamic(() => import('./mermaid'))

const Code = ({ block }) => {
  const code = block.Code.Text.map(richText => richText.Text.Content).join('')
  var language = block.Code.Language || 'javascript'

  if (language == 'Shell') {
    language = 'bash'
  } else if (language == 'Plane Text') {
    language = 'text'
  }

  ;(async () => {
    try {
      await import('prismjs/components/prism-' + language)
    } catch (error) {
      console.log(error)
    }
  })()

  return (
    <div className={styles.code}>
      {language === 'mermaid' ? (
        <Mermaid id={`mermaid-${block.Id}`} definition={code} />
      ) : (
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                code,
                Prism.languages[language.toLowerCase()] ||
                  Prism.languages.javascript
              ),
            }}
          />
        </pre>
      )}
      {block.Code.Caption.length > 0 && block.Code.Caption[0].Text.Content ? (
        <div className={styles.caption}>
          {block.Code.Caption[0].Text.Content}
        </div>
      ) : null}
    </div>
  )
}

export default Code

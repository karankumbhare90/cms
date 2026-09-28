import { DynamicRichText } from './DynamicRichText'
import parse from 'html-react-parser'

export const IntroText = ({ introText }: any) => {
  const HeadingTag = (introText?.headingSize || 'h2') as React.ElementType

  return (
    <>
      <div className="intro-text">
        {introText?.subHeading && (
          <p className="subheading text-blue-600 font-bold text-xs md:text-sm uppercase tracking-wider mb-2">
            {introText.subHeading}
          </p>
        )}

        {introText?.heading && <HeadingTag>{parse(introText.heading)}</HeadingTag>}
      </div>

      {introText?.description && (
        <div className="description-wrap">
          <p>{introText.description}</p>
        </div>
      )}

      {introText?.content && (
        <DynamicRichText content={introText.content} className="rich-text-content" />
      )}
    </>
  )
}

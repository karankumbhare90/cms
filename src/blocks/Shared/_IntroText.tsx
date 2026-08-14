import { RichText } from '@payloadcms/richtext-lexical/react'

export const IntroText = ({ introText }: any) => {
  const HeadingTag = (introText?.headingSize || 'h2') as React.ElementType

  return (
    <>
      <div className="intro-text">
        {introText?.heading && <HeadingTag>{introText.heading}</HeadingTag>}

        {introText?.subHeading && <h6 className="subheading">{introText.subHeading}</h6>}
      </div>

      {introText?.description && (
        <div className="description-wrap">
          <p>{introText.description}</p>
        </div>
      )}

      {introText?.content && <RichText className="rich-text-content" data={introText.content} />}
    </>
  )
}

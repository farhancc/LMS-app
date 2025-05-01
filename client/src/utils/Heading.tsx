interface HeadingProps {
  title: string;
  description: string;
  keywords: string[];
}

const Heading = ({ title, description, keywords }: HeadingProps) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="LMS Team" />
    </>
  );
};
export default Heading;

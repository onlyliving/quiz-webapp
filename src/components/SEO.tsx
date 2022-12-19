import { Helmet } from "react-helmet-async";

interface Props {
    title: string,
    description: string
};

const SEO = ({ title, description }: Props) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    )
}

export default SEO;
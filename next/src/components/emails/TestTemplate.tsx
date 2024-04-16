interface EmailTemplateProps {
    firstName: string;
}

export const TestTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
}) => (
    <div>
        <h1>Welcome, {firstName}!</h1>
    </div>
);

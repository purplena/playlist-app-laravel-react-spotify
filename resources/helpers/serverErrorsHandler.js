export function serverErrorsHandler(serverErrors, setError) 
{
    Object.entries(serverErrors).forEach(([field, messages]) => {
        setError(field, {
            type: 'server',
            message: Array.isArray(messages) ? messages[0] : messages,
        });
    });
}

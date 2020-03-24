export const gmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {

    if (/,| /.test(emails[emails.length - 1]))
        return 'Value can\'t end either with space or comma';

    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => !gmailRegex.test(email));

    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }

    return;
};

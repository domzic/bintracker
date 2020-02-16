const gmailRegex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;

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
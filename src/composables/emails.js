/**
 * Created by dhyuann on 03.29.2025
 * API integration with EmailJS for sending e-mails.
 */
import emailjs from "@emailjs/browser"

const _params = {
    publicKey: null,
    serviceId: null,
    templateId: null
}

export const useEmails = () => {
    /**
     * @constructs
     * @param {String} publicKey
     * @param {String} serviceId
     * @param {String} templateId
     */
    const init = (publicKey, serviceId, templateId) => {
        _params.publicKey = publicKey
        _params.serviceId = serviceId
        _params.templateId = templateId

        if (!publicKey || !serviceId || !templateId)
            throw new Error("Error initializing emails.js! Make sure you informed all parameters correctly.")

        emailjs.init(_params.publicKey)
    }

    /**
     * @param {String} fromName
     * @param {String} fromEmail
     * @param {String} customSubject
     * @param {String} message
     * @return {Promise<boolean>}
     */
    const sendContact = async (fromName, fromEmail, customSubject, message) => {
        if (!_params.serviceId || !_params.templateId)
            throw new Error("EmailJS hasn't been initialized!")

        const requestParams = {
            from_name: fromName,
            from_email: fromEmail,
            custom_subject: customSubject,
            message: message
        }

        try {
            const response = await emailjs.send(
                _params.serviceId,
                _params.templateId,
                requestParams
            )
            return true
        } catch (error) {
            return false
        }
    }

    return {
        init,
        sendContact
    }
}
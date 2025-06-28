import { marked } from "marked";
import parse from 'html-react-parser';

export function markdownToText(markdownText) {
    return parse(marked(markdownText))
}
export function getYoutubeVideoId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : '';
}

export function markdownToPlainText(markdownText, length) {
    let plainText = ""
    if (markdownText) {
        const htmlForm = marked(markdownText)
        const regex = /<[^>]*>|&#?[0-9]+;|&#x?[0-9a-fA-F]+;/g;
        plainText = htmlForm.replace(regex, '');
    }
    return plainText.length > length ? plainText.slice(0, length) + "..." : plainText
}

export const validateEmailAddress = (emailAddress) => {
    var atSymbol = emailAddress.indexOf("@");
    var dotSymbol = emailAddress.lastIndexOf(".");
    var spaceSymbol = emailAddress.indexOf(" ");

    if ((atSymbol != -1) &&
        (atSymbol != 0) &&
        (dotSymbol != -1) &&
        (dotSymbol != 0) &&
        (dotSymbol > atSymbol + 1) &&
        (emailAddress.length > dotSymbol + 1) &&
        (spaceSymbol == -1)) {
        return true;
    } else {
        return false;
    }
}

export const validateIsNotEmpty = (value) => {
    value = value?.toString()
    if (!value || !value.trim()) {
        return false
    }
    return true
}

export const stringify = (object) => {
    return JSON.stringify(object)
}

export const parseString = (string) => {
    return JSON.parse(string)
}

export function getFileName(name) {
    const originalName = name?.split("_ON_")?.pop()
    if (originalName) {
        return originalName
    }
    return name
}

export function capitalize(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
}

export const salaryPerAnnum = (rateperhour) => {
    const pA = (Math.round(rateperhour * 2080)).toString()
    if (pA.length > 3) {
        return Math.round(pA / 1000) + "K"
    } else {
        return pA
    }
}

export function timeAgo(dateString) { // This function takes the take string in dd/mm/yyyy format
    const now = Date.now();
    const parts = dateString.split("/");
    const date = `${parts[1]}-${parts[0]}-${parts[2]}`;
    const difference = now - new Date(date).getTime();  //to get accurate time in the date string should be in mm-dd-yyyy format & this will give the time in milliseconds

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    // let timeAgoString;
    // if (hours < 24) {
    //     timeAgoString = "Posted Today";
    // } else if (days < 30) {
    //     timeAgoString = days + " day" + (days > 1 ? "s" : "") + " ago";
    // } else if (months < 12) {
    //     timeAgoString = months + " month" + (months > 1 ? "s" : "") + " ago";
    // } else {
    //     timeAgoString = years + " year" + (years > 1 ? "s" : "") + " ago";
    // }

    let timeAgoString;
    if (hours < 24) {
        timeAgoString = "Posted Today";
    } else if (days < 365) {
        timeAgoString = days + "d";
    } else {
        timeAgoString = years + "y"
    }

    return timeAgoString;
}
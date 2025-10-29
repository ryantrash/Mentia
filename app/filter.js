import bannedWords from "./bannedWords.json";

export default function isProfane(text) {
    const regex = new RegExp(`\\b(${bannedWords.join('|')})\\b`, 'i');
    return regex.test(text); 
}
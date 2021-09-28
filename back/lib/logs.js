
export const promptLog = (message, color) => {
    let coloredMessage
    switch (color) {
        case "yellow":
            coloredMessage = message.yellow;
        break;
        case "blue":
            coloredMessage = message.blue;
        break;
        case "green":
            coloredMessage = message.green;
        break;
        case "red":
            coloredMessage = message.red;
        break;
        default:
            coloredMessage = message;
        break;
    }

    console.log("------------------------");
    console.log(`${Date.now()} - ${coloredMessage}`);
}
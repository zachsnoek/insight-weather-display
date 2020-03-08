exports.formatMonthDay = function(date) {
    const options = {
        // weekday: "long",
        month: "short",
        day: "numeric",
    };

    return date.toLocaleDateString("en-us", options);
}
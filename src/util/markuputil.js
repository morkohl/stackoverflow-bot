module.exports = {
    cursive: (string) => {
        return `*${string}*`
    },
    fat: (string) => {
        return `**${string}**`
    },
    fat_cursive: (string) => {
        return `***${string}***`
    },
    crossed: (string) => {
        return `~~${string}~~`
    },
    crossed_cursive: (string) => {
        return `__*${string}*__`
    },
    crossed_fat: (string) => {
        return `__**${string}**__`
    },
    crossed_fat_cursive: (string) => {
        return `__***${string}***__`
    },
    code: {
        multiLine: (string) => {
            return '```' + string + '```'
        },
        singleLine: (string) => {
            return '`' + string + '`'
        },
        multiLineJavascript: (string) => {
            return '```js\n' + string + '\n```'
        }
    }
};
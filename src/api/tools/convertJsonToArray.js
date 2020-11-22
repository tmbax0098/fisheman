export default function convertJsonToArray(data = null) {

    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return [];
    } else {

        let keys = Object.keys(data);
        let result = [];

        keys.forEach(item => result.push({
            text: item,
            value: Array.isArray(data[item]) ? data[item].join(',') : data[item]
        }))

        return {parameters: result};

    }

};
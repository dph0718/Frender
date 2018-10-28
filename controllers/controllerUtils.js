
module.exports = {
    sanitize: (dirtyData) => {
        scrub = (word) => {
            let lc = word.toLowerCase();
            let clean = lc.replace(/^[Tt]he /g, '');
            return clean;
        };
        if ((typeof dirtyData) == `string`) {
            scrub(dirtyData);
        } else
            if ((typeof dirtyData == `object`)) {
                let allEntries = [];
                dirtyData.forEach((e, i) => {
                    let entry = scrub(e);
                    allEntries.push(entry);
                })
                return allEntries;
            }
            else {
                return dirtyData;
            };
    }
};

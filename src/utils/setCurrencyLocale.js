import numeral from 'numeral';

const setupNumeralLocale = (locale) => {
    // load a locale

    switch (locale) {
        case 'it':
            numeral.register('locale', 'it', {
                delimiters: {
                    thousands: ' ',
                    decimal: ','
                },
                abbreviations: {
                    thousand: 'k',
                    million: 'm',
                    billion: 'b',
                    trillion: 't'
                },
                ordinal: function (number) {
                    return number === 1 ? 'er' : 'ème';
                },
                currency: {
                    symbol: '€'
                }
            });
            break;
        case 'us':
            numeral.register('locale', 'us', {
                delimiters: {
                    thousands: ',',
                    decimal: '.'
                },
                abbreviations: {
                    thousand: 'k',
                    million: 'm',
                    billion: 'b',
                    trillion: 't'
                },
                ordinal: function (number) {
                    return number === 1 ? 'er' : 'ème';
                },
                currency: {
                    symbol: '$'
                }
            });
    }

    // switch between locales
    numeral.locale(locale);
};

export default setupNumeralLocale;

export const commaNumber = function(value, forceDecimals = true) {
    if (value) {
        if (typeof value === 'string') value = parseFloat(value.replaceAll(/[^0-9.]/g, ''));
        value = parseFloat(value);
        if (isNaN(value)) return "";
        if (value > 1) {
            const regex = /\d(?=(\d{3})+\.)/g;
            value = value.toFixed(2).replace(regex, '$&,');
            if (!forceDecimals) {
                const parts = value.split('.');
                if (parts.length === 2) {
                    const decimals = parseInt(parts[1]);
                    if (decimals === 0) {
                        value = parts[0];
                    }
                }
            }
            return value;
        }
    }
    return value;
}
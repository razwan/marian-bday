module.exports = function ({ addComponents, addUtilities, theme }) {
    const fluidFontSizeUtilities = {};

    const fontSizes = theme("fontSize", {});
    const defaultSettings = {
        breakpoint: 1440,
        minValue: 16,
        minValueBreakpoint: 320,
        slopeAdjust: 0.6
    };
    const config = theme("fluidFontSize", { settings: defaultSettings });
    const settings = config.settings;
    const { breakpoint, minValue, minValueBreakpoint, slopeAdjust } = settings;

    const parseCSSValue = (value) => {
        // Use a regular expression to extract the numeric part and the unit part
        const matches = value.match(/^([\d.]+)([^\d]*)/);

        if (!matches) {
            return [16, "px"];
        }
        const numericValue = parseFloat(matches[1]);
        const unit = matches[2];

        return [numericValue, unit];
    };

    const getComputedValue = (propertyValue) => {
        const [value, unit] = parseCSSValue(propertyValue);

        if (["rem", "em"].includes(unit)) {
            return value * 16;
        }

        if (unit === "px") {
            return value;
        }

        return 16;
    };

    for (const [fontSizeName, size] of Object.entries(fontSizes)) {
        const className = `text-fluid-${fontSizeName}`;
        const fontSize = size[0];
        const lineHeight = size[1];
        const computedValue = getComputedValue(fontSize);
        const y0 = computedValue - (computedValue - minValue) * slopeAdjust;
        const a = (computedValue - y0) / (breakpoint - minValueBreakpoint);
        const b = y0 - a * minValueBreakpoint;

        fluidFontSizeUtilities[`.${className}`] = {
            fontSize: `min(calc(${a * 100} * var(--_fluid-unit, 1vw) + ${b}px), ${computedValue}px)`,
        };

        if (lineHeight) {
            fluidFontSizeUtilities[`.${className}`].lineHeight = lineHeight;
        }
    }

    const customComponents = {
        ".fluid-root": {
            containerType: "inline-size",
            "--_fluid-unit": "1cqw",
        },
    };

    addComponents(customComponents);
    addUtilities(fluidFontSizeUtilities);
};

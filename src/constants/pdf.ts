import { rgb } from "pdf-lib";

export const SIGNATURE_STAMP = {
    BOX: {
        WIDTH: 220,
        HEIGHT: 90,
        MARGIN: 20,
        BORDER_WIDTH: 2,
        BORDER_COLOR: rgb(0.2, 0.4, 0.8),
        BG_COLOR: rgb(0.95, 0.97, 1),
    },
    HEADER: {
        TEXT: "DIGITALLY SIGNED",
        SIZE: 12,
        COLOR: rgb(0.2, 0.4, 0.8),
    },
    DIVIDER: {
        THICKNESS: 0.5,
        COLOR: rgb(0.2, 0.4, 0.8),
    },
    DATE: {
        SIZE: 9,
        COLOR: rgb(0.3, 0.3, 0.3),
    },
    TITLE: {
        TEXT: "Authorized Signatory",
        SIZE: 9,
        COLOR: rgb(0.3, 0.3, 0.3),
    },
    ID: {
        SIZE: 7,
        COLOR: rgb(0.5, 0.5, 0.5),
    },
};

import React from "react";
import { createContext } from "utils";
import createHoc from "utils/createHoc";

const OverlayContext = React.createContext(null);

export const withOverlay = createHoc(OverlayContext.Consumer, "overlay");

export const { OverlaysProvider, OverlaysConsumer, withOverlays } = createContext("Overlays", function () {
    let nextId = 1;

    let overlays = [];

    const setOverlays = (_overlays) => {
        overlays = _overlays;
        this.setState({ overlays });
    };

    return {
        overlays: [],
        render: () => {
            if (this.state.overlays.length === 0) return null;

            return this.state.overlays.map((overlay) => (
                <OverlayContext.Provider value={overlay} key={overlay.id}>
                    {overlay.render(overlay.close, overlay)}
                </OverlayContext.Provider>
            ));
        },
        closeAll: () => {
            setOverlays([]);
        },
        close: (id, ...args) => {
            if (!id) {
                console.error("DEPRECATED use closeAll");
                this.state.closeAll();
                return;
            }

            const overlay = overlays.find((x) => x.id === id);
            if (!overlay) return;

            const closeResult = overlay.config?.onClosing?.(...args);
            if (closeResult === false) return;

            setOverlays(overlays.filter((x) => x.id !== id));
        },
        open: (render, config) => {
            const id = nextId++;

            const overlay = {
                id,
                close: () => this.state.close(id),
                render,
                config,
            };

            setOverlays([...overlays, overlay]);

            return overlay;
        },
    };
});

export const OverlayContainer = withOverlays(({ overlays }) => overlays.render());

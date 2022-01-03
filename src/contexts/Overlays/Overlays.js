import { createContext } from "utils";

export const {
    OverlaysProvider,
    OverlaysConsumer,
    withOverlays
} = createContext("Overlays", (that) => ({
        overlay: null,
        render: () => that.state.overlay?.() || null,
        close: () => that.setState({ overlay: null }),
        open: (render) => that.setState({ overlay: render })
}))

export const OverlayContainer = withOverlays(({ overlays }) => overlays?.render?.() || null)
